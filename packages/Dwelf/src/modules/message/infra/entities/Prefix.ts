import { Contact } from "@/modules/contact/infra/entities/Contact";
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

export type PrefixAttributes<T> = Omit<T, "id" | "created_at" | "updated_at">;

@Entity("message_prefixes")
class Prefix {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  contact_field: keyof Contact;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(props: PrefixAttributes<Prefix>) {
    Object.assign(this, props);
  }
}

export { Prefix };
