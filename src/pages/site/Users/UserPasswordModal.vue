<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-sm">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" aria-label="Close" class="close" @click="$close(false)">×</button>
          </header>
          <div class="modal-body">
            <center>{{ model.password }}</center>
          </div>
          <footer class="modal-footer">
            <b-button block variant="primary" @click="confirm">Продолжить</b-button>
          </footer>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" @click="$close(false)"></div>
  </div>
</template>

<script lang="ts">
import { DialogComponent } from "vue-modal-dialogs";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { CreateUserCommandResult } from "@/api/clients";

@Component
export default class CancelConfirm extends DialogComponent<boolean> {
  @Prop({ type: String }) readonly title!: string;
  @Prop({ type: Object }) readonly model!: CreateUserCommandResult;

  confirm() {
    this.$close(true);
    this.$router.push({
      name: "site-user-id",
      params: { id: String(this.model.userId) },
    });
  }
}
</script>
