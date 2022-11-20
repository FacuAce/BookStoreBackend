import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { RequiredPermissions } from '@/decorators/permission.decorator';
import { User } from './model/user.model';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async registerUser(
    @Args('input', { type: () => CreateUserInput }) input: CreateUserInput,
  ) {
    const result = await this.userService.registerUser(input);
    if (!result) {
      return false;
    }
    return true;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', {
      type: () => UpdateUserInput,
    })
    input: UpdateUserInput,
  ) {
    const result = await this.userService.updateUser(id, input);
    if (!result) {
      return false;
    }
    return true;
  }

  @Query(() => [User])
  async getUsers() {
    await this.userService.findMany();
  }
}
