import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule
} from "vuex-module-decorators";
import store from "@/store";
import { ProjectTypeDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
export interface ProjectTypeState {
    projectTypes: ProjectTypeDto[];
}

@Module({ store, dynamic: true, name: "projectTypeModule" })
class ProjectTypeModule extends VuexModule implements ProjectTypeState {
    projectTypes: Array<ProjectTypeDto> = new Array<ProjectTypeDto>();

    public get getProjectTypes() {
        return this.projectTypes;
    }

    @Mutation
    private setProjectTypes(items: Array<ProjectTypeDto>) {
        this.projectTypes = items;
    }

    @Action({ rawError: true })
    public async getAllProjectTypes() {
        const result = await applicationFacade.projectTypes.getAll();
        this.setProjectTypes(result);
    }
}

export const projectTypeModule = getModule(ProjectTypeModule);
