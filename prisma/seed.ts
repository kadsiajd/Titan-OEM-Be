import {
  PrismaClient,
  ProductStatus,
  SpecificationFieldType,
  ProductFileType,
} from '@prisma/client';
import { MAX_HERO_BANNER_IMAGES } from '../src/config/constants';

const prisma = new PrismaClient();

/* =========================================================
   TYPES
========================================================= */

type SpecificationSeed = {
  fieldName: string;
  fieldKey: string;
  value: string;
  fieldType?: SpecificationFieldType;
  isFilterable?: boolean;
  displayOrder?: number;
};

type ProductSeed = {
  name: string;
  specifications: SpecificationSeed[];
};

/* =========================================================
   CATEGORY DATA
========================================================= */

const CATEGORIES = [
  {
    name: 'Quartz',
    description: 'Accurate and reliable quartz movements designed for everyday watch applications.',
    imageName: 'quartz.png',
    imagePath: '/categories/quartz.png',
  },
  {
    name: 'Mechanical',
    description:
      'Mechanical watch movements featuring automatic winding and precision engineering.',
    imageName: 'mechanical.png',
    imagePath: '/categories/mechanical.png',
  },
  {
    name: 'Micromotor',
    description:
      'Compact micromotor movements designed for precise multi-hand and independent hand control.',
    imageName: 'micromotors.png',
    imagePath: '/categories/micromotors.png',
  },
];

/* =========================================================
   QUARTZ PRODUCTS
========================================================= */

const QUARTZ_PRODUCTS: ProductSeed[] = [
  {
    name: '6130',
    specifications: [
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '3 Hands',
      },
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: `6 3/4 X 8'''`,
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '2.60 mm',
      },
      {
        fieldName: 'Battery',
        fieldKey: 'battery',
        value: 'SR621SW',
      },
      {
        fieldName: 'Battery Life',
        fieldKey: 'battery_life',
        value: '36 M',
      },
    ],
  },

  {
    name: '6120',
    specifications: [
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '3 Hands Base',
      },
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: `6 3/4 X 8'''`,
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '2.60 mm',
      },
      {
        fieldName: 'Battery',
        fieldKey: 'battery',
        value: 'SR621SW',
      },
      {
        fieldName: 'Battery Life',
        fieldKey: 'battery_life',
        value: '36 M',
      },
    ],
  },

  {
    name: '7121',
    specifications: [
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '3 Hands + Date',
      },
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: `10 1/2'''`,
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '3.10 mm',
      },
      {
        fieldName: 'Battery',
        fieldKey: 'battery',
        value: 'SR920SW',
      },
      {
        fieldName: 'Battery Life',
        fieldKey: 'battery_life',
        value: '68 M',
      },
    ],
  },

  {
    name: '7320',
    specifications: [
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '3 Hands',
      },
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: `13'''`,
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '3.10 mm',
      },
      {
        fieldName: 'Battery',
        fieldKey: 'battery',
        value: 'SR920SW',
      },
      {
        fieldName: 'Battery Life',
        fieldKey: 'battery_life',
        value: '68 M',
      },
    ],
  },

  {
    name: '7C01',
    specifications: [
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '3 Hands + 1/1 Chrono + 24Hr',
      },
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: `12 3/4'''`,
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '4.10 mm',
      },
      {
        fieldName: 'Battery',
        fieldKey: 'battery',
        value: 'SR920SW',
      },
      {
        fieldName: 'Battery Life',
        fieldKey: 'battery_life',
        value: '36 M',
      },
    ],
  },
];

/* =========================================================
   MECHANICAL PRODUCTS
========================================================= */

