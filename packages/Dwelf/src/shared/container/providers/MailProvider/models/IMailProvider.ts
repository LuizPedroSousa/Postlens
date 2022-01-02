import { ISendMailDTO } from "../DTOs/ISendMailDTO";

export interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
