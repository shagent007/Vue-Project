<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Выберите комплектацию</h5>
            <button type="button" aria-label="Close" class="close" @click="close">×</button>
          </header>
          <div class="modal-body">
            <b-table
              ref="table"
              class="align-middle mb-0"
              borderless
              striped
              hover
              primary-key="id"
              :items="itemsProvider"
              :fields="fields"
              :busy.sync="isBusy"
            >
              <template v-slot:cell(actions)="data">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="select(data.item.id)"
                >Выбрать</button>
              </template>
            </b-table>
          </div>
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

import { Prop, Ref } from "vue-property-decorator";
import { BModal, BTable } from "bootstrap-vue";
import { BundleDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
@Component({
  components: {
    ActionButton,
  },
})
export default class OptionEditor extends DialogComponent<number> {
  @Ref("table") readonly table!: BTable;
  @Prop({ required: false, type: Number }) readonly projectTypeId!: number;
  @Prop({ type: Array, default: () => [] }) readonly excludedIdx!: number[];

  isBusy = false;

  fields = [
    {
      key: "name",
      label: "Название",
      sortable: true,
    },
    {
      key: "discount",
      label: "Скидка",
      sortable: true,
    },
    {
      key: "actions",
      label: "",
    },
  ];

  async itemsProvider() {
    this.isBusy = true;
    if (this.projectTypeId) {
      try {
        const bundles = await applicationFacade.bundlesService.getAll(
          this.projectTypeId
        );
        return bundles.filter((x) => this.excludedIdx.indexOf(x.id) === -1);
      } catch (e) {
        return [];
      } finally {
        this.isBusy = false;
      }
    }
  }

  async select(id: number) {
    this.$close(id);
  }

  async close() {
    this.$close(0);
  }
}
</script>

<style scoped>
.modal {
  overflow: auto;
}
</style>

