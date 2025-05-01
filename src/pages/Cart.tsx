import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Truck, ChevronRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toLowerCase() === 'discount10') {
      setPromoApplied(true);
    }
  };
  
  const subtotal = getTotal();
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal - discount + shipping;
  
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-secondary-400" />
        <h2 className="mt-4 text-2xl font-semibold text-secondary-900">Your cart is empty</h2>
        <p className="mt-2 text-secondary-600">Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" className="mt-6 inline-block btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold text-secondary-900 mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <ul className="divide-y divide-secondary-200">
              {items.map(item => (
                <li key={item.product.id} className="p-6 flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 w-24 h-24 bg-secondary-100 rounded-md overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  
                  <div className="sm:ml-6 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <Link 
                          to={`/products/${item.product.id}`}
                          className="text-lg font-medium text-secondary-900 hover:text-primary-600"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 text-sm text-secondary-600">
                          {item.product.category}
                          {item.product.colors && item.product.colors[0] && ` • ${item.product.colors[0]}`}
                          {item.product.sizes && item.product.sizes[0] && ` • Size ${item.product.sizes[0]}`}
                        </p>
                      </div>
                      <p className="text-lg font-medium text-secondary-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center border border-secondary-300 rounded">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 text-secondary-600 hover:bg-secondary-50"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-secondary-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 text-secondary-600 hover:bg-secondary-50"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-secondary-600 hover:text-secondary-900"
                      >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-secondary-200 p-6">
              <Link 
                to="/products" 
                className="text-primary-600 hover:text-primary-800 flex items-center"
              >
                <ChevronRight className="h-4 w-4 mr-1 transform rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm divide-y divide-secondary-200">
            <div className="p-6">
              <h2 className="text-lg font-medium text-secondary-900">Order Summary</h2>
              
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-secondary-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-secondary-900">${subtotal.toFixed(2)}</dd>
                </div>
                
                {promoApplied && (
                  <div className="flex items-center justify-between text-primary-600">
                    <dt className="text-sm">Discount (10%)</dt>
                    <dd className="text-sm font-medium">-${discount.toFixed(2)}</dd>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-secondary-600">Shipping</dt>
                  <dd className="text-sm font-medium text-secondary-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </dd>
                </div>
                
                <div className="border-t border-secondary-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-secondary-900">Order total</dt>
                  <dd className="text-base font-medium text-secondary-900">${total.toFixed(2)}</dd>
                </div>
              </dl>
              
              {subtotal < 50 && (
                <div className="mt-6 flex items-center bg-blue-50 text-blue-800 p-3 rounded-md">
                  <Truck className="h-5 w-5 flex-shrink-0" />
                  <p className="ml-2 text-sm">
                    Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <form onSubmit={applyPromoCode}>
                <label htmlFor="promo-code" className="block text-sm font-medium text-secondary-700">
                  Promo Code
                </label>
                <div className="mt-1 flex space-x-2">
                  <input
                    type="text"
                    id="promo-code"
                    name="promo-code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="input text-sm"
                    placeholder="Enter code"
                  />
                  <button
                    type="submit"
                    className="btn btn-secondary text-sm"
                    disabled={promoApplied}
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="mt-2 text-sm text-primary-600">Promo code applied successfully!</p>
                )}
              </form>
            </div>
            
            <div className="p-6">
              <Link
                to="/checkout"
                className="w-full btn btn-primary py-3 text-center"
              >
                Checkout
              </Link>
              
              <div className="mt-4 text-xs text-secondary-500 text-center">
                <p>Secure Checkout</p>
                <p className="mt-1">
                  We accept all major credit cards, PayPal, and Apple Pay
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
 