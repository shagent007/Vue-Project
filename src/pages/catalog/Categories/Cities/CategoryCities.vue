<template>
  <div class="main-card mt-3 card">
    <div class="card-body">
      <h5 class="card-title">Города</h5>
      <b-button
        v-if="schema.isDraft"
        class="mr-2 mb-2 btn-shadow"
        @click="onAdd"
        variant="primary"
      >Добавить</b-button>

      <category-city-list
        ref="list"
        :schema="schema"
        @edit="onEdit($event)"
        @remove="remove(schema.id, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref, Watch } from "vue-property-decorator";
import { CategorySchemaCityStateDto, CategorySchemaDto } from "@/api/clients";
import { create } from "vue-modal-dialogs";

import CategoryCityList from "@/pages/catalog/Categories/Cities/CategoryCityList.vue";
import CategoryCityEditor from "@/pages/catalog/Categories/Cities/CategoryCityEditor.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";

const confirmModal = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

const categoryCityEditor = create<
  CategorySchemaCityStateDto,
  CategorySchemaDto,
  boolean
>(CategoryCityEditor, "model", "schema");

@Component({
  components: {
    CategoryCityList,
    ConfirmModal,
  },
})
export default class CategoryCities extends Vue {
  @Prop({ required: true }) schema!: CategorySchemaDto;
  @Ref("list") readonly list!: CategoryCityList;

  showEditor = false;
  city = new CategorySchemaCityStateDto();

  async remove(schemaId: number, id: number) {
    const result = await confirmModal(
      "Внимание",
      "Вы действительно хотите удалить данный город?"
    );
    if (!result) return;

    await applicationFacade.categories.deleteCity(schemaId, id);
    this.list.reload();
  }

  async onAdd() {
    this.city = new CategorySchemaCityStateDto();
    await categoryCityEditor(this.city, this.schema);
  }

  async onEdit(event: CategorySchemaCityStateDto) {
    this.city = event;
    await categoryCityEditor(this.city, this.schema);
  }
}
</script>
