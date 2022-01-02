import { inject, injectable } from "tsyringe";
import { IFindMessageDTO } from "../DTOs/IFindMessageDTO";
import { Message } from "../infra/entities/Message";
import { IMessageRepository } from "../infra/repositories/IMessageRepository";

@injectable()
class FindMessageService {
  constructor(
    @inject("MessageRepository")
    private messageRepository: IMessageRepository
  ) {}

  async execute({ message_id }: IFindMessageDTO): Promise<Message> {
    const messageAlreadyExists = await this.messageRepository.findById(
      message_id
    );

    if (!messageAlreadyExists) {
      throw new Error("Message not found");
    }

    return messageAlreadyExists;
  }
}

export { FindMessageService };
