import { accountSid, authToken, phone, whatsappPhone } from "@/config/twilio";
import { Twilio } from "twilio";
import { ISendMessageDTO } from "../DTOs/ISendMessageDTO";
import { IMessageProvider } from "../models/IMessageProvider";

class TwilioProvider implements IMessageProvider {
  private client: Twilio;
  constructor() {
    this.client = new Twilio(accountSid, authToken);
  }

  public async sendMessage({ body, to, type }: ISendMessageDTO): Promise<void> {
    await this.client.messages.create({
      to: type === "whatsapp" ? `${type}:${to}` : to,
      from: type === "whatsapp" ? `${type}:${whatsappPhone}` : phone,
      body,
      forceDelivery: true,
    });
  }
}

export { TwilioProvider };
