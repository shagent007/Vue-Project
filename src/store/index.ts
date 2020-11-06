import Vue from "vue";
import Vuex from "vuex";

import { UserState } from "./modules/user";
import { AppState } from "./modules/app";
import { ProjectTypeState } from "./modules/projectTypes";
import { CategoryProjectTypeState } from "./modules/categoryProjectTypes";
Vue.use(Vuex);

interface RootState {
    appState: AppState;
    userState: UserState;
    projectTypeState: ProjectTypeState;
    categoryProjectTypes: CategoryProjectTypeState;
}

export default new Vuex.Store<RootState>({
    // plugins: [createPersistedState({ storage: window.sessionStorage })] // !debug ? [createPersistedState({ storage: window.sessionStorage })] : [],
});
