import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from "typeorm";

@Entity("contacts")
class ContactSchema {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column({ unique: true })
  cellphone: string;

  @Column()
  completedAt: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(
    props: Omit<
      ContactSchema,
      "id" | "completedAt" | "created_at" | "updated_at"
    >
  ) {
    Object.assign(this, props);
  }
}

export default ContactSchema;
