<template>
  <div class="main-card mt-3 card">
    <div class="card-body">
      <h5 class="card-title">Группы</h5>
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

      <category-group-list
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
  CategorySchemaGroupStateDto,
  CategorySchemaDto,
} from "@/api/clients.ts";
import { create } from "vue-modal-dialogs";

import CategoryGroupEditor from "@/pages/catalog/Categories/Groups/CategoryGroupEditor.vue";
import CategoryGroupList from "@/pages/catalog/Categories/Groups/CategoryGroupList.vue";
import CategoryProjectTypeTabs from "@/pages/catalog/Categories/common/CategoryProjectTypeTabs.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";

const confirmModal = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

const categoryGroupEditor = create<
  CategorySchemaDto,
  CategorySchemaGroupStateDto,
  boolean
>(CategoryGroupEditor, "schema", "model");

@Component({
  components: {
    CategoryGroupList,
    CategoryProjectTypeTabs,
  },
})
export default class CategoryGroups extends Vue {
  @Prop({ required: true }) schema!: CategorySchemaDto;
  @Ref("table") readonly table!: CategoryGroupList;
  @Ref("tabs") tabs!: CategoryProjectTypeTabs;

  projectTypeId = -1;

  async remove(schemaId: number, id: number) {
    const result = await confirmModal(
      "Внимание",
      "Вы действительно хотите удалить данную группу?"
    );
    if (!result) return;

    await applicationFacade.categories.deleteGroup(schemaId, id);
    this.table.reload();
  }

  async onAdd() {
    const group = new CategorySchemaGroupStateDto();
    group.projectTypeId = this.projectTypeId;
    await categoryGroupEditor(this.schema, group);
    this.table.reload();
  }

  async onEdit(event: CategorySchemaGroupStateDto) {
    await categoryGroupEditor(this.schema, event);
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
