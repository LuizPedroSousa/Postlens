import "reflect-metadata";
import "dotenv/config";
import "@shared/container";
import { connection } from "@/shared/utils/testHelpers/orm";
import { container } from "tsyringe";
import { MessageRepository } from "../infra/repositories/MessageRepository";
import { FindMessageService } from "./FindMessageService";
import { ObjectID } from "mongodb";
import { buildMessage } from "@/shared/utils/testHelpers/fakes/message";

beforeAll(async () => {
  await connection.create();
});

beforeEach(async () => {
  const messageRepository = container.resolve(MessageRepository);
  await messageRepository.delete();
});

afterAll(async () => {
  await connection.close();
});

describe("[FUNC] Find Message", () => {
  it("should be able to find message by id", async () => {
    const data = buildMessage();

    const messageRepository = container.resolve(MessageRepository);
    const findMessageService = container.resolve(FindMessageService);

    await messageRepository.save(data);

    const message = await findMessageService.execute({
      message_id: data.id as any,
    });

    expect(message).toEqual(data);
  });

  it("should gives an error when message does't exists", async () => {
    const findMessageService = container.resolve(FindMessageService);

    try {
      const message = await findMessageService.execute({
        message_id: ObjectID(),
      });

      expect(message).toBeNull();
    } catch (error: any) {
      expect(error.message).toBe("Message not found");
    }
  });
});
