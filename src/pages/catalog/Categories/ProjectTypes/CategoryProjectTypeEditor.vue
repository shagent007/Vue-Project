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
                <label for="sku" class="col-sm-2 col-form-label">h1</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.h1" class="form-control"></b-form-input>
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
                <label for="sku" class="col-sm-2 col-form-label">metaDescription</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.metaDescription" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">metaKeywords</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.metaKeywords" class="form-control"></b-form-input>
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
                <label for="sku" class="col-sm-2 col-form-label">order</label>
                <div class="col-sm-10">
                  <b-form-input type="number" v-model="model.order" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">projectType</label>
                <div class="col-sm-10">
                  <project-type-select :disabled="isDisabled" v-model="model" />
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">slug</label>
                <div class="col-sm-10">
                  <b-form-input
                    :disabled="!schema.isDraft"
                    v-model="model.slug"
                    class="form-control"
                  ></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">title</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.title" class="form-control"></b-form-input>
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
import ActionButton from "@/pages/common/ActionButton.vue";

import {
  CategorySchemaProjectTypeStateDto,
  ValidationErrorDto,
  CategorySchemaDto,
} from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop } from "vue-property-decorator";
import ProjectTypeSelect from "@/pages/catalog/common/ProjectTypeSelect.vue";
import Error from "@/pages/common/Error.vue";

@Component({
  components: {
    ActionButton,
    Error,
    ProjectTypeSelect,
  },
})
export default class CategoryProjectTypeEditor extends DialogComponent<
  boolean
> {
  @Prop({ required: true, type: Object })
  readonly model!: CategorySchemaProjectTypeStateDto;
  @Prop({ required: true }) readonly schema!: CategorySchemaDto;

  errors: ValidationErrorDto[] = [];

  get title() {
    return !this.model.id ? "Новый тип проекта" : "Редактирование типа проекта";
  }

  get okTitle() {
    return !this.model.id ? "Добавить" : "Сохранить";
  }

  get isDisabled() {
    return !this.schema.isDraft || this.model.id != undefined;
  }

  async submit() {
    try {
      await applicationFacade.categories.saveProjectType(
        this.schema.id,
        this.model
      );
      this.$close(true);
    } catch (er) {
      this.errors = er.errors;
    }
  }
  close() {
    this.$close(false);
  }
}
</script>

<style scoped>
.modal {
  overflow: auto;
}
</style>
