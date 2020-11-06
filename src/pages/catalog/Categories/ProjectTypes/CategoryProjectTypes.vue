<template>
  <div class="main-card mt-3 card">
    <div class="card-body">
      <h5 class="card-title">Типы проектов</h5>
      <b-button
        v-if="schema.isDraft"
        class="mr-2 btn-shadow"
        @click="onAdd"
        variant="primary"
        >Добавить</b-button
      >

      <category-project-type-list
        v-if="schema.id"
        ref="table"
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
import { Prop, Ref } from "vue-property-decorator";
import {
  CategorySchemaProjectTypeDto,
  CategorySchemaDto,
} from "@/api/clients.ts";
import { create } from "vue-modal-dialogs";

import CategoryProjectTypeEditor from "@/pages/catalog/Categories/ProjectTypes/CategoryProjectTypeEditor.vue";
import CategoryProjectTypeList from "@/pages/catalog/Categories/ProjectTypes/CategoryProjectTypeList.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";

const confirmRemove = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

const categoryProjectTypeEditor = create<
  CategorySchemaDto,
  CategorySchemaProjectTypeDto,
  boolean
>(CategoryProjectTypeEditor, "schema", "model");

@Component({
  components: {
    CategoryProjectTypeList,
  },
})
export default class CategoryProjectTypes extends Vue {
  @Prop({ required: true }) schema!: CategorySchemaDto;
  @Ref("table") readonly table!: CategoryProjectTypeList;

  async remove(schemaId: number, id: number) {
    const result = await confirmRemove(
      "Внимание",
      "Вы действительно хотите удалить данный тип проекта?"
    );
    if (!result) return;

    await applicationFacade.categories.deleteProjectType(schemaId, id);
    this.table.reload();
    this.$emit("change");
  }

  async onAdd() {
    await categoryProjectTypeEditor(
      this.schema,
      new CategorySchemaProjectTypeDto()
    );
    this.table.reload();
    this.$emit("change");
  }

  async onEdit(event: CategorySchemaProjectTypeDto) {
    await categoryProjectTypeEditor(this.schema, event);
    this.table.reload();
    this.$emit("change");
  }
}
</script>
