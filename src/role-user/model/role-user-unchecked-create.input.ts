import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class RoleUserUncheckedCreateInput {
  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => Int, { nullable: false })
  roleId!: number;

  @Field(() => Date, { nullable: true })
  its?: Date | string;

  @Field(() => Date, { nullable: true })
  dts?: Date | string;
}
