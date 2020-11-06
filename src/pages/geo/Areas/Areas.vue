<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>

    <div class="row">
      <div class="col-md-12">
        <area-list ref="list" :onEdit="onEdit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import AreaList from "@/pages/geo/Areas/AreaList.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import AreaEditor from "@/pages/geo/Areas/AreaEditor.vue";
import { AreaStateDto, AreaDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";

import { create } from "vue-modal-dialogs";

const areaEditor = create<AreaStateDto, boolean>(AreaEditor, "model");

@Component({
  components: {
    PageTitle,
    AreaList,
  },
})
export default class AreasView extends Vue {
  @Ref("list") readonly list!: AreaList;
  heading = "Округа";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";

  area = new AreaStateDto();
  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  async onAdd() {
    this.area = new AreaStateDto();
    await areaEditor(this.area);
    this.list.reload();
  }

  async onEdit(id: number) {
    this.area = await applicationFacade.areas.get(id);
    await areaEditor(this.area);
    this.list.reload();
  }
}
</script>
