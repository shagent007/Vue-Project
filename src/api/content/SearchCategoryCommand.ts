import { ContentCategoryState } from "../clients";

export class SearchCategoryCommand {
    parentId: number | null | undefined;
    name: string | null | undefined;
    dateFrom: Date | null | undefined;
    dateTo: Date | null | undefined;
    states: ContentCategoryState[] | null | undefined = [
        ContentCategoryState.Published
    ];
    pageNo: number | undefined;
    pageSize: number | undefined;
}
