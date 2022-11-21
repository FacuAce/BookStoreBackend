/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { HashModule } from '@/hash/hash.module';
import { LocalStrategy } from './local.strategy';
import { PermissionModule } from '@/permission/permission.module';
import { ConfigService } from '@/config/config.service';

@Module({
  providers: [AuthService, AuthResolver, LocalStrategy, ConfigService],
  imports: [
    UserModule,
    PassportModule.register({
      session: true,
    }),
    HashModule,
    PermissionModule,
    ConfigService,
  ],
})
export class AuthModule {}
