<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>
    <div class="row">
      <div class="col-md-12">
        <option-group-list ref="list" :onEdit="onEdit" @update="update($event)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import OptionGroupList from "@/pages/catalog/OptionGroup/OptionGroupList.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import { OptionGroupStateDto, OptionGroupDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import OptionGroupEditor from "@/pages/catalog/OptionGroup/OptionGroupEditor.vue";

import { create } from "vue-modal-dialogs";

const optionGroupEditor = create<OptionGroupStateDto, boolean>(
  OptionGroupEditor,
  "model"
);

@Component({
  components: {
    PageTitle,
    OptionGroupList,
  },
})
export default class OptionGroupView extends Vue {
  @Ref("list") readonly list!: OptionGroupList;
  heading = "Группы опции";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";
  projectTypeId = 0;

  optionGroup = new OptionGroupStateDto();
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
    this.optionGroup = new OptionGroupStateDto();
    this.optionGroup.projectTypeId = this.projectTypeId;
    await optionGroupEditor(this.optionGroup);
    this.list.reload();
  }

  async onEdit(item: OptionGroupDto) {
    this.optionGroup = await applicationFacade.optionGroups.get(item.id);
    await optionGroupEditor(this.optionGroup);
    this.list.reload();
  }
}
</script>
