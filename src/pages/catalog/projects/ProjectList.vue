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
            :style="{
              width: field.key === 'actions' ? '90px' : 'auto',
            }"
          />
        </template>
        <template v-slot:cell(createdAt)="data">
          {{ data.value.toLocaleString("ru-RU") }}
        </template>
        <template v-slot:cell(name)="data">
          <div>{{ data.item.name }}</div>
          <small>{{ data.item.architect }}</small>
        </template>
        <template v-slot:cell(state)="data">
          <project-status :state="data.item.state"></project-status>
        </template>
        <template v-slot:cell(actions)="data">
          <div style="text-align: center">
            <button
              @click="edit(data.item.id)"
              class="border-0 btn-transition btn btn-outline-primary"
              v-if="buttonType === 'Открыть'"
            >
              <font-awesome-icon icon="edit" />
            </button>

            <button
              type="button"
              class="btn btn-success btn-sm"
              v-else-if="buttonType === 'Выбрать'"
              @click="$emit('onAdd', data.item.id)"
            >
              Выбрать
            </button>
          </div>
        </template>
      </b-table>
    </div>
    <div class="d-block text-center card-footer" v-show="pagination.visible">
      <b-pagination
        class="mb-0 pl-0"
        v-model="currentPage"
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
import { Ref, Watch, Prop } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import ProjectStatus from "@/pages/catalog/common/ProjectStatus.vue";
import { SearchProjectsCommand } from "@/api/catalog/SearchProjectsCommand.ts";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEdit);

@Component({
  components: {
    ProjectStatus,
    "font-awesome-icon": FontAwesomeIcon,
  },
})
export default class ProjectList extends Vue {
  @Prop({ type: Object }) value!: SearchProjectsCommand;
  @Prop({ type: String, default: "Открыть" }) buttonType!: string;
  @Prop({ type: Array, default: () => [] }) exludedId!: Array<number>;
  @Ref("table") readonly table!: BTable;

  pagination = {
    perPage: 3,
    totalRows: 0,
    visible: false,
  };

  currentPage = 1;

  isBusy = false;

  fields = [
    {
      key: "projectType",
      label: "Тип",
      sortable: true,
    },
    {
      key: "sku",
      label: "Код",
      sortable: true,
    },
    {
      key: "name",
      label: "Название",
      sortable: true,
    },
    {
      key: "state",
      label: "Статус",
    },

    {
      key: "price",
      label: "Цена",
      sortable: true,
    },
    {
      key: "actions",
      label: "",
    },
  ];

  async itemsProvider(ctx: any, callback: any) {
    this.isBusy = true;
    this.currentPage = Number(this.value.pageNo);
    try {
      const result = await applicationFacade.projectsService.search(
        this.value.projectTypeId,
        this.value.architectId,
        this.value.sku,
        this.value.from,
        this.value.to,
        this.value.state,
        this.value.collections,
        this.value.order,
        this.value.specification,
        this.value.pageNo,
        this.value.pageSize
      );

      this.pagination.totalRows = result.rowCount;
      this.isBusy = false;

      if (result.items && result.items.length > 0) {
        this.pagination.visible = true;
      }
      if (this.exludedId.length === 0) return result.items;

      return result.items?.filter((x) => this.exludedId.indexOf(x.id) === -1);
    } catch (e) {
      return [];
    } finally {
      this.isBusy = false;
    }
  }

  created() {
    this.pagination.perPage = Number(this.value.pageSize);
  }

  @Watch("currentPage", { deep: true })
  async onPageChange(value: any) {
    this.table.refresh();
    if (this.value.pageNo === value) return;
    this.value.pageNo = value;
  }

  async edit(id: string) {
    await this.$router.push({
      name: "project",
      params: {
        id,
      },
    });
  }

  public reload() {
    this.table.refresh();
  }
}
</script>
