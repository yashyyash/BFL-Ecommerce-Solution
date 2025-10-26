export interface Category {
  _id: string;
  name: string;
}

export interface ProductAttributes {
  color: string;
  material: string;
  warranty: string;
}

export interface Product {
  _id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  discount: number;
  categoryId: Category;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  numReviews: number;
  attributes: ProductAttributes;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductApiResponse {
  success: boolean;
  total: number;
  page: number;
  pages: number;
  count: number;
  data: Product[];
}
