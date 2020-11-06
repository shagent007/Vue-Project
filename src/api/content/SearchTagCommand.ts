import { ContentTagState } from "../clients";

export class SearchTagCommand {
    name: string | null | undefined;
    dateFrom: Date | null | undefined;
    dateTo: Date | null | undefined;
    states: ContentTagState[] | null | undefined = [ContentTagState.Published];
    pageNo: number | undefined;
    pageSize: number | undefined;
}
