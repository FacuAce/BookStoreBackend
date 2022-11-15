import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  dni: string;
  @Field()
  @IsNotEmpty()
  username: string;
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  password: string;
  @Field()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsNotEmpty()
  lastname: string;
}
