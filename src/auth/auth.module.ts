import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TokenModule } from "src/token/token.module";
import { UsersModule } from "src/user/users.module";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
      UsersModule,
      PassportModule,
      ConfigModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get('SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRESIN_TIME'),
          },
        }),
      }),
      TokenModule
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtModule],
  })
export class AuthModule {}