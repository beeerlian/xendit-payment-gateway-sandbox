import nodemailer, { Transporter } from "nodemailer";

export type MailerEmailBody = {
  from: string;
  to: string;
  subject?: string; // Subject line
  text?: string; // plain text body
  html?: string; //
};

export class Mailer {
  public transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 1234,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  public sendEmail = (data: MailerEmailBody) => {
    return this.transporter.sendMail(data);
  };
}
