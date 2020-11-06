import {
    VuexModule,
    Module,
    getModule
} from "vuex-module-decorators";
import store from "@/store";

export interface AppState {
}

@Module({ store, dynamic: true, name: "appModule" })
class AppModule extends VuexModule implements AppState {
    
}

export const appModule = getModule(AppModule);