<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>

    <div class="row">
      <div class="col-md-12">
        <architect-list ref="list" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import OptionEditor from "@/pages/catalog/Options/OptionEditor.vue";
import { ArchitectStateDto } from "@/api/clients";
import ArchitectList from "@/pages/catalog/Architects/ArchitectList.vue";
import ArchitectModal from "@/pages/catalog/Architects/ArchitectModal.vue";
import { create } from "vue-modal-dialogs";

const architectModal = create<ArchitectStateDto, boolean>(
  ArchitectModal,
  "model"
);

@Component({
  components: {
    PageTitle,
    ArchitectList,
    OptionEditor,
    ArchitectModal,
  },
})
export default class Architects extends Vue {
  @Ref("list") readonly list!: ArchitectList;
  heading = "Арихитекторы";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";

  architect = new ArchitectStateDto();
  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  async onAdd() {
    const result = await architectModal(new ArchitectStateDto());
    this.list.reload();
  }
}
</script>
