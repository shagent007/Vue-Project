<template>
  <div class="main-card mb-3 card">
    <div class="card-body">
      <project-type-tabs @update="onProjectTypeUpdate($event)" />
      <b-table
        ref="table"
        class="align-middle mb-0"
        borderless
        striped
        hover
        primary-key="id"
        :items="itemsProvider"
        :fields="fields"
      >
        <template v-slot:table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{width: field.key === 'actions' ? '90px' : 'auto' }"
          />
        </template>
        <template v-slot:cell(actions)="data">
          <div style="text-align: center;">
            <button
              @click="edit(data.item)"
              class="border-0 btn-transition btn btn-outline-success"
            >
              <font-awesome-icon icon="edit" />
            </button>
            <button
              @click="remove(data.item)"
              class="border-0 btn-transition btn btn-outline-danger"
            >
              <font-awesome-icon icon="trash-alt" />
            </button>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import { OptionGroupDto } from "@/api/clients.ts";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import ProjectTypeTabs from "@/pages/catalog/common/ProjectTypeTabs.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import { create } from "vue-modal-dialogs";

const confirmRemove = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

library.add(faEdit);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
    ProjectTypeTabs,
  },
})
export default class OptionGroupList extends Vue {
  @Ref("table") readonly table!: BTable;
  @Prop({ required: true }) onEdit!: Function;

  projectTypeId = 0;

  fields = [
    {
      key: "order",
      label: "Порядок",
      sortable: true,
    },
    {
      key: "name",
      label: "Название ",
      sortable: true,
    },
    {
      key: "actions",
      label: "",
    },
  ];

  onProjectTypeUpdate(event: number) {
    this.projectTypeId = event;
    this.$emit("update", event);
    this.table.refresh();
  }

  async itemsProvider() {
    try {
      return await applicationFacade.optionGroups.getAll(this.projectTypeId);
    } catch (e) {
      return [];
    }
  }

  async remove(item: OptionGroupDto) {
    const result = await confirmRemove(
      "Внимание",
      "Вы действительно хотите удалить данную группу?"
    );
    if (!result) return;

    await applicationFacade.optionGroups.remove(item.id);
    this.table.refresh();
  }

  edit(item: OptionGroupDto) {
    this.onEdit(item);
  }

  public reload() {
    this.table.refresh();
  }
}
</script>

<style scoped>
.card-body {
  padding-top: 0px;
}
</style>
