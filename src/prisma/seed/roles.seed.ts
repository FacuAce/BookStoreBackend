/* eslint-disable prettier/prettier */
import { Prisma, PrismaClient } from '@prisma/client';
import { SystemRoles } from './enums';

const seedRoles = async (prisma: PrismaClient) => {
  console.log('Seeding roles...');
  const roles: Prisma.RoleCreateInput[] = [
    {
      name: SystemRoles.Administrador,
      description: 'Manage all the books of the application',
    },
    {
      name: SystemRoles.Autor,
      description: 'Manage your own books from the application',
    },
    {
      name: SystemRoles.Lector,
      description: 'Can see all books of the application',
    },
  ];

  const dbRoles = await prisma.role.findMany();
  let rolesCreated = 0;

  for (const role of roles) {
    const dbRole = dbRoles.find((item) => item.name === role.name);

    if (!dbRole) {
      rolesCreated++;
      await prisma.role.create({
        data: role,
        select: {
          id: true,
        },
      });
    }
  }

  console.log(`Created ${rolesCreated} roles`);
};

export default seedRoles;
