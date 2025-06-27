import { IParseMailTemplateDTO } from "../DTOs/IParseMailTemplateDTO";
import { IMailTemplateProvider } from "../models/IMailTemplateProvider";
import handlebars from "handlebars";
import fs from "fs";
import { injectable } from "tsyringe";

@injectable()
export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const template = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });

    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
