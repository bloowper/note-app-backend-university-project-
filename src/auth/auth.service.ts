import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interface/jwt-payload.interface";
import { UserJwtTokenDto } from "./dto/user.jwt.token.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<UserJwtTokenDto> {
    const { username, password } = authCredentialsDto;
    const userEntity = await this.usersRepository.findOne({ username });
    if (userEntity && (await compare(password, userEntity.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken};
    } else {
      throw new UnauthorizedException("Credentials incorrect");
    }
  }
}
