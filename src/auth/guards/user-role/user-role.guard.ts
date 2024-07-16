import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { META_ROLES } from '../../decorators/role-protected.decorator';
import { User } from '../../entities/user.entity';
import { ValidRolesInterface } from 'src/auth/interfaces';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: ValidRolesInterface[] = this.reflector.get<ValidRolesInterface[]>(META_ROLES, context.getHandler());
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    if(!user) throw new BadRequestException('User not found');
    console.log(user.roles);
    for(const role of user.roles) {
      if (validRoles.includes(role)) return true;
    }
    throw new ForbiddenException(`User need to have one of these roles: ${validRoles}`);
  }
}
