import Vue from "vue";
//import vuetify from "./plugins/vuetify";
import router from "./router";

import BootstrapVue from "bootstrap-vue";
import * as ModalDialogs from 'vue-modal-dialogs'

import App from "./App.vue";

import Default from "./Layout/Wrappers/baseLayout.vue";
import Login from "./Layout/Wrappers/loginLayout.vue";
import Apps from "./Layout/Wrappers/appLayout.vue";

import "vue-select/dist/vue-select.css";

Vue.config.productionTip = false;

Vue.use(ModalDialogs);
Vue.use(BootstrapVue);
Vue.component("default-layout", Default);
Vue.component("login-layout", Login);
Vue.component("apps-layout", Apps);

new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App }
});
