import { CreateBookInput } from './create-book.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field({ nullable: true })
  status?: string;
}
