const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const docs = await prisma.productDocument.findMany({ include: { file: true } });
  docs.forEach(d => console.log(d.file.filePath));
}
main();
