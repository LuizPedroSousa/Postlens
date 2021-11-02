import {
  MessageSchema,
  MessageType,
} from "@/modules/message/infra/entities/MessageSchema";
import faker from "faker";
import { v4 as uuid } from "uuid";

const buildMessage = (): MessageSchema => {
  const messageType: MessageType[] = ["whatsapp", "sms"];
  return new MessageSchema({
    user_id: uuid(),
    body: faker.random.words(),
    type: faker.random.arrayElement(messageType),
  });
};

export { buildMessage };
