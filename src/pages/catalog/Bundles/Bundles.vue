<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>

    <div class="row">
      <div class="col-md-12">
        <bundle-list ref="list" :onEdit="onEdit" @update="update($event)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import BundleList from "@/pages/catalog/Bundles/BundleList.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import { BundleStateDto, BundleDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import BundleEditor from "@/pages/catalog/Bundles/BandleEditor.vue";
import { create } from "vue-modal-dialogs";

const bundleEditor = create<BundleStateDto, BundleStateDto>(
  BundleEditor,
  "model"
);

@Component({
  components: {
    PageTitle,
    BundleList,
    BundleEditor,
  },
})
export default class BundlesView extends Vue {
  @Ref("list") readonly list!: BundleList;
  heading = "Комплекты";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";
  projectTypeId = 0;

  bundle = new BundleStateDto();
  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  async onAdd() {
    this.bundle = new BundleStateDto();
    this.bundle.projectTypeId = this.projectTypeId;
    const result = await bundleEditor(this.bundle);
    if (!result.name) return;
    await applicationFacade.bundlesService.save(result);
    this.list.reload();
  }

  update(event: number) {
    this.projectTypeId = event;
  }

  async onEdit(item: BundleDto) {
    this.bundle = await applicationFacade.bundlesService.get(item.id);
    const result = await bundleEditor(this.bundle);
    if (!result.name) return;
    await applicationFacade.bundlesService.save(result);
    this.list.reload();
  }
}
</script>
