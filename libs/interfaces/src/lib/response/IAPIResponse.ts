import { Status } from "../generic/status";

export interface IAPIResponse<T> {
  data: T,
  status: Status,
}