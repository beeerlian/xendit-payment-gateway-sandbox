import express, { Router } from "express";
import { AuthController } from "../controllers";
import { AuthenticationMd, Validation } from "../middlewares";
import { Idb, Mailer, Passport } from "../shared";

const router: Router = express.Router();
const db: Idb = new Idb();
const mailer: Mailer = new Mailer();
const controller: AuthController = new AuthController(db, mailer);
const validation = new Validation().auth();
const authentication = new AuthenticationMd({
  passport: new Passport({ idb: db }),
});

router.post("/login", validation.login, controller.login);
router.post("/login/google", validation.googleLogin, controller.loginGoogle);
router.post(
  "/login/facebook",
  validation.facebookLogin,
  controller.loginFacebook
);
router.post("/register", validation.register, controller.register);

router.post(
  "/sendEmailVerification",
  validation.sendEmailVerification,
  controller.sendEmailVerification
);

router.post("/verifyEmail", validation.verifyEmail, controller.verifyEmail);

router.post(
  "/forgotPassword",
  validation.forgotPassword,
  controller.forgotPassword
);
router.post(
  "/resetPassword",
  validation.resetPassword,
  controller.resetPassword
);

router.post(
  "/changePassword",
  authentication.execute,
  validation.changePassword,
  controller.changePassword
);

export const authRouter: Router = router;
