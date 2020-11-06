<template>
  <div>
    <page-title :heading="heading" :subheading="subheading" :icon="icon" :actions="actions"></page-title>
    <div class="row">
      <div class="col-md-9">
        <posts-list ref="list" v-model="filterConfig" />
      </div>
      <div class="col-md-3">
        <post-filter v-model="filterConfig" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Ref } from "vue-property-decorator";
import { SearchPostsCommand } from "@/api/content/SearchPostsCommand.ts";
import { PostStateDto } from "@/api/clients";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";

import PageTitle from "@/Layout/Components/PageTitle.vue";
import PostsList from "@/pages/content/Posts/PostsList.vue";
import PostFilter from "@/pages/content/Posts/PostFilter.vue";
import AddPostModal from "@/pages/content/Posts/AddPostModal.vue";

import { create } from "vue-modal-dialogs";

const addPostModal = create<PostStateDto, boolean>(AddPostModal, "model");

@Component({
  components: {
    PostsList,
    PageTitle,
    PostFilter,
  },
})
export default class Posts extends Vue {
  @Ref("list") readonly list!: PostsList;

  filterConfig = new SearchPostsCommand();
  showEditor = false;
  post = new PostStateDto();
  heading = "Статьи";
  subheading = "";
  icon = "pe-7s-plane icon-gradient bg-tempting-azure";
  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  created() {
    if (!this.$route.query.q) return;
    this.filterConfig = JSON.parse(String(this.$route.query.q));
  }

  async onAdd() {
    await addPostModal(new PostStateDto());
    this.list.reload();
  }

  @Watch("filterConfig", {
    deep: true,
  })
  async onfilterChange(value: any) {
    this.list.reload();
    if (JSON.stringify(value) === String(this.$route.query.q)) return;
    this.$router.push({
      name: "posts",
      query: {
        q: JSON.stringify(value),
      },
    });
  }
}
</script>
