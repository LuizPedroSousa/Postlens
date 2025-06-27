import { mailConfig } from "@/config/mail";
import nodemailer, { Transporter } from "nodemailer";
import { inject, injectable } from "tsyringe";
import { ISendMailDTO } from "../DTOs/ISendMailDTO";
import { IMailProvider } from "../models/IMailProvider";
import aws from "aws-sdk";
import { IMailTemplateProvider } from "../../MailTemplateProvider/models/IMailTemplateProvider";
import logger from "@/shared/utils/logger";

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private readonly mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        region: "us-east-1",
        credentials: mailConfig.credentials.ses,
      }),
    });
  }

  async sendMail(data: ISendMailDTO): Promise<void> {
    const { from } = mailConfig.defaults;

    const message = await this.client.sendMail({
      from,
      to: data.to,
      subject: data.subject,
      html: await this.mailTemplateProvider.parse(data.templateData),
    });

    logger.success("Message sent: %s", message.messageId);
  }
}
