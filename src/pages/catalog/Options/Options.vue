<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>

    <div class="row">
      <div class="col-md-12">
        <option-list ref="list" :onEdit="onEdit" @update="update($event)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import OptionList from "@/pages/catalog/Options/OptionList.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import OptionEditor from "@/pages/catalog/Options/OptionEditor.vue";
import { OptionStateDto, OptionDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";

import { create } from "vue-modal-dialogs";

const optionEditor = create<number, OptionStateDto, boolean>(
  OptionEditor,
  "projectTypeId",
  "model"
);

@Component({
  components: {
    PageTitle,
    OptionList,
  },
})
export default class OptionsView extends Vue {
  @Ref("list") readonly list!: OptionList;
  heading = "Опции";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";
  projectTypeId = 0;

  option = new OptionStateDto();
  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  update(event: number) {
    this.projectTypeId = event;
  }

  async onAdd() {
    this.option = new OptionStateDto();
    await optionEditor(this.projectTypeId, this.option);
    this.list.reload();
  }

  async onEdit(item: OptionDto) {
    this.option = await applicationFacade.optionsService.get(item.id);
    await optionEditor(this.projectTypeId, this.option);
    this.list.reload();
  }
}
</script>
