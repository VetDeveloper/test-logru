import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
import { UsersService } from '../services/user.service';
  
  @Injectable()
  export class UserOwnerGuard implements CanActivate {
    constructor(private userService: UsersService) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();
  
      const logUserId: string = req.user.id;
      const userId : string = req.params.id;
  
      const ownerId = this.userService.getUserById(userId);
  
      return ownerId.then((resp) => {
        try {
          resp.id;
        } catch (e) {
          throw new NotFoundException(e);
        }
        return logUserId === resp.id;
      });
    }
  }