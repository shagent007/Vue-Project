<template>
  <div class="main-card mb-3 card">
    <div class="card-body">
      <b-table
        ref="table"
        class="align-middle mb-0"
        borderless
        striped
        hover
        primary-key="id"
        :items="itemsProvider"
        :fields="fields"
        :busy.sync="isBusy"
        :per-page="pagination.perPage"
        :current-page="pagination.currentPage"
      >
        <template v-slot:table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{width: field.key === 'actions' ? '90px' : 'auto' }"
          />
        </template>
        <template v-slot:cell(name)="data">
          <div>{{data.item.name}}</div>
          <small>{{ data.item.url}}</small>
          <div>
            <small>{{ data.item.category}}</small>
          </div>
        </template>
        <template v-slot:cell(state)="data">
          <div>{{data.item.modifiedAt.toLocaleString("ru-RU")}}</div>
          <post-status :state="data.item.state" />
        </template>
        <template v-slot:cell(actions)="data">
          <div style="text-align: center;">
            <button
              @click="edit(data.item.id)"
              class="border-0 btn-transition btn btn-outline-primary"
            >
              <font-awesome-icon icon="edit" />
            </button>
          </div>
        </template>
      </b-table>
    </div>

    <div class="d-block text-center card-footer" v-show="pagination.visible">
      <b-pagination
        class="mb-0 pl-0"
        v-model="pagination.currentPage"
        :total-rows="pagination.totalRows"
        :per-page="pagination.perPage"
      ></b-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref, Watch } from "vue-property-decorator";
import { PostDto } from "@/api/clients";
import { BTable } from "bootstrap-vue";
import { SearchPostsCommand } from "@/api/content/SearchPostsCommand.ts";
import PostStatus from "@/pages/content/Posts/PostStatus.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEdit);

@Component({
  components: {
    PostStatus,
    "font-awesome-icon": FontAwesomeIcon,
  },
})
export default class PostsList extends Vue {
  @Ref("table") readonly table!: BTable;
  @Prop({ type: Object }) value!: SearchPostsCommand;

  pagination = {
    currentPage: 1,
    perPage: 30,
    totalRows: 0,
    visible: false,
  };

  isBusy = false;

  fields = [
    {
      key: "name",
      label: "Название",
      sortable: true,
    },
    {
      key: "state",
      label: "Дата изменения",
      sortable: true,
    },

    {
      key: "actions",
      label: "",
    },
  ];

  async itemsProvider(ctx: any, callback: any) {
    this.isBusy = true;
    try {
      const result = await applicationFacade.posts.search(
        this.value.categoryId,
        this.value.name,
        this.value.tag,
        this.value.dateFrom,
        this.value.dateTo,
        this.value.states,
        ctx.currentPage,
        ctx.perPage
      );

      this.pagination.totalRows = result.rowCount;
      this.isBusy = false;

      if (result.items && result.items.length > 0) {
        this.pagination.visible = true;
      }

      return result.items;
    } catch (e) {
      this.isBusy = false;
      return [];
    }
  }

  @Watch("pagination.currentPage")
  async onPageChange(value: number) {
    this.table.refresh();
  }

  add(): boolean {
    return true;
  }

  edit(postId: string): void {
    this.$router.push({ name: "post", params: { id: postId } });
  }

  remove(post: PostDto): boolean {
    return true;
  }

  public reload() {
    this.table.refresh();
  }
}
</script>