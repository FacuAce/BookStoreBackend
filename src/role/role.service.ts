import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Status } from '@/shared/status.enum';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  //async checkRoleExist(roleName: string) {
  //   const rolesWithTheSameName = await this.prismaService.role.findFirst({
  //     where: {
  //       AND: [
  //         {
  //           name: {
  //             contains: roleName,
  //           },
  //         },
  //         {
  //           status: Status.ACTIVE,
  //         },
  //       ],
  //     },
  //   });

  //   if (!rolesWithTheSameName) {
  //     return false;
  //   }
  //   return true;
  // }

  async createRole(input: CreateRoleInput) {
    //const roleExists = await this.checkRoleExist(CreateRoleInput.name);
    const roleCreated = await this.prismaService.role.create({
      data: {
        ...input,
      },
    });
    console.log(roleCreated);
    return roleCreated;
  }

  async deleteRole(roleId: number) {
    const roleDeleted = await this.prismaService.role.update({
      where: {
        id: roleId,
      },
      data: {
        status: Status.INACTIVE,
        dts: new Date(),
      },
    });
    return roleDeleted;
  }

  async updateRole(roleId: number, input: UpdateRoleInput) {
    const roleDeleted = await this.prismaService.role.update({
      where: {
        id: roleId,
      },
      data: {
        ...input,
        uts: new Date(),
      },
    });
    return roleDeleted;
  }

  async getRoles() {
    return await this.prismaService.role.findMany({
      where: {
        AND: [
          {
            dts: null,
          },
          {
            status: Status.ACTIVE,
          },
        ],
      },
    });
  }
}
