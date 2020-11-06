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
            <form class>
              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Порядок</label>
                <div class="col-sm-10">
                  <b-form-input type="number" v-model="model.order" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Название</label>
                <div class="col-sm-10">
                  <b-form-input v-model="model.name" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Тип проекта</label>
                <div class="col-sm-10">
                  <project-type-select v-model="model" />
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Скидка</label>
                <div class="col-sm-10">
                  <b-form-input type="number" v-model="model.discount" class="form-control"></b-form-input>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">
                  Добавлять коплект при создании
                  проекта
                </label>
                <div class="col-sm-10">
                  <b-form-checkbox type="number" v-model="model.default"></b-form-checkbox>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label for="sku" class="col-sm-2 col-form-label">Опции</label>
                <div class="col-sm-10">
                  <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                    <tbody v-for="(option, index) in options" :key="option.id">
                      <tr class="mt-4 mb-2" v-if="newGroup(index)">
                        <td>
                          <b>{{ option.group }}</b>
                        </td>
                        <td></td>
                      </tr>
                      <bundle-option
                        :options="getOptions"
                        :option="option"
                        @update="updateOption($event)"
                      ></bundle-option>
                    </tbody>
                  </table>
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
import { Prop, Watch } from "vue-property-decorator";
import ActionButton from "@/pages/common/ActionButton.vue";
import {
  BundleStateDto,
  OptionDto,
  ValidationErrorDto,
  BundleOptionStateDto,
} from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import Error from "@/pages/common/Error.vue";
import BundleOption from "./BundleOption.vue";
import ProjectTypeSelect from "@/pages/catalog/common/ProjectTypeSelect.vue";

@Component({
  components: {
    ActionButton,
    Error,
    ProjectTypeSelect,
    BundleOption,
  },
})
export default class BundleEditor extends DialogComponent<BundleStateDto> {
  @Prop({ required: true, type: Object }) model!: BundleStateDto;

  close() {
    const model = new BundleStateDto();
    this.$close(model);
  }

  submit() {
    this.$close(this.model);
  }

  errors: ValidationErrorDto[] = [];

  get title() {
    return !this.model.id ? "Новый комплект" : "Редактирование комплекта";
  }

  get getOptions() {
    return this.model.options ? this.model.options : [];
  }

  updateOption(event: BundleOptionStateDto[]) {
    this.model.options = event;
  }

  newGroup(index: number) {
    if (index > 0)
      return this.options[index - 1].group != this.options[index].group;
    else return true;
  }

  options: Array<OptionDto> = [];

  async created() {
    this.options = await applicationFacade.optionsService.getAll(
      this.model.projectTypeId
    );
    this.options.sort((a, b) => (a.groupId > b.groupId ? 1 : -1));
  }
}
</script>

<style scoped>
.modal {
  overflow: auto;
}
</style>
