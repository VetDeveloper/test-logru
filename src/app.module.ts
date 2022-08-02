import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { MongooseConfigFactory } from './database/factory/mongoose-config.factory';
import { TokenModule } from './token/token.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'test.env',
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(5000),
        MONGODB_URI: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigFactory,
    }),
    UsersModule,
    AuthModule,
    TokenModule
  ],
})
export class AppModule {}
