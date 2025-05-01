import  { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {product.isNew && (
          <span className="badge badge-new absolute top-2 left-2">
            NEW
          </span>
        )}
        
        {product.isOnSale && (
          <span className="badge badge-sale absolute top-2 right-2">
            SALE
          </span>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between">
            <button 
              onClick={() => addToCart(product)}
              className="btn btn-primary text-sm flex items-center"
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Add to Cart
            </button>
            <button className="p-2 bg-white rounded-full text-secondary-800 hover:text-primary-600">
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-secondary-900 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-1 flex items-center">
          {product.isOnSale && product.originalPrice ? (
            <>
              <span className="text-primary-600 font-semibold">${product.price.toFixed(2)}</span>
              <span className="ml-2 text-secondary-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-secondary-900 font-semibold">${product.price.toFixed(2)}</span>
          )}
          
          <div className="ml-auto flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-secondary-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-secondary-500 ml-1">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
 