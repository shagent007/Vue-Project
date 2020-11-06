<template>
  <div class="main-card mt-3 card">
    <div class="card-body">
      <h5 class="card-title">Ui Группы</h5>

      <b-button
        v-if="schema.isDraft"
        class="mr-2 btn-shadow"
        @click="onAdd"
        variant="primary"
        >Добавить</b-button
      >

      <category-project-type-tabs
        v-if="schema.id"
        ref="tabs"
        @change="onProjectTypeChanged($event)"
        :schema="schema.id"
      />

      <category-ui-group-list
        ref="table"
        :projectTypeId="projectTypeId"
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
  CategorySchemaUiGroupStateDto,
  CategorySchemaDto,
} from "@/api/clients";
import { create } from "vue-modal-dialogs";

import CategoryUiGroupEditor from "@/pages/catalog/Categories/UiGroups/CategoryUiGroupEditor.vue";
import CategoryProjectTypeTabs from "@/pages/catalog/Categories/common/CategoryProjectTypeTabs.vue";
import CategoryUiGroupList from "@/pages/catalog/Categories/UiGroups/CategoryUiGroupList.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
const confirmRemove = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

const categoryUiGroupEditor = create<
  CategorySchemaDto,
  CategorySchemaUiGroupStateDto,
  boolean
>(CategoryUiGroupEditor, "schema", "model");

@Component({
  components: {
    CategoryProjectTypeTabs,
    CategoryUiGroupList,
  },
})
export default class CategoryUiGroups extends Vue {
  @Prop({ required: true }) schema!: CategorySchemaDto;
  @Ref("table") readonly table!: CategoryUiGroupList;
  @Ref("tabs") tabs!: CategoryProjectTypeTabs;

  projectTypeId = -1;

  async remove(schemaId: number, id: number) {
    const result = await confirmRemove(
      "Внимание",
      "Вы действительно хотите удалить данную ui группу?"
    );
    if (!result) return;

    await applicationFacade.categories.deleteUiGroup(schemaId, id);
    this.table.reload();
  }

  async onAdd() {
    const uiGroup = new CategorySchemaUiGroupStateDto();
    uiGroup.projectTypeId = this.projectTypeId;
    await categoryUiGroupEditor(this.schema, uiGroup);
    this.table.reload();
  }

  async onEdit(event: CategorySchemaUiGroupStateDto) {
    await categoryUiGroupEditor(this.schema, event);
    this.table.reload();
  }

  onProjectTypeChanged(id: number) {
    this.projectTypeId = id;
  }

  public async reload() {
    this.tabs.reload();
  }
}
</script>
