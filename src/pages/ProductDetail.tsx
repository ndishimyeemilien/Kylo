import  { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Truck, RefreshCw, Check, Star, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, the product you are looking for does not exist.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-secondary-600 hover:text-secondary-900">Home</Link>
            </li>
            <span>/</span>
            <li>
              <Link to="/products" className="text-secondary-600 hover:text-secondary-900">Products</Link>
            </li>
            <span>/</span>
            <li>
              <Link 
                to={`/products?category=${product.category.toLowerCase()}`} 
                className="text-secondary-600 hover:text-secondary-900"
              >
                {product.category}
              </Link>
            </li>
            <span>/</span>
            <li className="text-secondary-900 font-medium truncate">
              {product.name}
            </li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-semibold text-secondary-900">{product.name}</h1>
            
            <div className="mt-2 flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-secondary-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-secondary-600">{product.rating} ({product.reviews} reviews)</span>
            </div>
            
            <div className="mt-4 flex items-center">
              {product.isOnSale && product.originalPrice ? (
                <>
                  <span className="text-2xl font-bold text-primary-600">${product.price.toFixed(2)}</span>
                  <span className="ml-2 text-secondary-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-secondary-900">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <div className="mt-6 border-t pt-6 space-y-6">
              {/* Colors */}
              {product.colors && (
                <div>
                  <h3 className="text-sm font-medium text-secondary-900">Color</h3>
                  <div className="mt-2 flex space-x-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative p-0.5 rounded-full flex items-center justify-center ${
                          selectedColor === color ? 'ring-2 ring-primary-500' : ''
                        }`}
                      >
                        <span className="sr-only">{color}</span>
                        <span 
                          className="h-8 w-8 rounded-full border" 
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Sizes */}
              {product.sizes && (
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-secondary-900">Size</h3>
                    <Link to="/size-guide" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                      Size guide
                    </Link>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-3 border rounded-md text-sm font-medium ${
                          selectedSize === size
                            ? 'bg-primary-600 border-primary-600 text-white'
                            : 'border-secondary-300 text-secondary-900 hover:bg-secondary-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium text-secondary-900">Quantity</h3>
                <div className="mt-2 flex rounded-md">
                  <button 
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="relative h-10 w-10 flex items-center justify-center rounded-l-md border border-r-0 border-secondary-300 bg-secondary-50 text-secondary-500 hover:bg-secondary-100"
                  >
                    <span className="sr-only">Decrease</span>
                    <span className="text-lg font-medium">−</span>
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="h-10 w-16 border-secondary-300 text-center"
                  />
                  <button 
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="relative h-10 w-10 flex items-center justify-center rounded-r-md border border-l-0 border-secondary-300 bg-secondary-50 text-secondary-500 hover:bg-secondary-100"
                  >
                    <span className="sr-only">Increase</span>
                    <span className="text-lg font-medium">+</span>
                  </button>
                </div>
              </div>
              
              {/* Add to cart */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 btn btn-primary py-3 flex items-center justify-center"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-md py-3 px-3 border border-secondary-300 text-secondary-600 hover:bg-secondary-50"
                >
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </div>
            
            {/* Product Features */}
            <div className="mt-8 border-t pt-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Truck className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-secondary-900">Free Shipping</h4>
                    <p className="text-sm text-secondary-600">On orders over $50</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <RefreshCw className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-secondary-900">Free Returns</h4>
                    <p className="text-sm text-secondary-600">30-day money-back guarantee</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-secondary-900">In Stock</h4>
                    <p className="text-sm text-secondary-600">Available for immediate shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Description */}
        <div className="mt-12 lg:mt-16 border-t pt-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            <p className="text-secondary-700">{product.description}</p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-secondary-700">
                  <li>Premium quality materials</li>
                  <li>Carefully crafted for comfort and durability</li>
                  <li>Modern design that complements any style</li>
                  <li>Easy care and maintenance</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Specifications</h3>
                <div className="space-y-1">
                  <div className="flex">
                    <span className="w-24 flex-shrink-0 text-secondary-500">Material:</span>
                    <span className="text-secondary-700">Premium {product.category === 'Men' || product.category === 'Women' ? 'Cotton' : 'Fabric'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 flex-shrink-0 text-secondary-500">Care:</span>
                    <span className="text-secondary-700">Machine washable</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 flex-shrink-0 text-secondary-500">Origin:</span>
                    <span className="text-secondary-700">Imported</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 flex-shrink-0 text-secondary-500">Item No.:</span>
                    <span className="text-secondary-700">KS-{product.id.toString().padStart(4, '0')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Newsletter />
    </div>
  );
};

export default ProductDetail;
 