const MECHANICAL_PRODUCTS: ProductSeed[] = [
  {
    name: '7A20S',
    specifications: [
      {
        fieldName: 'Diameter',
        fieldKey: 'diameter',
        value: `13"`,
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '5.10 mm',
      },
      {
        fieldName: 'Jewels',
        fieldKey: 'jewels',
        value: '22',
      },
      {
        fieldName: 'Winding',
        fieldKey: 'winding',
        value: 'Auto-winding',
      },
      {
        fieldName: 'Movement Features',
        fieldKey: 'movement_features',
        value: 'Skeleton',
      },
    ],
  },

  {
    name: '7AC0',
    specifications: [
      {
        fieldName: 'Diameter',
        fieldKey: 'diameter',
        value: `12"'`,
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '5.10 mm',
      },
      {
        fieldName: 'Jewels',
        fieldKey: 'jewels',
        value: '22',
      },
      {
        fieldName: 'Winding',
        fieldKey: 'winding',
        value: 'Auto-winding',
      },
      {
        fieldName: 'Movement Features',
        fieldKey: 'movement_features',
        value: 'Open heart @ 6H',
      },
    ],
  },

  {
    name: '7A21',
    specifications: [
      {
        fieldName: 'Diameter',
        fieldKey: 'diameter',
        value: `12"'`,
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '5.10 mm',
      },
      {
        fieldName: 'Jewels',
        fieldKey: 'jewels',
        value: '23',
      },
      {
        fieldName: 'Winding',
        fieldKey: 'winding',
        value: 'Auto-winding',
      },
      {
        fieldName: 'Movement Features',
        fieldKey: 'movement_features',
        value: 'Date by window',
      },
    ],
  },

  {
    name: '7A28',
    specifications: [
      {
        fieldName: 'Diameter',
        fieldKey: 'diameter',
        value: `12"'`,
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '5.40 mm',
      },
      {
        fieldName: 'Jewels',
        fieldKey: 'jewels',
        value: '23',
      },
      {
        fieldName: 'Winding',
        fieldKey: 'winding',
        value: 'Auto-winding',
      },
      {
        fieldName: 'Movement Features',
        fieldKey: 'movement_features',
        value: 'Sectorial Day/Date',
      },
    ],
  },
];

/* =========================================================
   MICROMOTOR PRODUCTS
========================================================= */

