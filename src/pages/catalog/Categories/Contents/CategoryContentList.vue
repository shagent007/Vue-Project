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
        <button
          @click="$emit('edit', data.item.id)"
          class="border-0 btn-transition btn btn-outline-success"
        >
          <font-awesome-icon icon="edit" />
        </button>
        <button
          @click="$emit('remove', data.item.id)"
          class="border-0 btn-transition btn btn-outline-danger"
        >
          <font-awesome-icon icon="trash-alt" />
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
export default class CategoryContentList extends Vue {
  @Prop({ required: true }) schema!: CategorySchemaDto;
  @Ref("table") readonly table!: BTable;

  fields = [
    {
      key: "slug",
      label: "Url",
      sortable: true,
    },
    {
      key: "actions",
      label: "",
    },
  ];

  async itemsProvider() {
    try {
      return await applicationFacade.categories.getContent(this.schema.id);
    } catch (e) {
      return [];
    }
  }

  @Watch("schema")
  async onSchemaIdChanged() {
    await this.table.refresh();
  }

  public reload() {
    this.table.refresh();
  }
}
</script>