const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.category.deleteMany({
    where: { name: 'Dummy Category' }
  });
  console.log("Deleted Dummy Category");
}

main().catch(console.error).finally(() => prisma.$disconnect());
