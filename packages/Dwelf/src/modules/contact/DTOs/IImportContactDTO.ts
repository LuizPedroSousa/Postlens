import { Contact } from "../infra/entities/Contact";
import { Readable } from "stream";

export type IContact = Omit<Contact, "id" | "created_at" | "updated_at">;

export interface IImportContactsDTO {
  contactsFileStream: Readable;
}
