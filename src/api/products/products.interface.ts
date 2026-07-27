export interface ProductImage {
  id: string;
  filePathId: string;
  filePath: string;
  fileName: string;
  displayOrder: number;
}

export interface ProductSpecification {
  fieldKey: string;
  fieldName: string;
  value: string;
  displayInCard: boolean;
  displayOrder: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  shortDescription: string;
  briefDescription: string | null;
}

export interface Product {
  id: string;
  name: string;
  status: 'PUBLISHED' | 'ARCHIVED' | 'DRAFT';
  categoryId: string;
  description: string;

  category: ProductCategory;

  images: ProductImage[];

  specifications: ProductSpecification[];

  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  message?: string;
  data: Product[];
}

export interface ProductQuery {
  categoryId: string;
}
