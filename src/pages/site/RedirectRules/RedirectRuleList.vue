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
                            width: field.key === 'actions' ? '90px' : 'auto'
                        }"
          />
        </template>

        <template v-slot:cell(actions)="data">
          <div style="text-align: center;">
            <button
              @click="edit(data.item)"
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
import { Ref, Watch, Prop } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import { SearchRedirectRuleCommand } from "@/api/site/SearchRedirectRuleCommand.ts";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEdit);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
})
export default class RedirectRuleList extends Vue {
  @Prop({ type: Object }) value!: SearchRedirectRuleCommand;
  @Ref("table") readonly table!: BTable;

  pagination = {
    currentPage: 1,
    perPage: 3,
    totalRows: 0,
    visible: false,
  };

  isBusy = false;

  fields = [
    {
      key: "oldSlug",
      label: "Старый URL",
      sortable: true,
    },
    {
      key: "newSlug",
      label: "Новый URL",
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
      const result = await applicationFacade.redirectRules.getAll(
        this.value.oldSlug,
        this.value.newSlug,
        this.value.pageNo,
        this.value.pageSize
      );

      this.pagination.totalRows = result.rowCount;
      this.isBusy = false;

      if (result.items && result.items.length > 0) {
        this.pagination.visible = true;
      }
      return result.items;
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      this.isBusy = false;
    }
  }

  @Watch("pagination.currentPage", { deep: true })
  async onPageChange() {
    this.table.refresh();
  }

  edit(item: string) {
    this.$emit("edit", item);
  }

  public reload() {
    this.table.refresh();
  }
}
</script>
