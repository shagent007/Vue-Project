import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule
} from "vuex-module-decorators";

import store from "@/store";
import sessionManager from "@/common/session-manager";
import applicationFacade from "@/api/applicationFacade";
import { LoginCommand } from "@/api/clients";

export interface UserState {
    token: string | undefined;
    role: string[] | undefined;
    userName: string | undefined;
    signedIn: boolean;
    processing: boolean;
}

@Module({ store, dynamic: true, name: "userModule" })
class UserModule extends VuexModule implements UserState {
    token: string | undefined = "";
    role: string[] | undefined = [];
    userName: string | undefined = "";
    signedIn = false;
    processing = false;

    get isSignedIn(): boolean {
        return !!this.token;
    }

    @Mutation
    private doProcessing() {
        this.processing = !this.processing;
    }

    @Mutation
    private setToken(token: string | undefined) {
        this.token = token;
    }

    @Mutation
    private setRole(role: string[] | undefined) {
        this.role = role;
    }

    @Mutation
    private setName(userName: string | undefined) {
        this.userName = userName;
    }

    @Action({ rawError: true })
    public init() {
        if (this.token) return;

        const data = sessionManager.getToken();

        if (!data) return;

        this.setToken(data.token);
        this.setRole(data.roles);
        this.setName(data.userName);
    }

    @Action({ rawError: true })
    public async signIn(userInfo: LoginCommand) {
        const data = await applicationFacade.account.login(userInfo);

        sessionManager.setToken(data);

        this.setToken(data.token);
        this.setRole(data.roles);
        this.setName(data.userName);
    }

    @Action({ rawError: true })
    logout() {
        sessionManager.cleanSession();
        this.setToken("");
        this.setRole(new Array<string>());
        this.setName("");
    }
}

export const userModule = getModule(UserModule);
