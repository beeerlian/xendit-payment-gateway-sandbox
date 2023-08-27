import { MailerEmailBody } from "../shared";
import { emailVerification } from "./emailVerification";
import { forgotPassword } from "./forgotPassword";

export type TemplateRepositoryEmail = {
  forgotPassword: (param: any) => MailerEmailBody;
  emailVerification: (param: any) => MailerEmailBody;
};

export class TemplateRepository {
  constructor() {}
  /**
   * get email
   */
  public get email(): TemplateRepositoryEmail {
    return {
      forgotPassword: forgotPassword,
      emailVerification: emailVerification,
    };
  }
}
