import { IMailProvider } from "@/shared/container/providers/MailProvider/models/IMailProvider";
import { IParseMailTemplateDTO } from "@/shared/container/providers/MailTemplateProvider/DTOs/IParseMailTemplateDTO";
import { IMessageProvider } from "@/shared/container/providers/MessageProvider/models/IMessageProvider";
import {
  IJobProvider,
  IQueues,
} from "@/shared/container/providers/QueueProvider/models/IQueueProvider";
import { inject, injectable } from "tsyringe";
import { ISendMessageDTO } from "../DTOs/ISendMessageDTO";

@injectable()
class SendMessageService implements IJobProvider {
  constructor(
    @inject("MessageProvider")
    private readonly messageProvider: IMessageProvider,

    @inject("MailProvider")
    private readonly mailProvider: IMailProvider
  ) {}

  public get key(): IQueues {
    return "sendMessages";
  }

  public async execute({
    message,
    type,
    to,
    subject,
    templateData,
  }: ISendMessageDTO) {
    if (type === "email") {
      await this.mailProvider.sendMail({
        to,
        templateData: templateData as IParseMailTemplateDTO,
        subject: subject as string,
      });

      return;
    }

    await this.messageProvider.sendMessage({
      body: message,
      to: to.address,
      type,
    });
  }
}

export { SendMessageService };
