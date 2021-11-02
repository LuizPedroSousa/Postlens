import "reflect-metadata";
import "dotenv/config";
import "@shared/container";
import { ContactRepository } from "@/modules/contact/infra/repositories/ContactRepository";
import { connection } from "@/shared/utils/testHelpers/orm";
import { container } from "tsyringe";
import { MessageSchema } from "../infra/entities/MessageSchema";
import { MessageRepository } from "../infra/repositories/MessageRepository";
import { AddQueueMessageService } from "./AddQueueMessageService";

import mockedQueue from "@utils/testHelpers/mocks/QueueMock";
import { buildContactData } from "@/shared/utils/testHelpers/fakes/contact";
import { replaceMessage } from "@/shared/utils/replaceMessage";

jest.genMockFromModule("bull");
jest.mock("bull");

beforeAll(async () => {
  await connection.create();
});

beforeEach(async () => {
  await connection.clean();
});

afterAll(async () => {
  await connection.close();
});

jest.setTimeout(10000);
describe("[FUNC] Add Queue Message Service", () => {
  it("Should send a template message to all contacts", async () => {
    const messageRepository = new MessageRepository();
    const contactRepository = new ContactRepository();

    const addQueueMessageService = container.resolve(AddQueueMessageService);

    const contacts = [
      buildContactData(),
      buildContactData(),
      buildContactData(),
    ];

    await contactRepository.saveMany(contacts);

    const message = new MessageSchema({
      user_id: "1234",
      body: "Olá {name}!, seja bem vindo a plataforma.",
      type: "whatsapp",
    });

    await messageRepository.save(message);

    const messageAdded = await addQueueMessageService.execute({
      contacts,
      message_id: message.id as any,
    });

    expect(messageAdded).toEqual(
      expect.objectContaining({
        user_id: "1234",
        body: "Olá {name}!, seja bem vindo a plataforma.",
        type: "whatsapp",
      })
    );

    expect(mockedQueue.add).toHaveBeenCalledWith("sendMessages", {
      to: contacts[0].cellphone,
      message: replaceMessage(message.body, contacts[0]),
      type: message.type,
    });

    expect(mockedQueue.add).toHaveBeenCalledWith("sendMessages", {
      to: contacts[1].cellphone,
      message: replaceMessage(message.body, contacts[1]),
      type: message.type,
    });
    expect(mockedQueue.add).toHaveBeenCalledWith("sendMessages", {
      to: contacts[2].cellphone,
      message: replaceMessage(message.body, contacts[2]),
      type: message.type,
    });
  });
});
