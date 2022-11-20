import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class RoleUserUserIdRoleIdCompoundUniqueInput {
  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => Int, { nullable: false })
  roleId!: number;
}
