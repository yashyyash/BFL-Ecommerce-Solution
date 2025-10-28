// Based on your product-list.component.html
export interface Product {
  _id: string;
  name: string;
  price: number;
  brand: string;
  images: string[];
  discount: number;
  stock: number;
  rating: number;
  isFeatured: boolean;
  categoryId: { // Assuming categoryId is an object
    name: string;
  };
  // ... any other properties
}

export interface CartItem {
  product: Product;
  quantity: number;
}
