/* eslint-disable prettier/prettier */
import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Permission } from './permission.model';
import { Role } from '@/role/model/role.model';

@ObjectType()
export class PermissionRole {
  @Field(() => String, { nullable: false })
  permissionCode!: string;

  @Field(() => Int, { nullable: false })
  roleId!: number;

  @Field(() => Date, { nullable: false })
  its!: Date;

  @Field(() => Permission, { nullable: false })
  permission?: Permission;

  @Field(() => Role, { nullable: false })
  role?: Role;
}
