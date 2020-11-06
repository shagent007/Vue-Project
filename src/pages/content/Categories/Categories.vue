<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>

    <div class="row">
      <div class="col-md-9">
        <category-list v-model="filterConfig" ref="list" />
      </div>
      <div class="col-md-3">
        <category-filter v-model="filterConfig" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Ref } from "vue-property-decorator";
import { SearchCategoryCommand } from "@/api/content/SearchCategoryCommand.ts";
import { CategoryStateDto } from "@/api/clients";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";

import PageTitle from "@/Layout/Components/PageTitle.vue";
import CategoryList from "@/pages/content/Categories/CategoryList.vue";
import AddCategoryModal from "@/pages/content/Categories/AddCategoryModal.vue";
import CategoryFilter from "@/pages/content/Categories/CategoryFilter.vue";

import { create } from "vue-modal-dialogs";

const addCategoryModal = create<CategoryStateDto, boolean>(
  AddCategoryModal,
  "model"
);

@Component({
  components: {
    CategoryList,
    PageTitle,
    CategoryFilter,
  },
})
export default class Posts extends Vue {
  @Ref("list") readonly list!: CategoryList;

  filterConfig = new SearchCategoryCommand();
  heading = "Категории";
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
    await addCategoryModal(new CategoryStateDto());
  }

  created() {
    if (!this.$route.query.q) return;
    this.filterConfig = JSON.parse(String(this.$route.query.q));
  }

  @Watch("filterConfig", {
    deep: true,
  })
  async onfilterChange(value: any) {
    this.list.reload();
    if (JSON.stringify(value) === String(this.$route.query.q)) return;
    this.$router.push({
      name: "content-categories",
      query: {
        q: JSON.stringify(value),
      },
    });
  }
}
</script>
