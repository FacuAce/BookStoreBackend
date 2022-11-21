/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import seedPermissions from './permission.seed';
import seedRoles from './roles.seed';
import seedRolePermissions from './permissionRole.seed';

const prisma = new PrismaClient();

async function main() {
  await seedRoles(prisma);
  await seedPermissions(prisma);
  await seedRolePermissions(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
