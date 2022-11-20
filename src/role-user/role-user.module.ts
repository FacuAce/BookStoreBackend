import { Module } from '@nestjs/common';
import { RoleUserService } from './role-user.service';
import { RoleUserResolver } from './role-user.resolver';

@Module({
  providers: [RoleUserResolver, RoleUserService],
})
export class RoleUserModule {}
