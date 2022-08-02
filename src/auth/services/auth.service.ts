import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { AuthResponse } from '../dto/auth-response.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../types/token-payload.type';
import { LoginUserDTO } from '../dto/login-user.dto';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user || !pass) {
      throw new UnauthorizedException('Неправильный логин или пароль');
    }

    const passwordEquals = await bcrypt.compare(pass, user.password);

    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException('Неправильный логин или пароль');
  }

  async login(dto: LoginUserDTO): Promise<AuthResponse> {
    const user: UserDocument = await this.validateUser(dto.email, dto.password);
    return this.tokenService.getTokenObject(user);
  }

  async registration(userDto: CreateUserDTO): Promise<AuthResponse> {
    const isUserAlreadyExist = await this.usersService.getUserByEmail(
      userDto.email,
    );

    if (isUserAlreadyExist) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    const user = await this.usersService.registrateOne({
      ...userDto,
    });
    return this.tokenService.getTokenObject(user);
  }
}
