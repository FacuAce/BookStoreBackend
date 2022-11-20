import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './model/book.model';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Boolean)
  async createBook(
    @Args('input', { type: () => CreateBookInput }) input: CreateBookInput,
  ) {
    const result = await this.bookService.createBook(input);
    if (result == null) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => UpdateBookInput }) input: UpdateBookInput,
  ) {
    const result = await this.bookService.bookUpdate(id, input);
    if (result == null) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Args('id', { type: () => Int }) id: number) {
    const result = await this.bookService.bookDelete(id);
    if (result == null) {
      return false;
    }
    return true;
  }

  @Query(() => [Book])
  async getBooks() {
    return await this.bookService.getBooks();
  }
}
