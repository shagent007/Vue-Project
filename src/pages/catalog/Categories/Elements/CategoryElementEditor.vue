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
              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Тип проекта</label>
                <div class="col-sm-10">
                  <category-project-type-select
                    :value="projectTypeId"
                    @change="projectTypeUpdate($event)"
                    :schema="schema"
                    :disabled="!schema.isDraft"
                  />
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Группа</label>
                <div class="col-sm-10">
                  <category-group-select
                    v-model="model"
                    :schema="schema"
                    :projectTypeId="projectTypeId"
                    :disabled="!schema.isDraft"
                  />
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">UI Группа</label>
                <div class="col-sm-10">
                  <category-ui-group-select
                    v-model="model"
                    :schema="schema"
                    :projectTypeId="projectTypeId"
                    :disabled="!schema.isDraft"
                  />
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Позиция</label>
                <div class="col-sm-10">
                  <b-form-input type="number" v-model="model.order" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Url</label>
                <div class="col-sm-10">
                  <b-form-input
                    :disabled="!schema.isDraft"
                    v-model="model.slug"
                    class="form-control"
                  ></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">H1</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.h1" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">title</label>
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
  CategorySchemaElementStateDto,
  ValidationErrorDto,
  CategorySchemaDto,
  CategorySchemaPropertyDto,
} from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref, Watch } from "vue-property-decorator";
import { BModal } from "bootstrap-vue";

import CategoryProjectTypeSelect from "@/pages/catalog/Categories/common/CategoryProjectTypeSelect.vue";
import CategoryUiGroupSelect from "@/pages/catalog/Categories/common/CategoryUiGroupSelect.vue";
import CategoryGroupSelect from "@/pages/catalog/Categories/common/CategoryGroupSelect.vue";
import CategoryPropertiesTable from "@/pages/catalog/Categories/common/CategoryPropertiesTable.vue";
import Error from "@/pages/common/Error.vue";
import ActionButton from "@/pages/common/ActionButton.vue";

@Component({
  components: {
    ActionButton,

    Error,
    CategoryProjectTypeSelect,
    CategoryUiGroupSelect,
    CategoryGroupSelect,
    CategoryPropertiesTable,
  },
})
export default class CategoryElementEditor extends DialogComponent<boolean> {
  @Prop({ type: Number }) readonly currentProjectTypeId!: number;
  @Prop({ type: Number }) readonly id?: number;
  @Prop({ required: true }) readonly schema!: CategorySchemaDto;

  close() {
    this.$close(false);
  }

  errors: ValidationErrorDto[] = [];
  model = new CategorySchemaElementStateDto();

  get title() {
    return !this.model.id ? "Новый элемент" : "Редактирование элемента";
  }

  get okTitle() {
    return !this.model.id ? "Добавить" : "Сохранить";
  }

  projectTypeId = -1;

  projectTypeUpdate(event: number) {
    this.projectTypeId = event;
  }

  async created() {
    if (this.id)
      this.model = await applicationFacade.categories.getElementById(
        this.schema.id,
        this.id
      );
    else {
      this.model = new CategorySchemaElementStateDto();
      this.model.properties = new Array<CategorySchemaPropertyDto>();
    }

    this.projectTypeId = this.currentProjectTypeId;
  }

  async submit() {
    try {
      await applicationFacade.categories.saveElement(
        this.schema.id,
        this.model
      );
      this.$close(true);
    } catch (er) {
      console.log(er);
    }

    this.model = new CategorySchemaElementStateDto();
    this.model.properties = new Array<CategorySchemaPropertyDto>();
  }
}
</script>

<style scoped>
.modal {
  overflow: auto;
}
</style>
