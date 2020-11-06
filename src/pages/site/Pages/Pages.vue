<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>
    <div class="row">
      <div class="col-md-9">
        <page-list ref="list" v-model="filterConfig" />
      </div>
      <div class="col-md-3">
        <page-filter v-model="filterConfig" @update="updateParentId($event)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Ref } from "vue-property-decorator";
import { SearchPageCommand } from "@/api/site/SearchPageCommand.ts";
import { PageStateDto } from "@/api/clients";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import { create } from "vue-modal-dialogs";

import PageTitle from "@/Layout/Components/PageTitle.vue";
import PageList from "@/pages/site/Pages/PageList.vue";
import PageFilter from "@/pages/site/Pages/PageFilter.vue";
import AddPageModal from "@/pages/site/Pages/AddPageModal.vue";

const addPageModal = create<PageStateDto, boolean>(AddPageModal, "model");

@Component({
  components: {
    PageList,
    PageTitle,
    PageFilter,
  },
})
export default class Posts extends Vue {
  @Ref("list") readonly list!: PageList;

  filterConfig = new SearchPageCommand();
  heading = "Страницы";
  icon = "pe-7s-plane icon-gradient bg-tempting-azure";
  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  async onAdd() {
    await addPageModal(new PageStateDto());
    this.list.reload();
  }

  created() {
    if (!this.$route.query.q) return;
    this.filterConfig = JSON.parse(String(this.$route.query.q));
  }

  updateParentId(event: number) {
    this.filterConfig.parentId = event;
  }

  @Watch("filterConfig", {
    deep: true,
  })
  async onfilterChange(value: any) {
    this.list.reload();
    if (JSON.stringify(value) === String(this.$route.query.q)) return;
    this.$router.push({
      name: "site-pages",
      query: {
        q: JSON.stringify(value),
      },
    });
  }
}
</script>
