import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { HashService } from '@/hash/hash.service';
import { PermissionService } from '@/permission/permission.service';

@Module({
  providers: [HashService, UserResolver, UserService, PermissionService],
  exports: [UserService],
})
export class UserModule {}
