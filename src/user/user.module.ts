import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { HashService } from '@/hash/hash.service';

@Module({
  providers: [HashService, UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
