import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  dni!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  firstname!: string;

  @Field(() => String, { nullable: false })
  lastname!: string;

  @HideField()
  password!: string;

  @Field(() => Boolean, { nullable: false })
  status!: string;

  @Field(() => Date, { nullable: false })
  its!: Date;

  @Field(() => Date, { nullable: true })
  uts!: Date | null;

  @Field(() => Date, { nullable: true })
  dts!: Date | null;
}
