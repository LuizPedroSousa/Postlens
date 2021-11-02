import ContactSchema from "../infra/entities/ContactSchema";
import { Readable } from "stream";

export type IContact = Omit<ContactSchema, "id" | "created_at" | "updated_at">;

export interface IImportContactsDTO {
  contactsFileStream: Readable;
}
