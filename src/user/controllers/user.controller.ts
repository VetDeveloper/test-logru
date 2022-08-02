import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserOwnerGuard } from '../guards/user-owner.guard';
import { UsersService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() userDto: UpdateUserDTO) {
    return this.usersService.updateUser(id, userDto);
  }

  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
