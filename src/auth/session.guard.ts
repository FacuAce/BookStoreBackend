/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PermissionService } from '@/permission/permission.service';
import { AuthenticatedUser } from '@/user/entity/autenticated.user.model';
import { UserService } from '@/user/user.service';
import { User } from '@/user/model/user.model';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly usersService: UserService,
    private readonly permissionService: PermissionService,
  ) {
    // Intentional
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    if (!req.session?.userId) {
      return false;
    }

    const user: User | null = await this.usersService.findOne({
      id: req.session.userId,
    });

    const userPermissions = await this.permissionService.getPermissionsForUser(
      req.session.userId,
    );

    if (!user?.status) {
      return false;
    }

    const authenticatedUser: AuthenticatedUser = {
      ...user,
      permissions: userPermissions,
    };

    req.user = authenticatedUser;
    req.session.lastUpdated = new Date();

    return true;
  }
}
