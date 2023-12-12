export interface SignInResponse {
    Guid: string;
    FirstName: string | undefined;
    LastName: string| undefined;
    Email: string| undefined;
    Token: string| undefined;
}