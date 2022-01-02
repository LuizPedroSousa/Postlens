import { IParseMailTemplateDTO } from "../DTOs/IParseMailTemplateDTO";

export interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
