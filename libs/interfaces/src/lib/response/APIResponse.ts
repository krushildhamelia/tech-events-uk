import { IAPIResponse } from "./IAPIResponse";
import { Status } from '../generic/status';

export class APIResponse<T> implements IAPIResponse<T> {
  data!: T;
  status!: Status;
  
  constructor(response: IAPIResponse<T>) {
    Object.assign(this, response);  
  }
}