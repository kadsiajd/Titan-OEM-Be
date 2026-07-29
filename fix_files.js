const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const files = await prisma.file.findMany();
  for (const file of files) {
    if (file.filePath.startsWith('http://localhost:4000/files')) {
      const fixedPath = file.filePath.replace('http://localhost:4000/files', '');
      console.log(`Fixing ${file.fileName}: ${file.filePath} -> ${fixedPath}`);
      await prisma.file.update({
        where: { id: file.id },
        data: { filePath: fixedPath }
      });
    }
  }
  console.log("Done");
}
main();
