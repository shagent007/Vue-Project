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
import { projectTypeModule } from "@/store/modules/projectTypes.ts";
import { Prop, Ref } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import { ProjectTypeDto } from "@/api/clients.ts";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faEdit);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
})
export default class OptionGroupList extends Vue {
  @Ref("table") readonly table!: BTable;

  fields = [
    {
      key: "name",
      label: "Название ",
      sortable: true,
    },
    {
      key: "projectCode",
      label: "Код проекта ",
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
      await projectTypeModule.getAllProjectTypes();
      return await projectTypeModule.getProjectTypes;
    } catch (e) {
      return [];
    }
  }

  public reload() {
    this.table.refresh();
  }

  async edit(id: string) {
    await this.$router.push({
      name: "project-type-page",
      params: {
        id,
      },
    });
  }
}
</script>
