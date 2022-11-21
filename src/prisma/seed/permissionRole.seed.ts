/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { PermissionCodes } from './permissions.enum';
import { SystemRoles } from './system.roles.';

const seedRolePermissions = async (prisma: PrismaClient) => {
  console.log('Seeding relations between roles and permissions...');

  const rolesPermissions: {
    roleNames: string[];
    permissionCode: string;
  }[] = [
    {
      roleNames: [SystemRoles.Autor],
      permissionCode: PermissionCodes.createBook,
    },
    {
      roleNames: [SystemRoles.Autor, SystemRoles.Administrador],
      permissionCode: PermissionCodes.deleteBook,
    },
    {
      roleNames: [SystemRoles.Administrador, SystemRoles.Autor],
      permissionCode: PermissionCodes.updateBook,
    },
    {
      roleNames: [
        SystemRoles.Administrador,
        SystemRoles.Autor,
        SystemRoles.Lector,
      ],
      permissionCode: PermissionCodes.readBooks,
    },
    {
      roleNames: [SystemRoles.Administrador],
      permissionCode: PermissionCodes.usersRead,
    },
  ];

  const dbRolePermissions = await prisma.permissionRole.findMany({
    include: {
      permission: true,
      role: true,
    },
  });

  let relationsCreated = 0;

  for (const rolePermission of rolesPermissions) {
    for (const roleName of rolePermission.roleNames) {
      const dbRolePermission = dbRolePermissions.find(
        (item) =>
          item.role.name === roleName &&
          item.permission.code === rolePermission.permissionCode,
      );

      if (!dbRolePermission) {
        const dbRole = await prisma.role.findFirst({
          where: {
            name: roleName,
          },
        });

        const dbPermission = await prisma.permission.findFirst({
          where: {
            code: rolePermission.permissionCode,
          },
        });

        if (dbRole && dbPermission) {
          await prisma.permissionRole.create({
            data: {
              permissionCode: dbPermission.code,
              roleId: dbRole.id,
            },
          });
          relationsCreated++;
        } else {
          console.warn(
            `Relation could not be created for role ${roleName} and permission ${rolePermission.permissionCode}`,
          );
        }
      }
    }
  }

  console.log(`${relationsCreated} relations between roles and permissions`);
};

export default seedRolePermissions;
