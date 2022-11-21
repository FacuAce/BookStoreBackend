import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { RoleUserModule } from './role-user/role-user.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      playground: {
        settings: {
          'request.credentials': 'include', // Permite que la sesion se guarde como cookie cuando se usa el playground
        },
      },
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    HelloWorldModule,
    UserModule,
    PrismaModule,
    RoleModule,
    RoleUserModule,
    BookModule,
    AuthModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
