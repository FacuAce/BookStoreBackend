/* eslint-disable prettier/prettier */
import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Role } from '@/role/model/role.model';
import { User } from '@/user/model/user.model';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class RoleUser {
  @Field(() => User, { nullable: false })
  user?: User;

  @Field(() => Role, { nullable: false })
  role?: Role;

  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => Int, { nullable: false })
  roleId!: number;

  @Field(() => Date, { nullable: false })
  its!: Date;

  @Field(() => Date, { nullable: true })
  dts!: Date | null;
}
