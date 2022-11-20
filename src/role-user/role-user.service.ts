import { PrismaService } from '@/prisma/prisma.service';
import { Status } from '@/shared/status.enum';
import { Injectable } from '@nestjs/common';
import { CreateRoleUserInput } from './dto/create-role-user.input';
import { UpdateRoleUserInput } from './dto/update-role-user.input';
import { RoleUserUserIdRoleIdCompoundUniqueInput } from './model/role-user-user-id-role-id-compound-unique.input';

@Injectable()
export class RoleUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkRoleUser(roleId: number, userId: number) {
    const roleUserExist = await this.prismaService.roleUser.count({
      where: {
        AND: [{ roleId: roleId }, { userId: userId }, { dts: null }],
      },
    });
    if (roleUserExist > 0) {
      return true;
    }
    return false;
  }

  async createRoleUser(input: CreateRoleUserInput) {
    const roleUserExists = await this.checkRoleUser(input.roleId, input.userId);

    if (roleUserExists == true) {
      return null;
    }

    const roleUserCreated = await this.prismaService.roleUser.create({
      data: {
        ...input,
      },
    });
    console.log(roleUserCreated);
    return roleUserCreated;
  }

  async deleteRoleUser(id: RoleUserUserIdRoleIdCompoundUniqueInput) {
    const roleUserDelete = await this.prismaService.roleUser.update({
      where: {
        userId_roleId: id,
      },
      data: {
        dts: new Date(),
      },
    });
    console.log(roleUserDelete);
    return roleUserDelete;
  }

  async getRoleUserByUserId(userId: number) {
    return this.prismaService.roleUser.findMany({
      where: {
        userId: userId,
        dts: null,
      },
      include: {
        role: true,
        user: true,
      },
    });
  }
}
