import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import {  } from "bcrypt";

import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createUser(credentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = credentialsDto;
    const userEntity = this.create({
      username,
      password
    });
    try {
      await this.save(userEntity);
    } catch (e) {
      this.handleCreateUserError(e);
    }
  }

  hashPassword(password: string) {}

  private handleCreateUserError(e) {
    if (e.code == 23505) {
      throw new ConflictException("Username exist");
    } else {
      throw new InternalServerErrorException();
    }
  }
}
