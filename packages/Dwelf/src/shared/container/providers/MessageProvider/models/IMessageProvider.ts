import { ISendMessageDTO } from "../DTOs/ISendMessageDTO";

export interface IMessageProvider {
  sendMessage(data: ISendMessageDTO): Promise<void>;
  getClient(): any;
}
