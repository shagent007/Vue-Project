<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Новый архитектор</h5>
            <button type="button" aria-label="Close" class="close" @click="close">×</button>
          </header>
          <div class="modal-body">
            <form class>
              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Название</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.name" class="form-control"></b-form-input>
                </div>
              </div>
              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Серия проекта</label>
                <div class="col-sm-10">
                  <b-form-input type="number" v-model="model.projectSeries" class="form-control"></b-form-input>
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
import { Prop } from "vue-property-decorator";
import ActionButton from "@/pages/common/ActionButton.vue";
import MaterialsGroupSelect from "@/pages/catalog/common/MaterialsGroupSelect.vue";
import { MaterialStateDto, ValidationErrorDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import Error from "@/pages/common/Error.vue";

@Component({
  components: {
    ActionButton,
    MaterialsGroupSelect,
    Error,
  },
})
export default class ArchitectModal extends DialogComponent<boolean> {
  @Prop({ required: true, type: Object }) readonly model!: MaterialStateDto;

  close() {
    this.$close(false);
  }

  errors: ValidationErrorDto[] = [];

  async create() {
    try {
      await applicationFacade.architects.save(this.model);
      this.$close(true);
    } catch (er) {
      this.errors = er.errors;
    }
  }
}
</script>
