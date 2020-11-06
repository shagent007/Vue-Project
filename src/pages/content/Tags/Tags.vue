<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>
    <div class="row">
      <div class="col-md-9">
        <tag-list v-model="filterConfig" ref="list" />
      </div>
      <div class="col-md-3">
        <tag-filter v-model="filterConfig" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref, Watch } from "vue-property-decorator";
import { TagStateDto } from "@/api/clients";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import { SearchTagCommand } from "@/api/content/SearchTagCommand.ts";

import PageTitle from "@/Layout/Components/PageTitle.vue";
import TagList from "@/pages/content/Tags/TagList.vue";
import AddTagModal from "@/pages/content/Tags/AddTagModal.vue";
import TagFilter from "@/pages/content/Tags/TagFilter.vue";

import { create } from "vue-modal-dialogs";

const addTagModal = create<TagStateDto, boolean>(AddTagModal, "model");

@Component({
  components: {
    TagList,
    PageTitle,
    TagFilter,
  },
})
export default class Tags extends Vue {
  @Ref("list") readonly list!: TagList;

  filterConfig = new SearchTagCommand();
  heading = "Теги";
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
    await addTagModal(new TagStateDto());
    this.list.reload();
  }
  created() {
    if (!this.$route.query.q) {
      this.$router.push({
        name: "content-tags",
        query: {
          q: JSON.stringify(this.filterConfig),
        },
      });
      return;
    }
    this.filterConfig = JSON.parse(String(this.$route.query.q));
  }

  @Watch("filterConfig", {
    deep: true,
  })
  async onfilterChange(value: any) {
    this.list.reload();
    if (JSON.stringify(value) === String(this.$route.query.q)) return;
    this.$router.push({
      name: "content-tags",
      query: {
        q: JSON.stringify(value),
      },
    });
  }
}
</script>
