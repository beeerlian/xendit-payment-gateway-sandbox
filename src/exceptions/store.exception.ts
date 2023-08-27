import { ErrName } from "./type.exception";
import Exception from "./exception";

export type StoreErrName = "FAILED_TO_FETCH" | ErrName;

export class StoreException extends Exception<StoreErrName> {}
