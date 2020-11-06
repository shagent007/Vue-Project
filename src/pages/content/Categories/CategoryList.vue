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
        </template>
        <template v-slot:cell(state)="data">
          <div>{{data.item.modifiedAt.toLocaleString("ru-RU")}}</div>
          <category-status :state="data.item.state" />
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
import { CategoryDto } from "@/api/clients";
import { BTable } from "bootstrap-vue";
import { SearchCategoryCommand } from "@/api/content/SearchCategoryCommand.ts";
import CategoryStatus from "@/pages/content/Categories/CategoryStatus.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEdit);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
    CategoryStatus,
  },
})
export default class ContentCategoryList extends Vue {
  @Ref("table") readonly table!: BTable;
  @Prop({ type: Object }) value!: SearchCategoryCommand;

  pagination = {
    currentPage: 1,
    perPage: 3,
    totalRows: 0,
    visible: false,
  };

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

  async itemsProvider() {
    this.value.pageNo = this.pagination.currentPage;
    this.value.pageSize = this.pagination.perPage;

    try {
      const result = await applicationFacade.contentCategories.search(
        this.value.parentId,
        this.value.name,
        this.value.dateFrom,
        this.value.dateTo,
        this.value.states,
        this.value.pageNo,
        this.value.pageSize
      );

      this.pagination.totalRows = result.rowCount;

      if (result.items && result.items.length > 0) {
        this.pagination.visible = true;
      }

      return result.items ?? [];
    } catch (e) {
      return [];
    }
  }

  @Watch("pagination.currentPage")
  async onPageChange(value: number) {
    this.table.refresh();
  }

  edit(postId: string): void {
    this.$router.push({
      name: "content-category-page",
      params: { id: postId },
    });
  }

  public reload() {
    this.table.refresh();
  }
}
</script>