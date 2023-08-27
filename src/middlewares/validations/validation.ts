import * as auth from "./auth.validation";
import * as store from "./store.validation";

import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ValidationException } from "../../exceptions";
import { ErrorResponse } from "../../shared";

export class Validation {
  constructor() {}

  public check(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ErrorResponse({
        req,
        res,
        error: new ValidationException({
          message: "Failed because error in validation",
          name: "VALIDATION_ERROR",
          status: 400,
          data: errors.array(),
        }),
      });
    }
    return next();
  }

  public auth() {
    return {
      login: [...auth.login, this.check],
      googleLogin: [...auth.googleLogin, this.check],
      facebookLogin: [...auth.facebookLogin, this.check],
      register: [...auth.register, this.check],
      changePassword: [...auth.changePassword, this.check],
      forgotPassword: [...auth.forgotPassword, this.check],
      resetPassword: [...auth.resetPassword, this.check],
      sendEmailVerification: [...auth.sendEmailVerification, this.check],
      verifyEmail: [...auth.verifyEmail, this.check],
    };
  }

  public store() {
    return {
      create: [...store.create, this.check],
      update: [...store.update, this.check],
    };
  }
}
