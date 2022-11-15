import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async RegisterUser(
    @Args('input', { type: () => CreateUserInput }) input: CreateUserInput,
  ) {
    await this.userService.registerUser(input);
    return true;
  }
}
