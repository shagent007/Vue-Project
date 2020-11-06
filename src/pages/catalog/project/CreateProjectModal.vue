<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Новый проект</h5>
            <button type="button" aria-label="Close" class="close" @click="close">×</button>
          </header>
          <div class="modal-body">
            <form class>
              <div class="position-relative row form-group">
                <label for="projectType" class="col-sm-2 col-form-label">Тип проекта</label>
                <div class="col-sm-10">
                  <project-type-select id="projectType" v-model="command"></project-type-select>
                </div>
              </div>
              <div class="position-relative row form-group">
                <label for="architect" class="col-sm-2 col-form-label">Архитектор</label>
                <div class="col-sm-10">
                  <architect-select id="architect" v-model="command"></architect-select>
                </div>
              </div>
            </form>
          </div>
          <footer class="modal-footer">
            <b-button variant="secondary" @click="close">Омена</b-button>
            <action-button class="btn-primary" :action="submit">Продолжить</action-button>
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
import { SearchProjectsCommand } from "@/api/catalog/SearchProjectsCommand.ts";
import ProjectTypeSelect from "@/pages/catalog/common/ProjectTypeSelect.vue";
import ArchitectSelect from "@/pages/catalog/common/ArchitextSelect.vue";
import { CreateProjectCommandDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref } from "vue-property-decorator";
import { BModal } from "bootstrap-vue";

@Component({
  components: {
    ActionButton,
    ProjectTypeSelect,
    ArchitectSelect,
  },
})
export default class CreateProjectModal extends DialogComponent<boolean> {
  @Prop({ type: Object }) readonly filterConfig!: SearchProjectsCommand;
  command = new CreateProjectCommandDto();

  async submit() {
    const result = await applicationFacade.projectsService.create(this.command);

    this.$close(false);
    await this.$router.push({
      name: "project",
      params: {
        q: JSON.stringify(this.filterConfig),
        id: result.id.toString(),
      },
    });
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
