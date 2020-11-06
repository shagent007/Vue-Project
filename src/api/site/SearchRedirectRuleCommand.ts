export class SearchRedirectRuleCommand {
    oldSlug: string | null | undefined;
    newSlug: string | null | undefined;
    pageNo: number | undefined = 1;
    pageSize: number | undefined = 30;
}
