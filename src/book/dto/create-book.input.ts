import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsNotEmpty()
  descripcion: string;
  @Field(() => Int, { nullable: false })
  userId: number;
}
