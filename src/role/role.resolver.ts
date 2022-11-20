import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './model/role.model';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Boolean)
  async createRole(
    @Args('input', { type: () => CreateRoleInput }) input: CreateRoleInput,
  ) {
    const result = this.roleService.createRole(input);
    if (!result) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async updateRole(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => UpdateRoleInput }) input: UpdateRoleInput,
  ) {
    const result = await this.roleService.updateRole(id, input);
    if (!result) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteRole(@Args('id', { type: () => Int }) id: number) {
    const result = await this.roleService.deleteRole(id);
    if (!result) {
      return false;
    }
    return true;
  }

  @Query(() => [Role])
  async getRoles() {
    return await this.roleService.getRoles();
  }
}
