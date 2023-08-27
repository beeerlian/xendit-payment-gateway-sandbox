// src/types/express/index.d.ts
import { UserJWTPayload } from "../../shared";
// to make the file a module and avoid the TypeScript error
export {};

declare module "@types/express-serve-static-core" {
  interface Request {
    user?: UserJWTPayload;
  }
}
