import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TokenModule } from "src/token/token.module";
import { UsersController } from "./controllers/user.controller";
import { UsersRepository } from "./repositories/users.repository";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersService } from "./services/user.service";

@Module({
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), TokenModule],
    exports: [UsersService],
  })
  export class UsersModule {}