import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "src/user/dto/create-user.dto";
import { AuthResponse } from "../dto/auth-response.dto";
import { LoginUserDTO } from "../dto/login-user.dto";
import { AuthService } from "../services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('login')
    async login(@Body() user: LoginUserDTO) {
      const answ = AuthResponse.create(await this.authService.login(user));
      return answ;
    }

    @Post('reg')
    async reg(@Body() userDto: CreateUserDTO) {
      const answ = AuthResponse.create(
        await this.authService.registration(userDto),
      );
      return answ;
    }
  }