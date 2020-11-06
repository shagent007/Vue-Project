<template>
  <div class="main-card mb-3 card">
    <VueElementLoading :active="loading" spinner="bar-fade-scale" color="var(--primary)" />
    <div class="card-body">
      <h5 class="card-title">Похожие проекты</h5>
      <b-button class="mr-2 mb-2 btn-shadow" variant="primary" @click="onAdd()">Добавить</b-button>
      <b-table
        ref="table"
        class="align-middle mb-0"
        borderless
        striped
        hover
        primary-key="id"
        :items="itemsProvider"
        :fields="fields"
        :busy.sync="isBusy"
      >
        <template v-slot:cell(createdAt)="data">{{ data.value.toLocaleString("ru-RU") }}</template>
        <template v-slot:cell(state)="data">
          <project-status :state="data.item.state"></project-status>
        </template>
        <template v-slot:cell(actions)="data">
          <button @click="edit(data.item)" class="border-0 btn-transition btn btn-outline-success">
            <font-awesome-icon icon="edit" />
          </button>
          <button
            @click="remove(data.item.id)"
            class="border-0 btn-transition btn btn-outline-danger"
          >
            <font-awesome-icon icon="trash-alt" />
          </button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueElementLoading from "vue-element-loading";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Ref, Prop } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import ProjectStatus from "@/pages/catalog/common/ProjectStatus.vue";
import { ProjectAnalogStateDto, ProjectAnalogDto } from "@/api/clients.ts";
import { SearchProjectsCommand } from "@/api/catalog/SearchProjectsCommand.ts";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { create } from "vue-modal-dialogs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import AnalogProjectsModal from "@/pages/catalog/project/AnalogProjectsModal.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import CommentDialogue from "@/pages/catalog/project/CommentDialogue.vue";

const confirmRemove = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

const commentDialogue = create<ProjectAnalogDto, ProjectAnalogDto>(
  CommentDialogue,
  "content"
);

const analogProjectsModal = create<Array<number>, number>(
  AnalogProjectsModal,
  "exludedId"
);

library.add(faEdit);
@Component({
  components: {
    ProjectStatus,
    AnalogProjectsModal,
    "font-awesome-icon": FontAwesomeIcon,
    VueElementLoading,
  },
})
export default class AnalogProjectsList extends Vue {
  @Ref("table") readonly table!: BTable;
  @Prop({ type: Object }) value!: {
    id: number;
    analogs: ProjectAnalogStateDto[];
  };

  loading = false;
  searchProjectsCommand = new SearchProjectsCommand();
  isBusy = false;
  exludedId = new Array<number>();
  content = new ProjectAnalogDto();

  async remove(id: number) {
    const result = await confirmRemove(
      "Внимание",
      "Вы действительно хотите удалить данный проект из списка похожих проектов?"
    );
    if (!result) return;

    this.value.analogs.splice(
      this.value.analogs.findIndex((x) => x.projectId === id),
      1
    );
  }

  async itemsProvider(ctx: any, callback: any) {
    try {
      this.loading = true;
      if (!this.value) return [];
      this.exludedId = this.value.analogs.map((x) => x.projectId);
      this.exludedId.push(this.value.id);

      return await applicationFacade.projectsService.getAnalogs(this.value.id);
    } catch (e) {
      return [];
    } finally {
      this.loading = false;
    }
  }

  fields = [
    {
      key: "projectType",
      label: "Тип проекта",
      sortable: true,
    },
    {
      key: "sku",
      label: "Код проекта",
      sortable: true,
    },
    {
      key: "state",
      label: "Статус проекта",
    },
    {
      key: "architect",
      label: "Архитектор",
      sortable: true,
    },
    {
      key: "name",
      label: "Название",
      sortable: true,
    },
    {
      key: "price",
      label: "Цена",
      sortable: true,
    },
    {
      key: "comment",
      label: "Коментарий",
      sortable: true,
    },
    {
      key: "actions",
      label: "",
    },
  ];

  async edit(comment: ProjectAnalogDto) {
    const result = await commentDialogue(comment);

    if (result.comment && result.comment.length > 0) {
      this.onCommentChange(result);
    }
  }

  async onAdd() {
    const result = await analogProjectsModal(this.exludedId);
    if (result > 0) {
      const analog = new ProjectAnalogStateDto();
      analog.projectId = result;
      analog.comment = "";
      this.value.analogs.push(analog);
    }
  }

  onCommentChange(content: ProjectAnalogDto) {
    for (let index = 0; index < this.value.analogs.length; index++) {
      if (this.value.analogs[index].projectId === content.id) {
        this.value.analogs[index].comment = content.comment;
        break;
      }
    }
  }

  public reload() {
    this.table.refresh();
  }
}
</script>
