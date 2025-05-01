export  interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  inventory: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isOnSale?: boolean;
  sizes?: string[];
  colors?: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
  itemCount: number;
}
 