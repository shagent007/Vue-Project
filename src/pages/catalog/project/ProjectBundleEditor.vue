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
            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
              <colgroup>
                <col />
                <col style="width: 200px" />
                <col style="width: 200px" />
                <col style="width: 200px" />
              </colgroup>
              <tbody>
                <tr>
                  <td>Название</td>
                  <td colspan="3">
                    <b-form-input v-model="model.name"></b-form-input>
                  </td>
                </tr>
              </tbody>
              <tbody v-for="group in groups" :key="group.id">
                <tr>
                  <th>{{ group.name }}</th>
                  <th>Количество</th>
                  <th>Стоимость, р</th>
                  <th>Сумма, р</th>
                </tr>
                <project-bundle-editor-option-row
                  v-for="option in getOptions(group)"
                  :key="option.id"
                  :option="option"
                  :bundle-options="model.options"
                  :prices="prices.options"
                  @on-state-changed="onOptionRowStateChanged"
                />
              </tbody>
              <tbody>
                <tr>
                  <td colspan="2"></td>
                  <td>
                    <b>Итого</b>
                  </td>
                  <td>{{ prices.subTotal }}</td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    <b>Скидка</b>
                  </td>
                  <td>
                    <b-form-input
                      type="number"
                      v-model.number="model.discount"
                      @change="discountSave"
                    ></b-form-input>
                  </td>
                  <td>{{ prices.discount }}</td>
                </tr>

                <tr>
                  <td colspan="2"></td>
                  <td>
                    <b>Итого</b>
                  </td>
                  <td>{{ prices.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <footer class="modal-footer">
            <b-button variant="secondary" @click="close">Омена</b-button>
            <action-button class="btn-primary" :action="onSave">Сохранить</action-button>
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

import { Prop, Ref, Watch } from "vue-property-decorator";
import {
  OptionGroupDto,
  OptionDto,
  ProjectBundleStateDto,
  ProjectBundlePricesDto,
  ProjectBundleOptionStateDto,
} from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import ProjectBundleEditorOptionRow, {
  OptionRowState,
} from "@/pages/catalog/project/ProjectBundleEditorOptionRow.vue";

@Component({
  components: {
    ActionButton,
    ProjectBundleEditorOptionRow,
  },
})
export default class ProjectBundleEditor extends DialogComponent<boolean> {
  @Prop({ required: false, type: Number }) readonly projectId!: number;
  @Prop({ required: false, type: Number }) readonly projectTypeId!:
    | number
    | undefined;
  @Prop({ required: true, type: Object })
  readonly value!: ProjectBundleStateDto;

  get title() {
    return this.value.name;
  }

  model = new ProjectBundleStateDto();
  prices = new ProjectBundlePricesDto();
  groups = new Array<OptionGroupDto>();
  options = new Array<OptionDto>();

  async created() {
    this.model.init(this.value);
    this.prices = await applicationFacade.projectsService.getBundlePrice(
      this.projectId,
      this.model
    );

    if (!this.projectTypeId) return;
    this.groups = await applicationFacade.optionGroups.getAll(
      this.projectTypeId
    );
    this.options = await applicationFacade.optionsService.getAll(
      this.projectTypeId
    );
  }

  getOptions(group: OptionGroupDto) {
    return this.options.filter((x) => x.groupId == group.id);
  }

  async onOptionRowStateChanged(state: OptionRowState) {
    const existing = this.model!.options!.find(
      (x) => x.optionId == state.optionId
    );

    if (existing) {
      if (!state.selected) {
        this.model.options = this.model?.options?.filter(
          (x) => x.optionId !== state.optionId
        );
      } else {
        existing.price = state.price;
        existing.count = state.count;
      }
    } else {
      if (state.selected) {
        this.model?.options?.push(
          new ProjectBundleOptionStateDto({
            optionId: state.optionId,
            count: state.count ?? undefined,
            price: state.price,
          })
        );
      }
    }

    this.prices = await applicationFacade.projectsService.getBundlePrice(
      this.projectId,
      this.model
    );
  }

  async discountSave() {
    this.prices = await applicationFacade.projectsService.getBundlePrice(
      this.projectId,
      this.model
    );
  }

  async onSave() {
    await applicationFacade.projectsService.saveBundle(
      this.projectId,
      this.model
    );
    this.$close(true);
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
