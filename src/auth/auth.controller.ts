import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { AuthService } from "./auth.service";
import { UserJwtTokenDto } from "./dto/user.jwt.token.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post("/signin")
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto
  ): Promise<UserJwtTokenDto> {
    return this.authService.signIn(authCredentialsDto);
  }
}
