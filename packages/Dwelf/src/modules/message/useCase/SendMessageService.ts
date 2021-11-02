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
    private messageProvider: IMessageProvider
  ) {}

  public get key(): IQueues {
    return "sendMessages";
  }

  public async execute({ message, ...rest }: ISendMessageDTO) {
    await this.messageProvider.sendMessage({ body: message, ...rest });
  }
}

export { SendMessageService };
