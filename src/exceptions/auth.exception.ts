import Exception from "./exception";
import { ErrName } from "./type.exception";

export type AuthErrName =
  | "INVALID_CREDENTIAL"
  | "EMAIL_ALREADY_IN_USE"
  | "WRONG_PASSWORD"
  | "EMAIL_NOT_FOUND"
  | "UNAUTHORIZED"
  | "TOKEN_EXPIRED"
  | "SOCIAL_AUTH_FAILED"
  | "FAILED_TO_SEND_EMAIL"
  | "CODE_NOT_AVAILABLE"
  | "EMAIL_ALREADY_VERIFIED"
  | "USER_NOT_FOUND"
  | "EMAIL_NOT_VERIFIED"
  | ErrName;

export class AuthException extends Exception<AuthErrName> {}
