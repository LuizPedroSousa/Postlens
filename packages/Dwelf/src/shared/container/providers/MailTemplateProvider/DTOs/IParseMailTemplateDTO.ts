interface ITemplateVariables {
  [key: string]: string;
}

export interface IParseMailTemplateDTO {
  file: string;
  variables?: ITemplateVariables;
}
