<template>
  <div>
    <page-title :heading="heading" :subheading="subheading" :icon="icon" :actions="actions"></page-title>
    <div class="row">
      <div class="col-md-12">
        <general v-model="model" />
        <information v-model="model" />
        <b-card class="mt-3" title="Роли">
          <role-select-picker v-model="roles" />
        </b-card>
      </div>
    </div>

    <show-password-modal
      :visible="showEditor"
      @hidden="showEditor = false"
      password="Новый пароль"
      @confirm="showEditor = false"
      title="Запомните свой новый пароль"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { debounce } from "lodash";
import { Prop, Watch, Ref } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { UserStateDto, CategoryDto } from "@/api/clients";
import { create } from "vue-modal-dialogs";

import General from "@/pages/site/UserEditor/General.vue";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import Information from "@/pages/site/UserEditor/Information.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import RoleSelectPicker from "@/pages/site/common/RoleSelectPicker.vue";
import ShowPasswordModal from "@/pages/site/common/ShowPasswordModal.vue";

const confirmRemove = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

const confirmCancel = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

@Component({
  components: {
    Information,
    General,
    PageTitle,
    RoleSelectPicker,
    ShowPasswordModal,
  },
})
export default class UserEditor extends Vue {
  @Prop({ required: true, type: Number }) readonly id!: number;
  get heading() {
    return this.model.userName ?? "";
  }

  get subheading() {
    return "";
  }

  get roles() {
    return this.model.roles ?? [];
  }

  set roles(value: Array<string>) {
    this.model.roles = value;
  }

  errors: { [name: string]: string } = {};
  icon = "pe-7s-plane icon-gradient bg-tempting-azure";
  showEditor = false;
  model: UserStateDto = new UserStateDto();
  userBlockButtonText = "Заблокировать";

  get actions() {
    return [
      {
        text: "Сбросить пароль",
        class: "btn-success",
        action: this.resetPassword,
      },
      {
        text: this.userBlockButtonText,
        class: "btn-warning",
        action: this.block,
      },
      {
        text: "Удалить",
        class: "btn-danger",
        action: this.remove,
      },
    ];
  }

  async remove() {
    const result = await confirmRemove(
      "Внимание",
      "Вы действительно хотите удалить данного пользователя?"
    );
    if (!result) return;

    try {
      await applicationFacade.users.delete(Number(this.model.id));
    } catch (ex) {
      console.log(ex);
    }
  }

  save_debounce: any = debounce(
    (model: UserStateDto) => applicationFacade.users.save(model),
    2000,
    { maxWait: 5000 }
  );

  get valid(): boolean {
    return true;
  }

  async created() {
    this.model = await applicationFacade.users.getById(Number(this.id));
  }

  async block() {
    const result = await confirmCancel(
      "Внимание",
      "Вы действительно хотите заблокировать данного пользователя?"
    );
    if (!result) return;

    await applicationFacade.users.block(Number(this.id), true);
    this.userBlockButtonText = "Разблокировать";
  }

  @Watch("model", {
    deep: true,
  })
  save(value: UserStateDto, oldValue: UserStateDto) {
    if (oldValue && oldValue.id) {
      this.save_debounce(value);
    }
  }

  async resetPassword() {
    this.showEditor = true;
  }
}
</script>
