<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>

    <div class="row">
      <div class="col-md-12">
        <project-type-list ref="list" :onEdit="onEdit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import ProjectTypeList from "@/pages/catalog/ProjectType/ProjectTypeList.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import AddProjectTypeModal from "@/pages/catalog/ProjectType/AddProjectTypeModal.vue";
import { ProjectTypeStateDto, ProjectTypeDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";

import { create } from "vue-modal-dialogs";

const confirmDialog = create<ProjectTypeStateDto, boolean>(
  AddProjectTypeModal,
  "value"
);

@Component({
  components: {
    PageTitle,
    ProjectTypeList,
  },
})
export default class ProjectType extends Vue {
  @Ref("list") readonly list!: ProjectTypeList;
  heading = "Типы проектов";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";

  projectType = new ProjectTypeStateDto();
  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  async onAdd() {
    this.projectType = new ProjectTypeStateDto();
    await confirmDialog(this.projectType);
    this.list.reload();
  }

  async onEdit(item: ProjectTypeDto) {
    this.projectType = await applicationFacade.projectTypes.get(item.id);
    await confirmDialog(this.projectType);
    this.list.reload();
  }
}
</script>
