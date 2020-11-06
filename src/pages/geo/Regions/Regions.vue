<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>

    <div class="row">
      <div class="col-md-12">
        <region-list ref="list" :onEdit="onEdit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import RegionList from "@/pages/geo/Regions/RegionList.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import RegionEditor from "@/pages/geo/Regions/RegionEditor.vue";
import { RegionStateDto, RegionDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";

import { create } from "vue-modal-dialogs";

const regionEditor = create<RegionStateDto, boolean>(RegionEditor, "model");

@Component({
  components: {
    PageTitle,
    RegionList,
  },
})
export default class REgionsView extends Vue {
  @Ref("list") readonly list!: RegionList;
  heading = "Регионы";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";

  region = new RegionStateDto();
  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  async onAdd() {
    this.region = new RegionStateDto();
    await regionEditor(this.region);
    this.list.reload();
  }

  async onEdit(id: number) {
    this.region = await applicationFacade.regions.get(id);
    await regionEditor(this.region);
    this.list.reload();
  }
}
</script>
