import { NextFunction, Request, Response } from "express";
import { AuthException } from "../../exceptions";
import { Passport, UserJWTPayload } from "../../shared/helpers";

export class AuthenticationMd {
  public passport: Passport;
  constructor({ passport }: { passport: Passport }) {
    this.passport = passport;
  }

  public execute = async (req: Request, res: Response, next: NextFunction) => {
    this.passport.instance.authenticate(
      "jwt",
      { session: false },
      (err: Error, user: UserJWTPayload, info: Error) => {
        try {
          if (info) {
            throw info;
          } else if (err) {
            throw err;
          } else {
            req.user = user;
            return next();
          }
        } catch (error) {
          console.log("/authentication/jwt - ", error);
          if (error instanceof AuthException) {
            return res.status(error.status).send({
              success: false,
              message: error.message,
              error,
            });
          } else {
            return res.status(500).send({
              success: false,
              message: "Authentication failed",
              error,
            });
          }
        }
      }
    )(req, res);
  };
}
