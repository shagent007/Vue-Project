<template>
  <div class="main-card mt-3 card">
    <div class="card-body">
      <h5 class="card-title">Правила переопределения</h5>

      <b-button class="mr-2 btn-shadow" @click="onAdd" variant="primary">Добавить</b-button>

      <category-content-list
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
import { Prop, Ref, Watch } from "vue-property-decorator";
import {
  CategorySchemaContentStateDto,
  CategorySchemaDto,
} from "@/api/clients";
import { create } from "vue-modal-dialogs";

import CategoryContentEditor from "@/pages/catalog/Categories/Contents/CategoryContentEditor.vue";
import CategoryContentList from "@/pages/catalog/Categories/Contents/CategoryContentList.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
const confirmModal = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

const categoryContentEditor = create<number, CategorySchemaDto, boolean>(
  CategoryContentEditor,
  "id",
  "schema"
);

@Component({
  components: {
    CategoryContentList,
  },
})
export default class CategoryContents extends Vue {
  @Prop({ required: true }) schema!: CategorySchemaDto;
  @Ref("table") readonly table!: CategoryContentList;

  async remove(schemaId: number, id: number) {
    const result = await confirmModal(
      "Внимание",
      "Вы действительно хотите удалить данную правилу переопределений?"
    );
    if (!result) return;

    await applicationFacade.categories.deleteContent(schemaId, id);
    this.table.reload();
  }

  async onAdd() {
    await categoryContentEditor(1, this.schema);
    this.table.reload();
  }

  async onEdit(event: number) {
    await categoryContentEditor(event, this.schema);
    this.table.reload();
  }
}
</script>
