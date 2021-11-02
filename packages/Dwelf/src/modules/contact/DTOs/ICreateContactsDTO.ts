import ContactSchema from "../infra/entities/ContactSchema";

export interface ICreateContactsDTO {
  contacts: ContactSchema[];
}
