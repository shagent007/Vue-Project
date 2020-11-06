<template>
  <div class="h-100 bg-plum-plate bg-animation">
    <div class="d-flex h-100 justify-content-center align-items-center">
      <b-col md="8" class="mx-auto app-login-box">
        <div class="modal-dialog w-100 mx-auto">
          <div class="modal-content">
            <div class="modal-body">
              <div class="h5 modal-title text-center">
                <h4 class="mt-2">
                  <div>HomePlans</div>
                </h4>
              </div>
              <b-form-group id="exampleInputGroup1" label-for="exampleInput1">
                <b-form-input
                  id="exampleInput1"
                  type="email"
                  v-model="email"
                  required
                  placeholder="Имя пользователя"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="exampleInputGroup2" label-for="exampleInput2">
                <b-form-input
                  v-model="password"
                  id="exampleInput2"
                  type="password"
                  required
                  placeholder="Пароль"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="modal-footer clearfix">
              <div class="float-right">
                <b-button variant="primary" size="lg" @click="login">Войти</b-button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center text-white opacity-8 mt-3">Copyright &copy; Homeplans.ru 2020</div>
      </b-col>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { userModule } from "@/store/modules/user";
import { LoginCommand } from "@/api/clients";

@Component
export default class Login extends Vue {
  private email = "admin@mail.com";
  private password = "123qwe";

  public async login() {
    await userModule.signIn(
      new LoginCommand({ email: this.email, password: this.password })
    );
    await this.$router.push("/");
  }
}
</script>
