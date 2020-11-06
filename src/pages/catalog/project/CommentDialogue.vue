<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-md">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Комментарий</h5>
            <button type="button" aria-label="Close" class="close" @click="close">×</button>
          </header>
          <div class="modal-body">
            <b-form-textarea :value="content.comment" @change="onCommentChange"></b-form-textarea>
          </div>
          <footer class="modal-footer">
            <b-button variant="secondary" @click="close">Омена</b-button>
            <action-button class="btn-primary" :action="change">Сохранить</action-button>
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
import { ProjectAnalogDto } from "@/api/clients.ts";

@Component({
  components: {
    ActionButton,
  },
})
export default class AnalogProjectComment extends DialogComponent<
  ProjectAnalogDto
> {
  @Prop({ type: Object }) readonly content!: ProjectAnalogDto;
  close() {
    this.$close(new ProjectAnalogDto());
  }

  newContent = new ProjectAnalogDto();

  onCommentChange(value: string) {
    this.newContent.id = this.content.id;
    this.newContent.comment = value;
  }

  change() {
    this.$close(this.newContent);
  }
}
</script>

<style scoped>
.modal {
  overflow: auto;
}
</style>
