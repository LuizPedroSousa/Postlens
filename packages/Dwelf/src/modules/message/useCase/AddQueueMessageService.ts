import { IQueueProvider } from "@/shared/container/providers/QueueProvider/models/IQueueProvider";
import { replaceMessage } from "@/shared/utils/replaceMessage";
import { inject, injectable } from "tsyringe";
import { IAddQueueMessageDTO } from "../DTOs/IAddQueueMessageDTO";
import { ISendMessageDTO } from "../DTOs/ISendMessageDTO";
import { MessageSchema } from "../infra/entities/MessageSchema";
import { FindMessageService } from "./FindMessageService";

@injectable()
class AddQueueMessageService {
  constructor(
    @inject("FindMessageService")
    private findMessageService: FindMessageService,

    @inject("QueueProvider")
    private queueProvider: IQueueProvider
  ) {}

  public async execute({
    message_id,
    contacts,
  }: IAddQueueMessageDTO): Promise<MessageSchema> {
    const message = await this.findMessageService.execute({
      message_id,
    });

    await Promise.all(
      contacts.map((contact) => {
        return this.queueProvider.addJob<ISendMessageDTO>("sendMessages", {
          to: contact.cellphone,
          type: message.type,
          message: replaceMessage(message.body, contact),
        });
      })
    );

    return message;
  }
}

export { AddQueueMessageService };