const MICROMOTOR_PRODUCTS: ProductSeed[] = [
  {
    name: '602A',
    specifications: [
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: '13.75x10.54 mm',
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '2.600 mm',
      },
      {
        fieldName: 'Function',
        fieldKey: 'function',
        value: '2 Hands',
      },
      {
        fieldName: 'Direction',
        fieldKey: 'direction',
        value: 'CW (Unidirectional)',
      },
      {
        fieldName: 'No. of Jewels',
        fieldKey: 'no_of_jewels',
        value: '2',
      },
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '2 hands (independent control)',
      },
      {
        fieldName: 'Angular Rotation Per Pulse',
        fieldKey: 'angular_rotation_per_pulse',
        value: 'Minute hand: 2°; Hour hand: 1/6°',
      },
      {
        fieldName: 'No. of Steps for 360° Rotation',
        fieldKey: 'no_of_steps_for_360_rotation',
        value: 'Minute hand: 180; Hour hand: 2160',
      },
      {
        fieldName: 'Resistance',
        fieldKey: 'resistance',
        value: '2.100 ±70 K ohms',
      },
      {
        fieldName: 'Temperature Range',
        fieldKey: 'temperature_range',
        value: '0 to +55°C',
      },
      {
        fieldName: 'Shock Resistance',
        fieldKey: 'shock_resistance',
        value: 'As per NIHS 91/10',
      },
      {
        fieldName: 'Resistance to Magnetic Field',
        fieldKey: 'resistance_to_magnetic_field',
        value: '18.8 Oe',
      },
    ],
  },

  {
    name: '602H A',
    specifications: [
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: '15.00x14.21 mm',
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '2.600 mm',
      },
      {
        fieldName: 'Function',
        fieldKey: 'function',
        value: '2 Hands',
      },
      {
        fieldName: 'Direction',
        fieldKey: 'direction',
        value: 'CW (Unidirectional)',
      },
      {
        fieldName: 'No. of Jewels',
        fieldKey: 'no_of_jewels',
        value: '2',
      },
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '2 hands (independent control)',
      },
      {
        fieldName: 'Angular Rotation Per Pulse',
        fieldKey: 'angular_rotation_per_pulse',
        value: 'Minute hand: 2°; Hour hand: 1/6°',
      },
      {
        fieldName: 'No. of Steps for 360° Rotation',
        fieldKey: 'no_of_steps_for_360_rotation',
        value: 'Minute hand: 180; Hour hand: 2160',
      },
      {
        fieldName: 'Resistance',
        fieldKey: 'resistance',
        value: '2.100 ±70 K ohms',
      },
      {
        fieldName: 'Temperature Range',
        fieldKey: 'temperature_range',
        value: '0 to +55°C',
      },
      {
        fieldName: 'Shock Resistance',
        fieldKey: 'shock_resistance',
        value: 'As per NIHS 91/10',
      },
    ],
  },

  {
    name: '901 A',
    specifications: [
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: '14.202x7.600 mm',
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '2.55 mm',
      },
      {
        fieldName: 'Function',
        fieldKey: 'function',
        value: 'One Hand',
      },
      {
        fieldName: 'Direction',
        fieldKey: 'direction',
        value: 'Bi-directional',
      },
      {
        fieldName: 'No. of Jewels',
        fieldKey: 'no_of_jewels',
        value: '8',
      },
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: 'One Hand',
      },
      {
        fieldName: 'Angular Rotation Per Pulse',
        fieldKey: 'angular_rotation_per_pulse',
        value: '2°',
      },
      {
        fieldName: 'No. of Steps for 360° Rotation',
        fieldKey: 'no_of_steps_for_360_rotation',
        value: '180',
      },
      {
        fieldName: 'Resistance',
        fieldKey: 'resistance',
        value: '1.300 ±70 K ohms',
      },
      {
        fieldName: 'Temperature Range',
        fieldKey: 'temperature_range',
        value: '0 to +55°C',
      },
      {
        fieldName: 'Shock Resistance',
        fieldKey: 'shock_resistance',
        value: 'As per NIHS 91/10',
      },
      {
        fieldName: 'Resistance to Magnetic Field',
        fieldKey: 'resistance_to_magnetic_field',
        value: '18.8 Oe',
      },
    ],
  },

  {
    name: '902 A',
    specifications: [
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: '16.348x16.848 mm',
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '2.55 mm',
      },
      {
        fieldName: 'Function',
        fieldKey: 'function',
        value: 'Two Hands',
      },
      {
        fieldName: 'Direction',
        fieldKey: 'direction',
        value: 'Bi-directional',
      },
      {
        fieldName: 'No. of Jewels',
        fieldKey: 'no_of_jewels',
        value: '12',
      },
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '2 hands (independent control)',
      },
      {
        fieldName: 'Angular Rotation Per Pulse',
        fieldKey: 'angular_rotation_per_pulse',
        value: 'Minute hand: 2°; Hour hand: 2°',
      },
      {
        fieldName: 'No. of Steps for 360° Rotation',
        fieldKey: 'no_of_steps_for_360_rotation',
        value: 'Minute hand: 180; Hour hand: 180',
      },
      {
        fieldName: 'Resistance',
        fieldKey: 'resistance',
        value: '1.300 ±70 K ohms',
      },
      {
        fieldName: 'Temperature Range',
        fieldKey: 'temperature_range',
        value: '-10 to +55°C',
      },
      {
        fieldName: 'Shock Resistance',
        fieldKey: 'shock_resistance',
        value: 'As per NIHS 91/10',
      },
      {
        fieldName: 'Resistance to Magnetic Field',
        fieldKey: 'resistance_to_magnetic_field',
        value: '18.8 Oe',
      },
    ],
  },

  {
    name: 'T922 A',
    specifications: [
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: '21.000X8.000 mm',
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '2.100 mm',
      },
      {
        fieldName: 'Function',
        fieldKey: 'function',
        value: 'Two Hands',
      },
      {
        fieldName: 'Direction',
        fieldKey: 'direction',
        value: 'Bi-directional',
      },
      {
        fieldName: 'No. of Jewels',
        fieldKey: 'no_of_jewels',
        value: '13',
      },
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '2 hands (independent control)',
      },
      {
        fieldName: 'Angular Rotation Per Pulse',
        fieldKey: 'angular_rotation_per_pulse',
        value: 'Minute hand: 2°; Hour hand: 2°',
      },
      {
        fieldName: 'No. of Steps for 360° Rotation',
        fieldKey: 'no_of_steps_for_360_rotation',
        value: 'Minute hand: 180; Hour hand: 180',
      },
      {
        fieldName: 'Resistance',
        fieldKey: 'resistance',
        value: '1.00 ±70 K ohms',
      },
      {
        fieldName: 'Temperature Range',
        fieldKey: 'temperature_range',
        value: '-10 to +55°C',
      },
      {
        fieldName: 'Shock Resistance',
        fieldKey: 'shock_resistance',
        value: 'As per NIHS 91/10',
      },
      {
        fieldName: 'Resistance to Magnetic Field',
        fieldKey: 'resistance_to_magnetic_field',
        value: '18.8 Oe',
      },
    ],
  },

  {
    name: 'TS102 A',
    specifications: [
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: '19.980X7.000 mm',
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '1.780±70 mm (on CEC)',
      },
      {
        fieldName: 'Function',
        fieldKey: 'function',
        value: 'Two Hands',
      },
      {
        fieldName: 'Direction',
        fieldKey: 'direction',
        value: 'Bi-directional',
      },
      {
        fieldName: 'No. of Jewels',
        fieldKey: 'no_of_jewels',
        value: '5',
      },
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '2 hands (independent control)',
      },
      {
        fieldName: 'Angular Rotation Per Pulse',
        fieldKey: 'angular_rotation_per_pulse',
        value: 'Minute hand: 1°; Hour hand: 1°',
      },
      {
        fieldName: 'No. of Steps for 360° Rotation',
        fieldKey: 'no_of_steps_for_360_rotation',
        value: 'Minute hand: 360; Hour hand: 360',
      },
      {
        fieldName: 'Resistance',
        fieldKey: 'resistance',
        value: '1.00 ±70 K ohms',
      },
      {
        fieldName: 'Temperature Range',
        fieldKey: 'temperature_range',
        value: '-20 to +60°C',
      },
      {
        fieldName: 'Shock Resistance',
        fieldKey: 'shock_resistance',
        value: 'As per NIHS 91/10',
      },
      {
        fieldName: 'Resistance to Magnetic Field',
        fieldKey: 'resistance_to_magnetic_field',
        value: '20 Oe',
      },
    ],
  },

  {
    name: 'TS102 B',
    specifications: [
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: '19.980x12.500 mm',
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '2.330±100 mm (on CEC)',
      },
      {
        fieldName: 'Function',
        fieldKey: 'function',
        value: 'Two Hands',
      },
      {
        fieldName: 'Direction',
        fieldKey: 'direction',
        value: 'Bi-directional',
      },
      {
        fieldName: 'No. of Jewels',
        fieldKey: 'no_of_jewels',
        value: '5',
      },
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '2 hands (independent control)',
      },
      {
        fieldName: 'Angular Rotation Per Pulse',
        fieldKey: 'angular_rotation_per_pulse',
        value: 'Minute hand: 1°; Hour hand: 1°',
      },
      {
        fieldName: 'No. of Steps for 360° Rotation',
        fieldKey: 'no_of_steps_for_360_rotation',
        value: 'Minute hand: 360; Hour hand: 360',
      },
      {
        fieldName: 'Resistance',
        fieldKey: 'resistance',
        value: '1.00 ±70 K ohms',
      },
      {
        fieldName: 'Temperature Range',
        fieldKey: 'temperature_range',
        value: '-20 to +60°C',
      },
      {
        fieldName: 'Shock Resistance',
        fieldKey: 'shock_resistance',
        value: 'As per NIHS 91/10',
      },
      {
        fieldName: 'Resistance to Magnetic Field',
        fieldKey: 'resistance_to_magnetic_field',
        value: '20 Oe',
      },
    ],
  },

  {
    name: 'C3H',
    specifications: [
      {
        fieldName: 'Size',
        fieldKey: 'size',
        value: '19.200x14.644x14.050 mm',
      },
      {
        fieldName: 'Thickness',
        fieldKey: 'thickness',
        value: '2.120±50 mm',
      },
      {
        fieldName: 'Function',
        fieldKey: 'function',
        value: '3 Hands',
      },
      {
        fieldName: 'Direction',
        fieldKey: 'direction',
        value: 'Bi-directional',
      },
      {
        fieldName: 'No. of Jewels',
        fieldKey: 'no_of_jewels',
        value: '6',
      },
      {
        fieldName: 'Functions',
        fieldKey: 'functions',
        value: '3 hands',
      },
      {
        fieldName: 'Angular Rotation Per Pulse',
        fieldKey: 'angular_rotation_per_pulse',
        value: 'Minute hand: 1°; Hour hand: 1°; Second hand: 1°',
      },
      {
        fieldName: 'No. of Steps for 360° Rotation',
        fieldKey: 'no_of_steps_for_360_rotation',
        value: 'Minute hand: 360; Hour hand: 360',
      },
      {
        fieldName: 'Resistance',
        fieldKey: 'resistance',
        value: '1600±70 Ohms',
      },
      {
        fieldName: 'Temperature Range',
        fieldKey: 'temperature_range',
        value: '-10 to +55°C',
      },
      {
        fieldName: 'Shock Resistance',
        fieldKey: 'shock_resistance',
        value: 'As per NIHS 91/10',
      },
      {
        fieldName: 'Resistance to Magnetic Field',
        fieldKey: 'resistance_to_magnetic_field',
        value: '20 Oe',
      },
    ],
  },
];

