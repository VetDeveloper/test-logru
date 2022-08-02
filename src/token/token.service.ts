import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from 'src/auth/dto/auth-response.dto';
import { TokenPayload } from 'src/auth/types/token-payload.type';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async getTokenObject(user): Promise<AuthResponse> {
    const payload: TokenPayload = { id: user._id, email: user.email };
    const { password, ...result } = user;

    return {
      user: result,
      access_token: this.jwtService.sign(payload),
    };
  }
}
