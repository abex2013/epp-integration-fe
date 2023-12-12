import { Client } from "./client";
import { ResponseMessage } from "./response-message";

export interface AllDataResponse<T> {
  responseStatus:ResponseMessage,
  data: T
}
