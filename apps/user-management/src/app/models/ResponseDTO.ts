enum ResponseStatus
{
    error,
    success,
    warning,
    info
}

export interface ResponseDTO<T>
{
    ResponseStatus: ResponseStatus;
    Message: string;
    Exception: any;
    Data: T;
}