import "reflect-metadata";
import "@shared/container";
import { container } from "tsyringe";
import { SendMessageService } from "./SendMessageService";
import { ISendMessageDTO } from "../DTOs/ISendMessageDTO";
import { buildMessage } from "@/shared/utils/testHelpers/fakes/message";
import MessageMock from "@/shared/utils/testHelpers/mocks/MessageMock";

jest.genMockFromModule("twilio");
jest.mock("twilio");

describe("[FUNC] Send message service", () => {
  it("should send message to recipient", async () => {
    const sendMessageService = container.resolve(SendMessageService);

    const { body, type } = buildMessage();

    const data: ISendMessageDTO = {
      message: body,
      to: "+5511958865461",
      type,
    };

    await sendMessageService.execute(data);

    expect(MessageMock.create).toHaveBeenCalledWith(
      expect.objectContaining({ body })
    );
  });
});
