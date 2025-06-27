import { ISendMailDTO } from "../DTOs/ISendMailDTO";
import { IMailProvider } from "../models/IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import { mailConfig } from "@/config/mail";
import { inject, injectable } from "tsyringe";
import { IMailTemplateProvider } from "../../MailTemplateProvider/models/IMailTemplateProvider";
import logger from "@/shared/utils/logger";

@injectable()
export class MailHogMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private readonly mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport(mailConfig.credentials.mailhog);
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
