<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>
    <div class="row">
      <div class="col-md-12">
        <materials-group-list ref="list" :onEdit="onEdit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import MaterialsGroupList from "@/pages/catalog/MaterialsGroup/MaterialsGroupList.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import { MaterialGroupStateDto, MaterialGroupDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import MaterialsGroupEditor from "@/pages/catalog/MaterialsGroup/MaterialsGroupEditor.vue";

import { create } from "vue-modal-dialogs";

const materialGroupEditor = create<MaterialGroupStateDto, boolean>(
  MaterialsGroupEditor,
  "model"
);

@Component({
  components: {
    PageTitle,
    MaterialsGroupList,
  },
})
export default class MatrialGroup extends Vue {
  @Ref("list") readonly list!: MaterialsGroupList;

  heading = "Группы материалов";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";

  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  async onAdd() {
    await materialGroupEditor(new MaterialGroupStateDto());
    this.list.reload();
  }

  async onEdit(item: MaterialGroupStateDto) {
    const materialGroup = await applicationFacade.materialGroupsService.get(
      Number(item.id)
    );
    await materialGroupEditor(materialGroup);
    this.list.reload();
  }
}
</script>
