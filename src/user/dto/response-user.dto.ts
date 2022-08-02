import { PickType } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class ResponseUserDTO extends PickType(User, ['email']) {}
