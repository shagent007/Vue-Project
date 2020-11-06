<template>
  <div class="main-card mb-3 card">
    <div class="card-body">
      <b-table
        ref="table"
        class="align-middle mb-0"
        borderless
        striped
        hover
        primary-key="id"
        :items="itemsProvider"
        :fields="fields"
        :busy.sync="loading"
      >
        <template v-slot:table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{width: field.key === 'actions' ? '90px' : 'auto' }"
          />
        </template>
        <template v-slot:cell(value)="data">
          <b-form-input v-model="data.item.value" @change="onchange(data.item)"></b-form-input>
        </template>

        <template v-slot:cell(actions)="data">
          <div style="text-align: center;">
            <button
              @click="remove(data.item.id)"
              class="border-0 btn-transition btn btn-outline-danger"
            >
              <font-awesome-icon icon="trash-alt" />
            </button>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref, Watch } from "vue-property-decorator";
import { SettingDto } from "@/api/clients";
import { BTable } from "bootstrap-vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import { create } from "vue-modal-dialogs";
const confirmRemove = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

library.add(faEdit);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
})
export default class SettingList extends Vue {
  @Ref("table") readonly table!: BTable;
  loading = false;
  fields = [
    {
      key: "key",
      label: "Название",
      sortable: true,
    },
    {
      key: "value",
      label: "значение",
      sortable: true,
    },
    {
      key: "actions",
      label: "",
    },
  ];

  async onchange(value: SettingDto) {
    await applicationFacade.settings.save(value);
    this.table.refresh();
  }

  async itemsProvider(ctx: any, callback: any) {
    this.loading = true;
    try {
      return await applicationFacade.settings.getAll();
    } catch (e) {
      this.loading = false;
      return [];
    }
  }

  async remove(id: number) {
    const result = await confirmRemove(
      "Внимание",
      "Вы действительно хотите удалить данную настройку?"
    );
    if (!result) return;

    await applicationFacade.settings.delete(id);
    this.table.refresh();
  }

  public reload() {
    this.table.refresh();
  }
}
</script>