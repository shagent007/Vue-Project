import { ProjectState } from "../clients";

export class SearchProjectsCommand {
    projectTypeId: number = 0;
    architectId: number | null | undefined;
    sku: string | null | undefined;
    from: Date | null | undefined;
    to: Date | null | undefined;
    state: ProjectState[] | null | undefined = [ProjectState.Published];
    collections: number[] | null | undefined = new Array<number>();
    order: string | null | undefined;
    specification: string | null | undefined;
    pageNo: number | undefined = 1;
    pageSize: number | undefined = 30;
}
