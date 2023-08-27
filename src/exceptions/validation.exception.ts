import Exception from "./exception";
import { ErrName } from "./type.exception";

export type ValidationErrName = "VALIDATION_ERROR" | ErrName;

export class ValidationException extends Exception<ValidationErrName> {}
