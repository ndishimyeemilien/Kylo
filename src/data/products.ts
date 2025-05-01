import  { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 39.99,
    originalPrice: 49.99,
    description: "Luxurious cotton t-shirt with a comfortable fit and modern design. Perfect for everyday wear.",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    category: "Men",
    tags: ["t-shirt", "cotton", "premium"],
    inventory: 25,
    rating: 4.8,
    reviews: 124,
    isOnSale: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"]
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 89.99,
    description: "Modern slim fit jeans with stretch comfort. Classic five-pocket styling with a zip fly.",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    category: "Men",
    tags: ["jeans", "slim fit", "denim"],
    inventory: 18,
    rating: 4.5,
    reviews: 86,
    sizes: ["30", "32", "34", "36"],
    colors: ["Blue", "Black", "Grey"]
  },
  {
    id: 3,
    name: "Floral Summer Dress",
    price: 79.99,
    description: "Beautiful floral dress perfect for summer days. Features a flattering fit and flare silhouette.",
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    category: "Women",
    tags: ["dress", "floral", "summer"],
    inventory: 12,
    rating: 4.9,
    reviews: 42,
    isNew: true,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue", "Pink"]
  },
  {
    id: 4,
    name: "Leather Ankle Boots",
    price: 149.99,
    originalPrice: 199.99,
    description: "Classic leather ankle boots with a comfortable heel and durable construction.",
    images: ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    category: "Women",
    tags: ["boots", "leather", "shoes"],
    inventory: 8,
    rating: 4.7,
    reviews: 63,
    isOnSale: true,
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Black", "Brown"]
  },
  {
    id: 5,
    name: "Oversized Hoodie",
    price: 59.99,
    description: "Comfortable oversized hoodie with a kangaroo pocket and adjustable hood.",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    category: "Unisex",
    tags: ["hoodie", "casual", "comfortable"],
    inventory: 30,
    rating: 4.6,
    reviews: 92,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Grey", "Black", "Green"]
  },
  {
    id: 6,
    name: "Kids Dinosaur T-Shirt",
    price: 24.99,
    description: "Fun dinosaur print t-shirt for kids. Made from soft, comfortable cotton.",
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    category: "Kids",
    tags: ["t-shirt", "dinosaur", "kids"],
    inventory: 15,
    rating: 4.9,
    reviews: 28,
    isNew: true,
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: ["Blue", "Green", "Red"]
  },
  {
    id: 7,
    name: "Wool Blend Coat",
    price: 199.99,
    originalPrice: 259.99,
    description: "Elegant wool blend coat with a classic design. Perfect for cold winter days.",
    images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    category: "Women",
    tags: ["coat", "wool", "winter"],
    inventory: 5,
    rating: 4.8,
    reviews: 37,
    isOnSale: true,
    sizes: ["S", "M", "L"],
    colors: ["Camel", "Black", "Grey"]
  },
  {
    id: 8,
    name: "Sports Performance Tee",
    price: 34.99,
    description: "High-performance t-shirt designed for sports and active lifestyles. Features moisture-wicking technology.",
    images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    category: "Men",
    tags: ["sports", "performance", "active"],
    inventory: 22,
    rating: 4.7,
    reviews: 54,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Red", "Grey"]
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Men",
    image: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    itemCount: 24
  },
  {
    id: 2,
    name: "Women",
    image: "https://images.unsplash.com/photo-1525450824786-227cbef70703?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    itemCount: 36
  },
  {
    id: 3,
    name: "Kids",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    itemCount: 18
  },
  {
    id: 4,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    itemCount: 42
  }
];
 