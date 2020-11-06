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
            <error :errorMessage="errors" />
            <form class>
              <div class="position-relative row form-group">
                <label for="architect" class="col-sm-2 col-form-label">Группа</label>
                <div class="col-sm-10">
                  <materials-group-select v-model="model"></materials-group-select>
                </div>
              </div>
              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Значение</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.value" class="form-control"></b-form-input>
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

import MaterialsGroupSelect from "@/pages/catalog/common/MaterialsGroupSelect.vue";
import { MaterialStateDto, ValidationErrorDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop } from "vue-property-decorator";
import Error from "@/pages/common/Error.vue";

@Component({
  components: {
    ActionButton,
    MaterialsGroupSelect,
    Error,
  },
})
export default class MaterialsEditor extends DialogComponent<boolean> {
  @Prop({ required: true, type: Object }) readonly model!: MaterialStateDto;

  get title() {
    return !this.model.id ? "Новый материал" : "Редактирование материала";
  }

  errors: ValidationErrorDto[] = [];

  async submit() {
    try {
      await applicationFacade.materialsService.save(this.model);
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
