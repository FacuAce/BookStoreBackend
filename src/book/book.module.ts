import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { UserService } from '@/user/user.service';
import { HashService } from '@/hash/hash.service';
import { PermissionService } from '@/permission/permission.service';

@Module({
  providers: [
    BookResolver,
    BookService,
    UserService,
    HashService,
    PermissionService,
  ],
})
export class BookModule {}
