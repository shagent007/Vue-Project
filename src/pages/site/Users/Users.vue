<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>
    <div class="row">
      <div class="col-md-9">
        <user-list ref="list" v-model="filterConfig" />
      </div>
      <div class="col-md-3">
        <user-filter v-model="filterConfig" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Ref } from "vue-property-decorator";
import { SearchUserCommand } from "@/api/site/SearchUserCommand.ts";
import { CreateUserCommand, CreateUserCommandResult } from "@/api/clients";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import { create } from "vue-modal-dialogs";

import PageTitle from "@/Layout/Components/PageTitle.vue";
import UserList from "@/pages/site/Users/UserList.vue";
import UserFilter from "@/pages/site/Users/UserFilter.vue";
import AddUserModal from "@/pages/site/Users/AddUserModal.vue";
import UserPasswordModal from "@/pages/site/Users/UserPasswordModal.vue";

const addUserModal = create<CreateUserCommand, CreateUserCommand>(
  AddUserModal,
  "model"
);

const userPasswordModal = create<string, CreateUserCommandResult, boolean>(
  UserPasswordModal,
  "title",
  "model"
);

@Component({
  components: {
    UserList,
    PageTitle,
    UserFilter,
  },
})
export default class Users extends Vue {
  @Ref("list") readonly list!: UserList;

  filterConfig = new SearchUserCommand();
  heading = "Пользователи";
  icon = "pe-7s-plane icon-gradient bg-tempting-azure";
  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  result: any = "";

  async onAdd() {
    this.result = await addUserModal(new CreateUserCommand());
    await userPasswordModal("Запомните свой пароль", this.result);
    this.list.reload();
  }

  created() {
    if (!this.$route.query.q) return;
    this.filterConfig = JSON.parse(String(this.$route.query.q));
  }

  @Watch("filterConfig", {
    deep: true,
  })
  async onfilterChange(value: any) {
    this.list.reload();
    if (JSON.stringify(value) === String(this.$route.query.q)) return;
    this.$router.push({
      name: "site-users",
      query: {
        q: JSON.stringify(value),
      },
    });
  }
}
</script>
