import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UsersService } from 'src/user/services/user.service';
import { TokenPayload } from '../types/token-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private confService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: confService.get('SECRET_KEY'),
    });
  }

  async validate(payload: any): Promise<TokenPayload> {
    const user = await this.usersService.getUserById(payload.id);
    if (!user || payload.email !== user.email) {
      throw new UnauthorizedException('Bad jwt token');
    }
    return { id: user.id, email: user.email };
  }
}
