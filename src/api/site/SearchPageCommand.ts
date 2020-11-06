import { PageState } from "../clients";

export class SearchPageCommand {
    parentId: number | null | undefined;
    name: string | null | undefined;
    dateFrom: Date | null | undefined;
    dateTo: Date | null | undefined;
    states: PageState[] | null | undefined = [PageState.Published];
    pageNo: number | undefined;
    pageSize: number | undefined;
}
