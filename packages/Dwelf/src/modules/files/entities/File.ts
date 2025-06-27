import {
  Entity,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from "typeorm";

@Entity("files")
class File {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  filename: string;

  @Column()
  filesize: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { File };
