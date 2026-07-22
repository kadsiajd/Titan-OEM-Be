import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORY_SEED = [
  {
    fileName: 'quartz.jpg',
    filePath: '/categories/quartz.jpg',
    name: 'Quartz',
    description:
      'Accurate and low-maintenance quartz movements, ideal for everyday reliability at scale.',
  },
  {
    fileName: 'micromotor.jpg',
    filePath: '/categories/micromotor.jpg',
    name: 'Micromotor',
    description:
      'Compact micromotor movements engineered for space-constrained, high-precision applications.',
  },
  {
    fileName: 'mechanical.jpg',
    filePath: '/categories/mechanical.jpg',
    name: 'Mechanical',
    description:
      'Traditional mechanical movements combining fine craftsmanship with enduring engineering.',
  },
];

const CUSTOMER_SEED = [
  {
    name: 'Mahindra & Mahindra',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Mahindra_%26_Mahindra_Logo.svg/512px-Mahindra_%26_Mahindra_Logo.svg.png',
  },
  {
    name: 'Ashok Leyland',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Ashok_Leyland_Logo.svg/512px-Ashok_Leyland_Logo.svg.png',
  },
  {
    name: 'BharatBenz',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/BharatBenz_Logo.svg/512px-BharatBenz_Logo.svg.png',
  },
  {
    name: 'Eicher Motors',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Eicher_Motors_Logo.svg/512px-Eicher_Motors_Logo.svg.png',
  },
  {
    name: 'TVS Motor Company',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/TVS_Motor_Company_Logo.svg/512px-TVS_Motor_Company_Logo.svg.png',
  },
  {
    name: 'Hero MotoCorp',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Hero_MotoCorp_Logo.svg/512px-Hero_MotoCorp_Logo.svg.png',
  },
  {
    name: 'Bajaj Auto',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Bajaj_Auto_Logo.svg/512px-Bajaj_Auto_Logo.svg.png',
  },
  {
    name: 'Maruti Suzuki',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Maruti_Suzuki_Logo.svg/512px-Maruti_Suzuki_Logo.svg.png',
  },
  {
    name: 'Hyundai Motor India',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/512px-Hyundai_Motor_Company_logo.svg.png',
  },
  {
    name: 'Kia India',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kia-logo.svg/512px-Kia-logo.svg.png',
  },
  {
    name: 'Toyota Kirloskar Motor',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/512px-Toyota_carlogo.svg.png',
  },
  {
    name: 'Honda Cars India',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/512px-Honda_Logo.svg.png',
  },
  {
    name: 'Renault India',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Renault_2021_Logo.svg/512px-Renault_2021_Logo.svg.png',
  },
  {
    name: 'Nissan Motor India',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Nissan_2020_logo.svg/512px-Nissan_2020_logo.svg.png',
  },
  {
    name: 'Ford India',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/512px-Ford_logo_flat.svg.png',
  },
  {
    name: 'Volkswagen India',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/512px-Volkswagen_logo_2019.svg.png',
  },
  {
    name: 'Skoda Auto India',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Skoda_Auto_2016_logo.svg/512px-Skoda_Auto_2016_logo.svg.png',
  },
  {
    name: 'MG Motor India',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/MG_Motor_logo.svg/512px-MG_Motor_logo.svg.png',
  },
  {
    name: 'Mercedes-Benz India',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/512px-Mercedes-Logo.svg.png',
  },
];

async function main() {
  console.log('Seeding database...');

  for (const category of CATEGORY_SEED) {
    const file = await prisma.file.create({
      data: {
        fileName: category.fileName,
        filePath: category.filePath,
        fileSize: 0,
      },
    });

    await prisma.category.create({
      data: {
        name: category.name,
        description: category.description,
        filePathId: file.id,
      },
    });
  }

  for (const customer of CUSTOMER_SEED) {
    const file = await prisma.file.create({
      data: {
        fileName: `${customer.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-logo.png`,
        filePath: customer.logoUrl,
        fileSize: BigInt(0),
      },
    });

    await prisma.customer.create({
      data: {
        name: customer.name,
        filePathId: file.id,
        fileId: file.id,
      },
    });

    console.log(`Created customer: ${customer.name}`);
  }

  console.log('Seed completed.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });