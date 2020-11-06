export class SearchUserCommand {
    phoneNumber: string | null | undefined;
    email: string | null | undefined;
    userName: string | null | undefined;
    roles: string[] | null | undefined = [];
    pageNo: number | undefined;
    pageSize: number | undefined;
}
