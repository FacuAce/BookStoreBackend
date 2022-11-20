/* eslint-disable prettier/prettier */
import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
//import { RoleUser } from '../role-user/role-user.model';

@ObjectType()
export class Role {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Date, { nullable: false })
  its!: Date;

  @Field(() => Date, { nullable: true })
  uts!: Date | null;

  @Field(() => Date, { nullable: true })
  dts!: Date | null;

  //@Field(() => [RoleUser], { nullable: true })
  //RoleUser?: Array<RoleUser>;
}
