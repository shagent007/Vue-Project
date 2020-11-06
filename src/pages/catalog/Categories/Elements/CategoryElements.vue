<template>
  <b-card class="mt-3">
    <h5 class="card-title">Элементы</h5>
    <b-button
      v-if="schema.isDraft"
      class="mr-2 btn-shadow"
      @click="onAdd"
      variant="primary"
      >Добавить</b-button
    >

    <category-project-type-tabs
      ref="tabs"
      v-if="schema.id"
      @change="onProjectTypeChanged($event)"
      :schema="schema.id"
    />

    <category-elements-list
      ref="elements"
      :projectTypeId="projectTypeId"
      :schema="schema"
      @edit="onEdit($event)"
      @remove="remove(schema.id, $event)"
    />
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref } from "vue-property-decorator";
import { CategorySchemaElementDto, CategorySchemaDto } from "@/api/clients";
import { create } from "vue-modal-dialogs";

import CategoryProjectTypeTabs from "@/pages/catalog/Categories/common/CategoryProjectTypeTabs.vue";
import CategoryElementsList from "@/pages/catalog/Categories/Elements/CategoryElementsList.vue";
import CategoryElementEditor from "@/pages/catalog/Categories/Elements/CategoryElementEditor.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";

const confirmModal = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

const categoryElementEditor = create<
  number,
  number,
  CategorySchemaDto,
  boolean
>(CategoryElementEditor, "id", "currentProjectTypeId", "schema");

@Component({
  components: {
    CategoryElementsList,
    CategoryProjectTypeTabs,
  },
})
export default class CategoryElements extends Vue {
  @Prop({ required: true }) readonly schema!: CategorySchemaDto;
  @Ref("tabs") readonly tabs!: CategoryProjectTypeTabs;
  @Ref("elements") readonly elements!: CategoryElementsList;

  projectTypeId = -1;

  reloadList() {
    this.elements.reload();
  }

  async remove(schemaId: number, id: number) {
    const result = await confirmModal(
      "Внимание",
      "Вы действительно хотите удалить данный элемент?"
    );
    if (!result) return;

    await applicationFacade.categories.deleteElement(schemaId, id);
    this.reloadList();
  }

  async onAdd() {
    await categoryElementEditor(0, this.projectTypeId, this.schema);
    this.elements.reload();
  }

  async onEdit(event: number) {
    await categoryElementEditor(event, this.projectTypeId, this.schema);
    this.elements.reload();
  }

  onProjectTypeChanged(id: number) {
    this.projectTypeId = id;
  }

  public async reload() {
    this.tabs.reload();
  }
}
</script>
