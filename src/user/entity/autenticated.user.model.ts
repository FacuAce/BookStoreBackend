/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../model/user.model';
import { Permission } from '@/permission/model/permission.model';

@ObjectType()
export class AuthenticatedUser extends User {
  @Field(() => [Permission])
  permissions: Permission[];
}
