import { Message, MessageType } from "@/modules/message/infra/entities/Message";
import faker from "faker";
import { v4 as uuid } from "uuid";

const buildMessage = (): Message => {
  const messageType: MessageType[] = ["whatsapp", "sms"];
  return new Message({
    user_id: uuid(),
    body: faker.random.words(),
    type: faker.random.arrayElement(messageType),
  });
};

export { buildMessage };
