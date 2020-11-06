import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule
} from "vuex-module-decorators";
import store from "@/store";
import applicationFacade from "@/api/applicationFacade";
import { CategorySchemaProjectTypeDto } from "@/api/clients";

export interface CategoryProjectTypeState {
    items: CategorySchemaProjectTypeDto[];
    schemas: number[];
}

@Module({ store, dynamic: true, name: "categoryProjectTypeModule" })
class CategoryProjectTypeModule extends VuexModule
    implements CategoryProjectTypeState {
    items: CategorySchemaProjectTypeDto[] = [];
    schemas: number[] = [];

    @Mutation
    setCategoryProjectTypes(items: CategorySchemaProjectTypeDto[]) {
        this.items = items;
    }

    public get getCategoryProjectTypes() {
        return this.items;
    }

    @Action({ rawError: true })
    public async load(schemaId: number) {
        if (this.schemas.find(x => x === schemaId) != undefined) return;
        this.schemas.push(schemaId);
        const result = await applicationFacade.categories.getProjectTypes(
            schemaId
        );

        this.setCategoryProjectTypes(result);
    }

    @Action({ rawError: true })
    public async update(schemaId: number) {
        if (this.schemas.length === 0) return;
        const result = await applicationFacade.categories.getProjectTypes(
            schemaId
        );

        this.setCategoryProjectTypes(result);
    }
}

export const categoryProjectTypeModule = getModule(CategoryProjectTypeModule);
