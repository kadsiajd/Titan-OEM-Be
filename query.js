const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const file = await prisma.file.findFirst({ where: { id: "04473ac6-725f-4ca5-b0c3-b8fc4f09dec2" } });
  console.log(file);
}
main();
