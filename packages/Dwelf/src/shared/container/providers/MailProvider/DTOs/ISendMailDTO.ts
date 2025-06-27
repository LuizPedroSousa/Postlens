import { IParseMailTemplateDTO } from "../../MailTemplateProvider/DTOs/IParseMailTemplateDTO";

type Recipient = {
  name: string;
  address: string;
};

export interface ISendMailDTO {
  to: Recipient;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
