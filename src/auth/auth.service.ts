import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const userEntity = await this.usersRepository.findOne({ username});
    if (userEntity && (await compare(password, userEntity.password))) {
      return "success";
    } else {
      throw new UnauthorizedException("Credentials incorrect");
    }
  }
}
