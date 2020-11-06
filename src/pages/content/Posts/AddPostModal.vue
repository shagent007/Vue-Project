<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Новая статья</h5>
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
                <label for="sku" class="col-sm-2 col-form-label">Категория</label>
                <div class="col-sm-10">
                  <category-select
                    v-model="model.parentId"
                    :filterConfig="categoryFilterConfig"
                    @input="categoryChange($event)"
                  />
                </div>
              </div>
            </form>
          </div>
          <footer class="modal-footer">
            <b-button variant="secondary" @click="close">Омена</b-button>
            <action-button class="btn-primary" :action="create">Добавить</action-button>
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

import { PostStateDto, ValidationErrorDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop } from "vue-property-decorator";
import { SearchCategoryCommand } from "@/api/content/SearchCategoryCommand.ts";
import Error from "@/pages/common/Error.vue";
import CategorySelect from "@/pages/content/common/CategorySelect.vue";

@Component({
  components: {
    ActionButton,
    Error,
    CategorySelect,
  },
})
export default class AddPostModal extends DialogComponent<boolean> {
  @Prop({ required: true, type: Object }) readonly model!: PostStateDto;

  categoryFilterConfig: SearchCategoryCommand = new SearchCategoryCommand();
  errors: ValidationErrorDto[] = [];
  categoryChange(event: number) {
    this.model.categoryId = event;
  }
  async create() {
    try {
      this.model.shortName = this.model.name;
      const result = await applicationFacade.posts.save(this.model);
      this.$close(true);

      this.$router.push({
        name: "post",
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
