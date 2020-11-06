<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Новая категория</h5>
            <button type="button" aria-label="Close" class="close" @click="close">×</button>
          </header>
          <div class="modal-body">
            <error :errorMessage="errors" />
            <form>
              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Название</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.name" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Родительская категория</label>
                <div class="col-sm-10">
                  <category-select
                    v-model="model.parentId"
                    :filterConfig="categoryFilterConfig"
                    @input="model.parentId = $event"
                  />
                </div>
              </div>
            </form>
          </div>
          <footer class="modal-footer">
            <b-button variant="secondary" @click="close">Омена</b-button>
            <action-button class="btn-primary" :action="create">Сохранить</action-button>
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
import { Prop } from "vue-property-decorator";
import Error from "@/pages/common/Error.vue";

import { CategoryStateDto, ValidationErrorDto } from "@/api/clients";
import { SearchCategoryCommand } from "@/api/content/SearchCategoryCommand.ts";
import applicationFacade from "@/api/applicationFacade";
import CategorySelect from "@/pages/content/common/CategorySelect.vue";

@Component({
  components: {
    ActionButton,
    Error,
    CategorySelect,
  },
})
export default class AddCategoryModal extends DialogComponent<boolean> {
  @Prop({ required: true, type: Object }) readonly model!: CategoryStateDto;

  errors: ValidationErrorDto[] = [];
  categoryFilterConfig: SearchCategoryCommand = new SearchCategoryCommand();

  async create() {
    try {
      this.model.shortName = this.model.name;
      const result = await applicationFacade.contentCategories.save(this.model);
      this.$close(true);
      this.$router.push({
        name: "content-category-page",
        params: { id: String(result.id) },
      });
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
