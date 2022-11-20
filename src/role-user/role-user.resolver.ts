import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleUserService } from './role-user.service';
import { RoleUser } from './model/role.user.model';
import { CreateRoleUserInput } from './dto/create-role-user.input';
import { UpdateRoleUserInput } from './dto/update-role-user.input';
import { RoleUserUserIdRoleIdCompoundUniqueInput } from './model/role-user-user-id-role-id-compound-unique.input';

@Resolver(() => RoleUser)
export class RoleUserResolver {
  constructor(private readonly roleUserService: RoleUserService) {}

  @Mutation(() => Boolean)
  async createRoleUser(
    @Args('input', { type: () => CreateRoleUserInput })
    input: CreateRoleUserInput,
  ) {
    const result = await this.roleUserService.createRoleUser(input);
    if (result == null) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteRoleUser(
    @Args('id', { type: () => RoleUserUserIdRoleIdCompoundUniqueInput })
    id: RoleUserUserIdRoleIdCompoundUniqueInput,
  ) {
    const result = await this.roleUserService.deleteRoleUser(id);
    if (result == null) {
      return false;
    }
    return true;
  }

  @Query(() => [RoleUser])
  async getRolesUserByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return await this.roleUserService.getRoleUserByUserId(userId);
  }
}
