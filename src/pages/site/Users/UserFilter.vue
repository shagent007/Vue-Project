<template>
  <div class="main-card position-relative row form-group pb-3 card">
    <div class="col-sm-12">
      <label>Имя пользователя</label>
      <b-form-input v-model="value.userName" class="form-control"></b-form-input>
    </div>

    <div class="col-sm-12">
      <label>Номер телефона</label>
      <b-form-input type="number" v-model.number="value.phoneNumber" class="form-control"></b-form-input>
    </div>

    <div class="col-sm-12">
      <label>Почта</label>
      <b-form-input v-model="value.email" class="form-control"></b-form-input>
    </div>

    <div class="col-sm-12">
      <label>Роли</label>
      <role-select-picker v-model="value.roles" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { SearchUserCommand } from "@/api/site/SearchUserCommand.ts";

import RoleSelectPicker from "@/pages/site/common/RoleSelectPicker.vue";

@Component({
  components: {
    RoleSelectPicker,
  },
})
export default class PageFilter extends Vue {
  @Prop({ type: Object }) value!: SearchUserCommand;
}
</script>