/* =========================================================
   FILE
========================================================= */

async function seedFile(fileName: string, filePath: string) {
  const existingFile = await prisma.file.findFirst({
    where: {
      fileName,
      deletedAt: null,
    },
  });

  if (existingFile) {
    return existingFile;
  }

  return prisma.file.create({
    data: {
      fileName,
      filePath,
      fileSize: BigInt(0),
    },
  });
}

/* =========================================================
   CATEGORY SEED
========================================================= */

async function seedCategories() {
  console.log('\n📂 Seeding categories...\n');

  const categories: Record<string, any> = {};

  for (const categoryData of CATEGORIES) {
    const file = await seedFile(categoryData.imageName, categoryData.imagePath);

    const category = await prisma.category.upsert({
      where: {
        name: categoryData.name,
      },
      update: {
        shortDescription: categoryData.description,
        filePathId: file.id,
        deletedAt: null,
      },
      create: {
        name: categoryData.name,
        shortDescription: categoryData.description,
        filePathId: file.id,
      },
    });

    categories[categoryData.name] = category;

    console.log(`✅ ${categoryData.name}`);
  }

  return categories;
}

/* =========================================================
   CATEGORY SPECIFICATION SEED
========================================================= */

async function seedCategorySpecifications(categoryId: string, products: ProductSeed[]) {
  const specifications = new Map<string, SpecificationSeed>();

  for (const product of products) {
    for (const specification of product.specifications) {
      if (!specifications.has(specification.fieldKey)) {
        specifications.set(specification.fieldKey, specification);
      }
    }
  }

  const specificationMap = new Map<string, string>();

  let displayOrder = 1;

  for (const specification of specifications.values()) {
    const categorySpecification = await prisma.categorySpecification.upsert({
      where: {
        categoryId_fieldKey: {
          categoryId,
          fieldKey: specification.fieldKey,
        },
      },
      update: {
        fieldName: specification.fieldName,
        fieldType: specification.fieldType ?? SpecificationFieldType.TEXT,
        displayOrder,
        deletedAt: null,
      },
      create: {
        categoryId,
        fieldName: specification.fieldName,
        fieldKey: specification.fieldKey,
        fieldType: specification.fieldType ?? SpecificationFieldType.TEXT,
        isRequired: false,
        isFilterable: specification.isFilterable ?? false,
        displayOrder,
      },
    });

    specificationMap.set(specification.fieldKey, categorySpecification.id);

    displayOrder++;
  }

  return specificationMap;
}

