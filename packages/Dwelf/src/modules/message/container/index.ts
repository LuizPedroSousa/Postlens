import { container } from "tsyringe";
import { IMessageRepository } from "../infra/repositories/IMessageRepository";
import { MessageRepository } from "../infra/repositories/MessageRepository";
import { FindMessageService } from "../services/FindMessageService";

container.registerSingleton<IMessageRepository>(
  "MessageRepository",
  MessageRepository
);

container.registerSingleton<FindMessageService>(
  "FindMessageService",
  FindMessageService
);
