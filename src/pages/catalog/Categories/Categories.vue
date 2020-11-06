<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :actions="actions"
    >
      <category-schema-select ref="schemaPicker" @change="onSchemaChange" />
    </page-title>

    <category-schema
      @change="onSchemaStateChange($event)"
      :schema="currentSchema"
      v-model="schemaState"
    />
    <category-project-types
      ref="projectTypes"
      :schema="currentSchema"
      @change="onProjectTypesChange"
    />
    <category-cities ref="cities" :schema="currentSchema" />
    <category-groups ref="groups" :schema="currentSchema" />
    <category-ui-groups ref="uiGroups" :schema="currentSchema" />
    <category-elements ref="elements" :schema="currentSchema" />
    <category-contents ref="contents" :schema="currentSchema" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import {
  CategorySchemaDto,
  CreateCategorySchemaCommandDto,
  PublishCategorySchemaCommandDto,
  CategorySchemaStateDto,
} from "@/api/clients";
import { create } from "vue-modal-dialogs";

import CategorySchemaSelect from "@/pages/catalog/Categories/common/CategorySchemaSelect.vue";
import CategoryElements from "@/pages/catalog/Categories/Elements/CategoryElements.vue";
import CategoryProjectTypes from "@/pages/catalog/Categories/ProjectTypes/CategoryProjectTypes.vue";
import CategoryCities from "@/pages/catalog/Categories/Cities/CategoryCities.vue";
import CategoryGroups from "@/pages/catalog/Categories/Groups/CategoryGroups.vue";
import CategoryUiGroups from "@/pages/catalog/Categories/UiGroups/CategoryUiGroups.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import CategoryContents from "@/pages/catalog/Categories/Contents/CategoryContents.vue";
import CategorySchema from "@/pages/catalog/Categories/Schema/CategorySchema.vue";

const confirmModal = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

@Component({
  components: {
    CategorySchemaSelect,
    PageTitle,
    CategoryElements,
    CategoryProjectTypes,
    CategoryCities,
    CategoryGroups,
    CategoryUiGroups,
    CategoryContents,
    CategorySchema,
  },
})
export default class Project extends Vue {
  @Ref("schemaPicker") readonly schemaPicker!: CategorySchemaSelect;
  @Ref("elements") readonly elements!: CategoryElements;
  @Ref("groups") readonly groups!: CategoryGroups;
  @Ref("uiGroups") readonly uiGroups!: CategoryUiGroups;

  // PageTitle Configs
  heading = "Категории";
  subheading = "";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";

  currentSchema = new CategorySchemaDto();
  schemaState = new CategorySchemaStateDto();

  get isLoaded() {
    return this.currentSchema != undefined;
  }

  async onSchemaChange(data: CategorySchemaDto) {
    this.currentSchema = data;
    this.schemaState = await applicationFacade.categories.getSchema(data.id);
  }

  onProjectTypesChange() {
    console.log("sa;das");

    this.elements.reload();
    this.groups.reload();
    this.uiGroups.reload();
  }

  get actions() {
    if (this.currentSchema.isDraft)
      return [
        {
          text: "Опубликовать",
          class: "btn-success",
          action: this.publish,
        },
        {
          text: "Отмена",
          class: "btn-warning",
          action: this.cancel,
        },
      ];

    if (this.currentSchema.isPublished)
      return [
        {
          text: "Изменить",
          class: "btn-primary",
          action: this.change,
        },
      ];

    return [];
  }

  async change() {
    this.currentSchema = await applicationFacade.categories.createSchema(
      new CreateCategorySchemaCommandDto({
        schemaId: this.currentSchema.id,
      })
    );

    await this.schemaPicker.reload();
  }

  async publish() {
    await applicationFacade.categories.publishSchema(
      new PublishCategorySchemaCommandDto({
        schemaId: this.currentSchema.id,
      })
    );

    await this.schemaPicker.reload();
  }

  async cancel() {
    const result = await confirmModal(
      "Внимание",
      "Вы действительно хотите отменить все изменения"
    );
    if (!result) return;

    this.currentSchema = await applicationFacade.categories.deleteSchema(
      this.currentSchema.id
    );
    await this.schemaPicker.reload();
  }

  async onSchemaStateChange(event: CategorySchemaStateDto) {
    await applicationFacade.categories.saveSchema(event);
  }
}
</script>
