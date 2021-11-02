import "reflect-metadata";
import "dotenv/config";
import "@shared/container";
import { buildMessage } from "@/shared/utils/testHelpers/fakes/message";
import { connection } from "@/shared/utils/testHelpers/orm";
import { container } from "tsyringe";
import { MessageRepository } from "../infra/repositories/MessageRepository";
import { CreateMessageService } from "./CreateMessageService";

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

describe("[FUNC] Create message", () => {
  it("should be able to create a new message", async () => {
    const { user_id, ...message } = buildMessage();
    const createMessageService = container.resolve(CreateMessageService);
    const messageRepository = container.resolve(MessageRepository);

    await createMessageService.execute({
      message,
      user_id,
    });

    const messages = await messageRepository.find();

    expect(messages).toHaveLength(1);
    expect(messages).toEqual(
      expect.arrayContaining([expect.objectContaining({ user_id, ...message })])
    );
  });

  it("should gives an error when message with user_id already exists", async () => {
    const { user_id, ...message } = buildMessage();
    const createMessageService = container.resolve(CreateMessageService);
    const messageRepository = container.resolve(MessageRepository);

    await messageRepository.save({ user_id, ...message });

    try {
      await createMessageService.execute({
        message,
        user_id,
      });

      const messages = await messageRepository.find();

      expect(messages).toHaveLength(0);
    } catch (error: any) {
      expect(error.message).toBe("Esta mensagem já existe.");
    }
  });
});
