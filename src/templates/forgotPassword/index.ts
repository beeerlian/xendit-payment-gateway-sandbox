import { MailerEmailBody } from "../../shared";

export function forgotPassword({
  to,
  code,
}: {
  to: string;
  code: string;
}): MailerEmailBody {
  return {
    from: process.env.MAIL_USERNAME!,
    to,
    subject: "Hairnerd Forgot Password",
    text: "Your reset password code is " + code,
  };
}
