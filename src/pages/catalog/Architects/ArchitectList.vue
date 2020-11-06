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
      >
        <template v-slot:table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{width: field.key === 'actions' ? '90px' : 'auto' }"
          />
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import ActionButton from "@/pages/common/ActionButton.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEdit);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
    ActionButton,
  },
})
export default class ArchitectList extends Vue {
  @Ref("table") readonly table!: BTable;

  fields = [
    {
      key: "name",
      label: "Имя ",
      sortable: true,
    },
    {
      key: "projectSeries",
      label: "Серия проекта ",
      sortable: true,
    },
    {
      key: "actions",
      label: "",
    },
  ];

  async itemsProvider() {
    try {
      return await applicationFacade.architects.getAll();
    } catch {
      return [];
    }
  }

  edit(id: string) {
    this.$router.push({
      name: "architect-page",
      params: {
        id: id,
      },
    });
  }

  public reload() {
    this.table.refresh();
  }
}
</script>
