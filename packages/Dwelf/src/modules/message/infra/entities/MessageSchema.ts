import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

export type MessageType = "whatsapp" | "sms" | "email";

export type MessageAttributes<T> = Omit<T, "id" | "created_at" | "updated_at">;

@Entity("messages")
class MessageSchema {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  body: string;

  @Column()
  type: MessageType;

  @Column()
  user_id: string;

  @Column()
  completed_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(props: MessageAttributes<MessageSchema>) {
    Object.assign(this, props);
  }
}

export { MessageSchema };
