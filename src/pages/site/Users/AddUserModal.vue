<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Новый пользователь</h5>
            <button type="button" aria-label="Close" class="close" @click="close">×</button>
          </header>
          <div class="modal-body">
            <error :errorMessage="errors" />
            <form>
              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Имя пользователя</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.userName" class="form-control"></b-form-input>
                </div>
              </div>
              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Телефон</label>
                <div class="col-sm-10">
                  <b-form-input type="number" v-model.number="model.phone" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Почта</label>
                <div class="col-sm-10">
                  <b-form-input type="email" v-model="model.email" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Роли</label>
                <div class="col-sm-10">
                  <role-select-picker :value="model.roles" @update="updateRole($event)" />
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

import {
  CreateUserCommand,
  ValidationErrorDto,
  CreateUserCommandResult,
} from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop } from "vue-property-decorator";

import Error from "@/pages/common/Error.vue";
import CategorySelect from "@/pages/content/common/CategorySelect.vue";
import RoleSelectPicker from "@/pages/site/common/RoleSelectPicker.vue";
import ShowPasswordModal from "@/pages/site/common/ShowPasswordModal.vue";

@Component({
  components: {
    ActionButton,
    Error,
    CategorySelect,
    RoleSelectPicker,
    ShowPasswordModal,
  },
})
export default class AddUserModal extends DialogComponent<CreateUserCommand> {
  @Prop({ required: true, type: Object }) readonly model!: CreateUserCommand;

  errors: ValidationErrorDto[] = [];

  created() {
    this.model.roles = new Array<string>();
  }

  updateRole(event: Array<string>) {
    this.model.roles = event;
  }

  result = new CreateUserCommandResult();

  async submit() {
    try {
      this.result = await applicationFacade.users.create(this.model);
      this.$close(this.result);
    } catch (er) {
      this.errors = er.errors;
    }
  }

  close() {
    this.$close(new CreateUserCommandResult());
  }
}
</script>

<style scoped>
.modal {
  overflow: auto;
}
</style>