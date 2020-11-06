<template>
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
        :style="{width: field.key === 'actions' ? '120px' : 'auto' }"
      />
    </template>
    <template v-slot:cell(actions)="data">
      <div style="text-align: center;">
        <button class="border-0 btn-transition btn btn-outline-success">
          <font-awesome-icon icon="edit" @click="$emit('edit', data.item)" />
        </button>
        <button v-if="schema.isDraft" class="border-0 btn-transition btn btn-outline-danger">
          <font-awesome-icon icon="trash-alt" @click="$emit('remove', data.item.id)" />
        </button>
      </div>
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref, Watch } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { CategorySchemaDto } from "@/api/clients";

library.add(faEdit);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
})
export default class CategoryCities extends Vue {
  @Prop({ required: true }) schema!: CategorySchemaDto;
  @Ref("table") readonly table!: BTable;

  fields = [
    {
      key: "order",
      label: "Позиция",
      sortable: true,
    },
    {
      key: "city",
      label: "Город",
      sortable: true,
    },
    {
      key: "slug",
      label: "Url",
      sortable: true,
    },
    {
      key: "h1",
      label: "H1",
      sortable: true,
    },
    {
      key: "actions",
      label: "",
    },
  ];

  async itemsProvider() {
    try {
      return await applicationFacade.categories.getCities(this.schema.id);
    } catch (e) {
      return [];
    }
  }

  public reload() {
    this.table.refresh();
  }

  @Watch("schema")
  async onSchemaIdChanged() {
    await this.table.refresh();
  }
}
</script>