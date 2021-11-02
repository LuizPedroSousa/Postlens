import { container } from "tsyringe";
import { IMessageRepository } from "../infra/repositories/IMessageRepository";
import { MessageRepository } from "../infra/repositories/MessageRepository";

container.registerSingleton<IMessageRepository>(
  "MessageRepository",
  MessageRepository
);
