export interface ProductField {
  label: string;
  value: string;
}

export interface ProductDetailSection {
  section: string;
  fields: ProductField[];
}

export interface Product {
  id: string;
  name: string;
  description: string;

  categoryId: string;
  category: string;

  imageUrl: string;

  specificationSheetUrl: string;
  technicalDrawingUrl: string;

  overview: ProductField[];

  productDetails?: ProductDetailSection[];
}
export interface ProductQuery {
  category: string;
}