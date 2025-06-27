import { inject, injectable } from "tsyringe";
import { ICreateMessageDTO } from "../DTOs/ICreateMessageDTO";
import { Message } from "../infra/entities/Message";
import { IMessageRepository } from "../infra/repositories/IMessageRepository";

@injectable()
class CreateMessageService {
  constructor(
    @inject("MessageRepository")
    private messageRepository: IMessageRepository
  ) {}

  async execute(data: ICreateMessageDTO): Promise<Message> {
    const messageAlreadyExists = await this.messageRepository.findOne({
      user_id: data.user_id,
    });

    if (messageAlreadyExists) {
      throw new Error("Esta mensagem já existe.");
    }

    const message = new Message({
      ...data.message,
      user_id: data.user_id,
    });

    await this.messageRepository.save(message);

    return message;
  }
}

export { CreateMessageService };
