import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
