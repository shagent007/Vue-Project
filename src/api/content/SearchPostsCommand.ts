import { ContentPostState } from "../clients";

export class SearchPostsCommand {
    categoryId: number | null | undefined;
    name: string | null | undefined;
    tag: string | null | undefined;
    dateFrom: Date | null | undefined;
    dateTo: Date | null | undefined;
    states: ContentPostState[] | null | undefined = [
        ContentPostState.Published
    ];
    pageNo: number | undefined;
    pageSize: number | undefined;
}
