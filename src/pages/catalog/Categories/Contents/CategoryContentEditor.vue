<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" aria-label="Close" class="close" @click="close">×</button>
          </header>
          <div class="modal-body">
            <form class>
              <error :errorMessage="errors" />

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Город</label>
                <div class="col-sm-10">
                  <category-city-select v-model="model" :schema="schema" />
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Тип проекта</label>
                <div class="col-sm-10">
                  <category-project-type-select
                    :value="model.projectTypeId"
                    @change="projectTypeUpdate($event)"
                    :schema="schema"
                  />
                </div>
              </div>

              <category-group-element-select
                v-for="group in groups"
                :key="group.id"
                :projectTypeId="model.projectTypeId"
                :model="group"
                :schema="schema"
                :elements="model.elements"
                @updateEl="onElemntUpdate($event)"
              />

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">H1</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.h1" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.title" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Description</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.description" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">metaKeywords</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.metaKeywords" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">metaDescription</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.metaDescription" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">navLinkText</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.navLinkText" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">navLinkTitle</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.navLinkTitle" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">menuLinkText</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.menuLinkText" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">menuLinkTitle</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.menuLinkTitle" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label mt-2">Свойтва</label>
                <div class="col-sm-10">
                  <category-properties-table v-model="model.properties" />
                </div>
              </div>
            </form>
          </div>
          <footer class="modal-footer">
            <b-button variant="secondary" @click="close">Омена</b-button>
            <action-button class="btn-primary" :action="submit">{{ okTitle }}</action-button>
          </footer>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" @click="close"></div>
  </div>
</template>

<script lang="ts">
import { DialogComponent } from "vue-modal-dialogs";
import Component from "vue-class-component";
import {
  CategorySchemaContentStateDto,
  ValidationErrorDto,
  CategorySchemaDto,
  CategorySchemaPropertyDto,
  CategorySchemaGroupDto,
} from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref, Watch } from "vue-property-decorator";

import CategoryGroupElementSelect from "@/pages/catalog/Categories/common/CategoryGroupElementSelect.vue";
import CategoryCitySelect from "@/pages/catalog/Categories/common/CategoryCitySelect.vue";
import CategoryProjectTypeSelect from "@/pages/catalog/Categories/common/CategoryProjectTypeSelect.vue";
import CategoryPropertiesTable from "@/pages/catalog/Categories/common/CategoryPropertiesTable.vue";
import Error from "@/pages/common/Error.vue";
import ActionButton from "@/pages/common/ActionButton.vue";

@Component({
  components: {
    ActionButton,
    Error,
    CategoryProjectTypeSelect,
    CategoryGroupElementSelect,
    CategoryCitySelect,
    CategoryPropertiesTable,
  },
})
export default class CategoryContentEditor extends DialogComponent<boolean> {
  @Prop({ type: Number }) readonly id!: number;
  @Prop({ required: true }) readonly schema!: CategorySchemaDto;

  close() {
    this.$close(false);
  }

  errors: ValidationErrorDto[] = [];
  model = new CategorySchemaContentStateDto();
  groups = new Array<CategorySchemaGroupDto>();

  onElemntUpdate(event: any) {
    if (event.old == -1 && event.cur != -1)
      this.model.elements?.push(event.cur);
    else if (event.old != -1 && event.cur == -1)
      this.model.elements?.splice(this.model.elements?.indexOf(event.old), 1);
    else if (event.old != -1 && event.cur != -1)
      this.model.elements?.splice(
        this.model.elements?.indexOf(event.old),
        1,
        event.cur
      );
  }

  get title() {
    return !this.model.id ? "Новое правило" : "Редактирование правила";
  }

  get okTitle() {
    return !this.model.id ? "Добавить" : "Сохранить";
  }

  projectTypeUpdate(event: number) {
    this.model.projectTypeId = event;
    this.updateGroups(event);
  }

  async updateGroups(projectTypeId: number | undefined) {
    this.groups = await applicationFacade.categories.getGroups(
      this.schema.id,
      projectTypeId
    );
  }

  async created() {
    if (this.id != 1)
      this.model = await applicationFacade.categories.getContentById(
        this.schema.id,
        this.id
      );
    else {
      this.model = new CategorySchemaContentStateDto();
      this.model.properties = new Array<CategorySchemaPropertyDto>();
      this.model.elements = new Array<number>();
    }

    if (this.model.projectTypeId != null) {
      this.updateGroups(this.model.projectTypeId);
    }
  }

  async submit() {
    try {
      await applicationFacade.categories.saveContent(
        this.schema.id,
        this.model
      );
      this.$close(true);
    } catch (er) {
      console.log(er);
    }
  }
}
</script>

<style scoped>
.modal {
  overflow: auto;
}
</style>
