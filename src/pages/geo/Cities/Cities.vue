<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>

    <div class="row">
      <div class="col-md-12">
        <city-list ref="list" :onEdit="onEdit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import CityList from "@/pages/geo/Cities/CityList.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import CityEditor from "@/pages/geo/Cities/CityEditor.vue";
import { CityStateDto, CityDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";

import { create } from "vue-modal-dialogs";

const cityEditor = create<CityStateDto, boolean>(CityEditor, "model");

@Component({
  components: {
    PageTitle,
    CityList,
    CityEditor,
  },
})
export default class CitiesView extends Vue {
  @Ref("list") readonly list!: CityList;
  heading = "Города";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";

  city = new CityStateDto();
  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  async onAdd() {
    this.city = new CityStateDto();
    await cityEditor(this.city);
    this.list.reload();
  }

  async onEdit(id: number) {
    this.city = await applicationFacade.cities.get(id);
    await cityEditor(this.city);
    this.list.reload();
  }
}
</script>
