/* eslint-disable prettier/prettier */
import { Prisma, PrismaClient } from '@prisma/client';
import { PermissionCodes } from './permissions.enum';

const seedPermissions = async (prisma: PrismaClient) => {
  console.log('Seeding permissions...');
  const permissions: Prisma.PermissionCreateInput[] = [
    {
      code: PermissionCodes.createBook,
      shortname: 'Create book permission',
      description: 'Permission for users to create books',
    },
    {
      code: PermissionCodes.deleteBook,
      shortname: 'Delete book permission',
      description: 'Permission for users to delete books',
    },
    {
      code: PermissionCodes.readBooks,
      shortname: 'Read books permission',
      description: 'Permission for users to see books',
    },
    {
      code: PermissionCodes.updateBook,
      shortname: 'Update book permission',
      description: 'Permission for users to update books',
    },
    {
      code: PermissionCodes.usersRead,
      shortname: 'Read users permission',
      description: 'Permission for users to read users',
    },
  ];

  const dbPermissions = await prisma.permission.findMany();
  let permissionsCreated = 0;

  for (const permission of permissions) {
    const dbPermission = dbPermissions.find(
      (item) => item.code === permission.code,
    );

    if (!dbPermission) {
      permissionsCreated++;
      await prisma.permission.create({
        data: permission,
      });
    }
  }

  console.log(`Created ${permissionsCreated} permissions`);
};

export default seedPermissions;
