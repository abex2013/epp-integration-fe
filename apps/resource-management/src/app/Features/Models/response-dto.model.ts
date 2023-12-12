export interface ResponseDto<T> {
  responseStatus: string;
  message: string;
  data: T;
}

enum ResponseStatus {
  error,
  success,
  warning,
  info,
}

export interface ResponseDTO<T> {
  ResponseStatus: ResponseStatus;
  Message: string;
  Exception: any;
  Data: T;
}
