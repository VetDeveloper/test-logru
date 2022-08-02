import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getAllUsers() : Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async updateUser(id: string, userDTO: UpdateUserDTO) {
    await this.userModel.updateOne(
      { _id: id },
      {
        $set: userDTO,
      },
    );
    return this.getUserById(id);
  }

  deleteUser(id: number) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email: email }).lean();
  }

  async getUserById(id: string) {
    return await this.userModel.findOne({ _id: id }).lean();
  }

  async registrateOne(dto: CreateUserDTO) {
    await new this.userModel(dto).save();
    return this.getUserByEmail(dto.email);
  }
}
