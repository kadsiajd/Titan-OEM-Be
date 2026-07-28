export interface Category {
  id: string;
  name: string;
  shortDescription: string;
  briefDescription?: string | null;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
}
