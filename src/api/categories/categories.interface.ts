export interface Category {
  id: string;
  name: string;
  shortDescription: string;
  briefDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
}
