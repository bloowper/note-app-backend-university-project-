import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./taskStatus.enum";

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
