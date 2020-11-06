<template>
  <div class="main-card mb-3 card">
    <VueElementLoading :active="loading" spinner="bar-fade-scale" color="var(--primary)" />
    <div class="card-body">
      <h5 class="card-title">Пользователи</h5>
      <b-button class="mr-2 mb-2 btn-shadow" variant="primary" @click="add">Добавить</b-button>
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
          <action-button
            :action="edit(data.item)"
            class="border-0 btn-transition btn-outline-success"
          >
            <font-awesome-icon icon="edit" />
          </action-button>
          <action-button
            :action="remove(data.item.id)"
            class="border-0 btn-transition btn btn-outline-danger"
          >
            <font-awesome-icon icon="trash-alt" />
          </action-button>
        </template>
      </b-table>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueElementLoading from "vue-element-loading";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Ref, Watch, Prop } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import { ArchitectStateDto } from "@/api/clients.ts";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { create } from "vue-modal-dialogs";

import AddUserModal from "@/pages/catalog/ArchitectEditor/AddUserModal.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import ActionButton from "@/pages/common/ActionButton.vue";

const confirmModal = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

const addUserModal = create<number[], number>(AddUserModal, "exludedId");

library.add(faEdit);
@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
    VueElementLoading,
    ActionButton,
  },
})
export default class AnalogProjectsList extends Vue {
  @Ref("table") readonly table!: BTable;
  @Prop({ type: Object }) value!: {
    id: number;
    users: number[];
  };

  loading = false;
  showModal = false;
  isBusy = false;

  get users() {
    return this.value.users ?? [];
  }

  async remove(id: number) {
    const result = await confirmModal(
      "Внимание",
      "Вы действительно хотите удалить данного пользователя?"
    );
    if (!result) return;

    this.value.users.splice(this.value.users.indexOf(id), 1);
    this.table.refresh();
  }

  async itemsProvider(ctx: any, callback: any) {
    try {
      this.loading = true;
      if (!this.value) return [];

      return await applicationFacade.architects.getUsers(this.value.id);
    } catch (e) {
      return [];
    } finally {
      this.loading = false;
    }
  }

  fields = [
    {
      key: "userName",
      label: "Имя пользователя",
      sortable: true,
    },
    {
      key: "email",
      label: "Почта",
      sortable: true,
    },
    {
      key: "phoneNumber",
      label: "Номер телефона",
      sortable: true,
    },
    {
      key: "actions",
      label: "",
    },
  ];

  created() {
    this.value.users = this.value.users ?? [];
  }

  async add() {
    const result = await addUserModal(this.users);
    if (result != null) {
      this.value.users?.push(result);
    }

    this.table.refresh();
  }

  @Watch("value")
  onValueChange() {
    this.table.refresh();
  }

  public reload() {
    this.table.refresh();
  }
}
</script>
