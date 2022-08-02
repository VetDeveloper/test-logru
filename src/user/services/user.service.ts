import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private tokenService: TokenService,
  ) {}

  getAllUsers() {
    return this.usersRepository.getAllUsers();
  }

  async updateUser(id: string, userDTO: UpdateUserDTO) {
    if (userDTO.email) {
      const isUserAlreadyExist = await this.getUserByEmail(userDTO.email);
      if (isUserAlreadyExist) {
        throw new BadRequestException('email занят');
      }
    }
    const dto = userDTO.password
      ? {
          ...userDTO,
          password: await bcrypt.hash(userDTO.password, 5),
        }
      : userDTO;
    return this.tokenService.getTokenObject(
      await this.usersRepository.updateUser(id, dto),
    );
  }
  async deleteUser(id: number) {
    const res =
      (await this.usersRepository.deleteUser(id)).deletedCount > 0
        ? true
        : false;
    if (res) {
      return true;
    }
    throw new NotFoundException();
  }

  getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  async registrateOne(dto: CreateUserDTO) {
    const newDTO: CreateUserDTO = {
      ...dto,
      password: await bcrypt.hash(dto.password, 5),
    };
    return this.usersRepository.registrateOne(newDTO);
  }
}
