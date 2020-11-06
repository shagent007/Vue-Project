<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Новая страница</h5>
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
                <label for="sku" class="col-sm-2 col-form-label">Родитель</label>
                <div class="col-sm-10">
                  <page-parent-select
                    v-model="model.parentId"
                    @input="model.parentId = $event"
                    :filterConfig="newFilterConfig"
                  />
                </div>
              </div>
            </form>
          </div>
          <footer class="modal-footer">
            <b-button variant="secondary" @click="close">Омена</b-button>
            <action-button class="btn-primary" :action="submit">Сохранить</action-button>
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

import { PageStateDto, ValidationErrorDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref, Watch } from "vue-property-decorator";
import { BModal } from "bootstrap-vue";
import Error from "@/pages/common/Error.vue";
import CategorySelect from "@/pages/content/common/CategorySelect.vue";
import PageParentSelect from "@/pages/site/common/PageParentSelect.vue";
import { SearchPageCommand } from "@/api/site/SearchPageCommand.ts";

@Component({
  components: {
    ActionButton,
    Error,
    CategorySelect,
    PageParentSelect,
  },
})
export default class AddPostModal extends DialogComponent<boolean> {
  @Prop({ required: true, type: Object }) readonly model!: PageStateDto;
  newFilterConfig = new SearchPageCommand();
  errors: ValidationErrorDto[] = [];

  async submit() {
    try {
      this.model.shortName = this.model.name;
      const result = await applicationFacade.pages.save(this.model);
      this.$close(true);

      this.$router.push({
        name: "site-page-id",
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