/* =========================================================
   PRODUCT SEED
========================================================= */

async function seedProducts(categoryName: string, categoryId: string, products: ProductSeed[]) {
  console.log(`\n📦 Seeding ${categoryName} products...\n`);

  const specificationMap = await seedCategorySpecifications(categoryId, products);

  const specSheetFile = await seedFile(
    'spec-sheet-placeholder.pdf',
    '/documents/spec-sheet-placeholder.pdf',
  );

  const technicalDrawingFile = await seedFile(
    'technical-drawing-placeholder.pdf',
    '/documents/technical-drawing-placeholder.pdf',
  );

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: {
        id:
          (
            await prisma.product.findFirst({
              where: {
                name: productData.name,
                categoryId,
                deletedAt: null,
              },
              select: {
                id: true,
              },
            })
          )?.id ?? '00000000-0000-0000-0000-000000000000',
      },
      update: {
        name: productData.name,
        status: ProductStatus.PUBLISHED,
        deletedAt: null,
      },
      create: {
        name: productData.name,
        categoryId,
        status: ProductStatus.PUBLISHED,
      },
    });

    // Remove old specification values
    await prisma.productSpecification.deleteMany({
      where: {
        productId: product.id,
      },
    });

    // Create current specification values
    for (const specification of productData.specifications) {
      const specificationId = specificationMap.get(specification.fieldKey);

      if (!specificationId) {
        throw new Error(`Specification "${specification.fieldKey}" not found for ${categoryName}`);
      }

      await prisma.productSpecification.create({
        data: {
          productId: product.id,
          specificationId,
          value: specification.value,
        },
      });
    }

    const productImageFile = await seedFile(
      `${categoryName.toLowerCase()}-${productData.name.toLowerCase().replace(/\s+/g, '-')}.png`,
      `/products/${categoryName.toLowerCase()}-${productData.name.toLowerCase().replace(/\s+/g, '-')}.png`,
    );

    const existingProductImage = await prisma.productImages.findFirst({
      where: {
        productId: product.id,
        filePathId: productImageFile.id,
      },
    });

    if (existingProductImage) {
      await prisma.productImages.update({
        where: { id: existingProductImage.id },
        data: { displayOrder: 1, deletedAt: null },
      });
    } else {
      await prisma.productImages.create({
        data: {
          productId: product.id,
          filePathId: productImageFile.id,
          displayOrder: 1,
        },
      });
    }

    await prisma.productDocument.upsert({
      where: {
        productId_fileType: {
          productId: product.id,
          fileType: ProductFileType.SPEC_SHEET,
        },
      },
      update: {
        fileId: specSheetFile.id,
        deletedAt: null,
      },
      create: {
        productId: product.id,
        fileType: ProductFileType.SPEC_SHEET,
        fileId: specSheetFile.id,
      },
    });

    await prisma.productDocument.upsert({
      where: {
        productId_fileType: {
          productId: product.id,
          fileType: ProductFileType.TECHNICAL_DRAWING,
        },
      },
      update: {
        fileId: technicalDrawingFile.id,
        deletedAt: null,
      },
      create: {
        productId: product.id,
        fileType: ProductFileType.TECHNICAL_DRAWING,
        fileId: technicalDrawingFile.id,
      },
    });

    console.log(`✅ ${productData.name}`);
  }
}

