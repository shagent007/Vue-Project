<template>
  <b-card class="mt-2" title="Группы">
    <b-button @click="onAddGroup" class="mb-2 btn-shadow" variant="primary">Добавить</b-button>

    <b-table
      ref="table"
      class="align-middle mb-0"
      borderless
      striped
      hover
      primary-key="id"
      :items="itemsProvider"
      :fields="fields"
    >
      <template v-slot:table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{width: field.key === 'actions' ? '90px' : 'auto' }"
        />
      </template>

      <template v-slot:cell(actions)="data">
        <div style="text-align: center;">
          <button @click="remove(data.item)" class="border-0 btn-transition btn btn-outline-danger">
            <font-awesome-icon icon="trash-alt" />
          </button>
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ProjectTypeStateDto, PropertyGroupDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { create } from "vue-modal-dialogs";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import AddGroupModal from "@/pages/catalog/ProjectTypeEditor/AddGroupModal.vue";

const addGroupModal = create<PropertyGroupDto[] | undefined, boolean>(
  AddGroupModal,
  "value"
);

const confirmModal = create<string, string, boolean>(
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
export default class ProjectTypeGroups extends Vue {
  @Ref("table") readonly table!: BTable;
  @Prop({ required: true, type: Array })
  readonly value!: PropertyGroupDto[];
  fields = [
    {
      key: "code",
      label: "Код",
      sortable: true,
    },
    {
      key: "name",
      label: "Название",
      sortable: true,
    },

    {
      key: "actions",
      label: "",
    },
  ];

  async itemsProvider() {
    return this.value;
  }

  async onAddGroup() {
    await addGroupModal(this.value);
    this.table.refresh();
  }

  async remove(item: PropertyGroupDto) {
    const result = await confirmModal(
      "Внимание",
      "Вы действительно хотите удалить данную группу?"
    );
    if (!result) return;
    this.value.splice(this.value.indexOf(item), 1);

    this.table.refresh();
  }
}
</script>
