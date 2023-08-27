import { MailerEmailBody } from "../../shared";

export function emailVerification({
  to,
  code,
}: {
  to: string;
  code: string;
}): MailerEmailBody {
  return {
    from: process.env.MAIL_USERNAME!,
    to,
    subject: "Forgot Password",
    text:
      "Click this link to verify your account  " +
      `${process.env.BASEURL}/verifyEmail?code=${code}`,
  };
}
