import { APIResponse } from "@ff/interfaces";

export const ErrorHandler = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send(new APIResponse({
    status: 'error', 
    data: null,
  }));
}