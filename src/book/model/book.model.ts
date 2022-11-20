/* eslint-disable prettier/prettier */
import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { User } from '@/user/model/user.model';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => User, { nullable: false })
  author!: User;

  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  descripcion!: string;

  @Field(() => String, { nullable: false })
  status!: string;

  @Field(() => Date, { nullable: false })
  its!: Date;

  @Field(() => Date, { nullable: true })
  dts!: Date | null;
}