/* =========================================================
   HERO BANNER SEED
========================================================= */

const HERO_BANNER_SLIDES = [
  {
    title: 'Precision in Every Detail',
    description:
      'Engineering excellence and innovative solutions for the watch industry. Trusted by leading brands worldwide.',
    fileName: 'hb1.jpeg',
    filePath: '/Herobanner/hb1.jpeg',
  },
  {
    title: 'Innovation That Moves Time',
    description:
      'Advanced engineering solutions designed for precision, reliability, and performance.',
    fileName: 'hb2.png',
    filePath: '/Herobanner/hb2.png',
  },
];

async function seedHeroBanner() {
  console.log('\n🖼️  Seeding hero banner...\n');

  if (HERO_BANNER_SLIDES.length > MAX_HERO_BANNER_IMAGES) {
    throw new Error(
      `Hero banner supports a maximum of ${MAX_HERO_BANNER_IMAGES} slides, got ${HERO_BANNER_SLIDES.length}`,
    );
  }

  for (const slideData of HERO_BANNER_SLIDES) {
    const file = await seedFile(slideData.fileName, slideData.filePath);

    const existingSlide = await prisma.heroBannerSlide.findFirst({
      where: {
        fileId: file.id,
      },
    });

    if (existingSlide) {
      await prisma.heroBannerSlide.update({
        where: { id: existingSlide.id },
        data: {
          title: slideData.title,
          description: slideData.description,
          deletedAt: null,
        },
      });
    } else {
      await prisma.heroBannerSlide.create({
        data: {
          title: slideData.title,
          description: slideData.description,
          fileId: file.id,
        },
      });
    }

    console.log(`✅ ${slideData.title}`);
  }
}

/* =========================================================
   MAIN
========================================================= */

async function main() {
  console.log('==========================================');
  console.log('🌱 TITAN OEM DATABASE SEED');
  console.log('==========================================');

  try {
    const categories = await seedCategories();

    await seedProducts('Quartz', categories.Quartz.id, QUARTZ_PRODUCTS);

    await seedProducts('Mechanical', categories.Mechanical.id, MECHANICAL_PRODUCTS);

    await seedProducts('Micromotors', categories.Micromotor.id, MICROMOTOR_PRODUCTS);

    await seedHeroBanner();

    console.log('\n==========================================');
    console.log('🎉 DATABASE SEED COMPLETED SUCCESSFULLY');
    console.log('==========================================\n');
  } catch (error) {
    console.error('\n❌ SEED FAILED');
    console.error(error);
    process.exit(1);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
