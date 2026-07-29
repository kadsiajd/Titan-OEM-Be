const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const quartzFile = await prisma.file.findFirst({
    where: { fileName: 'quartz.png' }
  });

  if (!quartzFile) {
    console.error("Quartz file not found!");
    return;
  }

  await prisma.category.create({
    data: {
      name: 'Dummy Category',
      shortDescription: 'This is a dummy category created just to test the UI carousel arrows.',
      filePathId: quartzFile.id
    }
  });

  console.log("Dummy Category successfully created!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
