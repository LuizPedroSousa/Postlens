import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";
import { Prefix } from "./Prefix";
import { File } from "@modules/files/entities/File";

export type MessageType = "whatsapp" | "sms" | "email";

export type MessageAttributes<T> = Omit<T, "id" | "created_at" | "updated_at">;

@Entity("messages")
class Message {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  body: string;

  @Column()
  type: MessageType;

  @Column()
  subject?: string;

  @Column()
  user_id: string;

  @Column()
  prefixes?: Prefix[];

  @Column()
  templateFile?: File;

  @Column()
  completed_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(props: MessageAttributes<Message>) {
    Object.assign(this, props);
  }
}

export { Message };
