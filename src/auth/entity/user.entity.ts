import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "../../tasks/entity/task.entity";

@Entity()
export class UserEntity {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => TaskEntity, (task) => task.user, { eager: true })
  tasks: TaskEntity[];
}
