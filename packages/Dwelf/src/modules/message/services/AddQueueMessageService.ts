import { IQueueProvider } from "@/shared/container/providers/QueueProvider/models/IQueueProvider";
import { IStorageProvider } from "@/shared/container/providers/StorageProvider/models/IStorageProvider";
import { replaceMessage } from "@/shared/utils/replaceMessage";
import { inject, injectable } from "tsyringe";
import { IAddQueueMessageDTO } from "../DTOs/IAddQueueMessageDTO";
import { ISendMessageDTO } from "../DTOs/ISendMessageDTO";
import { Message } from "../infra/entities/Message";
import { FindMessageService } from "./FindMessageService";

@injectable()
class AddQueueMessageService {
  constructor(
    @inject("FindMessageService")
    private readonly findMessageService: FindMessageService,

    @inject("QueueProvider")
    private readonly queueProvider: IQueueProvider,

    @inject("StorageProvider")
    private readonly storageProvider: IStorageProvider
  ) {}

  public async execute({
    message_id,
    contacts,
  }: IAddQueueMessageDTO): Promise<Message> {
    const message = await this.findMessageService.execute({
      message_id,
    });

    let file: any;

    if (message.templateFile) {
      file = await this.storageProvider.getFile(message.templateFile.filename);
    }

    await Promise.all(
      contacts.map((contact) => {
        return this.queueProvider.addJob<ISendMessageDTO>("sendMessages", {
          to: {
            name: contact.name,
            address: contact.cellphone,
          },
          subject: message.subject,
          type: message.type,
          templateData: {
            file,
          },
          message: replaceMessage(message.body, contact),
        });
      })
    );

    return message;
  }
}

export { AddQueueMessageService };
