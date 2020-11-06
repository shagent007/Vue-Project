<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Новая группа</h5>
            <button type="button" aria-label="Close" class="close" @click="decline">×</button>
          </header>
          <div class="modal-body">
            <error :errorMessage="errors" />
            <form class>
              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Название</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.name"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Код</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.code"></b-form-input>
                </div>
              </div>
            </form>
          </div>
          <footer class="modal-footer">
            <b-button variant="secondary" @click="decline">Омена</b-button>
            <action-button class="btn-primary" :action="submit">Сохранить</action-button>
          </footer>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" @click="decline"></div>
  </div>
</template>

<script lang="ts">
import { DialogComponent } from "vue-modal-dialogs";
import Component from "vue-class-component";
import ActionButton from "@/pages/common/ActionButton.vue";

import { PropertyGroupDto, ValidationErrorDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref } from "vue-property-decorator";
import Error from "@/pages/common/Error.vue";

@Component({
  components: {
    ActionButton,
    Error,
  },
})
export default class AddGroupModal extends DialogComponent<boolean> {
  @Prop({ required: true, type: Array })
  readonly value!: PropertyGroupDto[];

  errors: ValidationErrorDto[] = [];

  model = new PropertyGroupDto();

  async submit() {
    if (!this.model.name || !this.model.code) return;
    this.value.push(this.model);
    this.model = new PropertyGroupDto();
    this.$close(true);
  }

  decline() {
    this.$close(false);
  }
}
</script>

<style scoped>
.modal {
  overflow: auto;
}
</style>
