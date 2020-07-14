import { Request } from 'express';
// definitions
export interface RequestInput {
  [key: string]: any;
}
export interface RequestBody {
  type: string;
  input: RequestInput;
}
export interface RequestWithBody extends Request {
  body: RequestBody;
}
export type ServiceResponseOutput = null | RequestInput;
export interface ServiceResponse {
  success: boolean;
  message: string;
  output: ServiceResponseOutput;
}
export interface ServiceResponseWithEvents extends ServiceResponse {
  events: { id: string; message: string; output: ServiceResponseOutput }[];
}

export const Err: ServiceResponseWithEvents = Object.freeze({
  success: false,
  message: 'Error',
  output: null,
  events: [],
});

export type ServerFunction = (
  input: RequestInput
) => Promise<ServiceResponseWithEvents>;
