import { body, query } from "express-validator";

export type SocialLoginProvider = "GOOGLE" | "FACEBOOK";

export const login = [
  body("email").isEmail().withMessage("Email format is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
];
export const googleLogin = [
  body("email").isEmail().withMessage("Email format is invalid"),
  body("name").notEmpty().withMessage("Name is required"),
  body("image").optional().isString().withMessage("Avatar format is invalid"),
  body("social_provider")
    .equals("GOOGLE")
    .withMessage('Acceptable value is "GOOGLE"'),
  body("social_credential")
    .notEmpty()
    .withMessage("social_credential is required"),
];
export const facebookLogin = [
  body("email").isEmail().withMessage("Email format is invalid"),
  body("name").notEmpty().withMessage("Name is required"),
  body("avatar").optional().isString().withMessage("Avatar format is invalid"),
  body("social_provider")
    .equals("FACEBOOK")
    .withMessage('Acceptable value is "FACEBOOK"'),
  body("social_credential")
    .notEmpty()
    .withMessage(
      'Acceptable value is "FACEBOOK" credential from oauth callback '
    ),
];

export const register = [
  body("name").isLength({ min: 1 }).withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 7 })
    .withMessage("Password must be 8 character or more"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("confirm password must same with new password"),
];

export const changePassword = [
  body("currentPassword")
    .isLength({ min: 7 })
    .withMessage("Password must be 8 character or more"),
  body("newPassword")
    .isLength({ min: 7 })
    .withMessage("New password must be 8 character or more")
    .custom((value, { req }) => {
      return value !== req.body.currentPassword;
    })
    .withMessage("new password must bew different"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.newPassword;
    })
    .withMessage("confirm password must same with new password"),
];

export const forgotPassword = [
  body("email").isEmail().withMessage("Email format not valid"),
];

export const sendEmailVerification = [
  body("email").isEmail().withMessage("Email format not valid"),
];
export const verifyEmail = [
  query("code")
    .notEmpty()
    .withMessage("Email verification code must not be empty"),
  // body("email").isEmail().withMessage("Email format not valid"),
];
export const resetPassword = [
  body("code")
    .notEmpty()
    .withMessage("Email verification code must not be empty"),
  body("newPassword")
    .isLength({ min: 7 })
    .withMessage("Password must be 8 character or more"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.newPassword;
    })
    .withMessage("confirm password must same with new password"),
];
