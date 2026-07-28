export interface ProductImage {
  id: string;
  filePathId: string;
  filePath: string;
  imageUrl: string;
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

export interface ProductDocument {
  id: string;
  fileId: string;
  fileType: 'SPEC_SHEET' | 'TECHNICAL_DRAWING';
  fileName: string;
  fileUrl: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  shortDescription: string;
  briefDescription: string | null;
  imageUrl: string;
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

  documents: ProductDocument[];

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

export interface GetAllProductsQuery {
  categoryId?: string;
  search?: string;
}
