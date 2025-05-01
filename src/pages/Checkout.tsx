import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const subtotal = getTotal();
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      navigate('/checkout/success');
    }, 1500);
  };
  
  if (formSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Check className="h-6 w-6 text-primary-600" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-secondary-900">Processing Your Order</h2>
            <p className="mt-2 text-secondary-600">Please wait while we process your payment...</p>
            <div className="mt-6 h-2 w-full bg-secondary-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary-600 animate-[progress_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (items.length === 0) {
    navigate('/');
    return null;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold text-secondary-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-secondary-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 input"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 input"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-secondary-900 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-secondary-700">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 input"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-secondary-700">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-secondary-700">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="mt-1 input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-secondary-700">
                      ZIP/Postal Code *
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className="mt-1 input"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-secondary-700">
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 input"
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-secondary-900 mb-4">Payment Method</h2>
              <div className="border border-secondary-300 rounded-md p-4 mb-4">
                <div className="flex items-center">
                  <input
                    id="card"
                    name="paymentMethod"
                    type="radio"
                    className="h-4 w-4 text-primary-600 border-secondary-300 focus:ring-primary-500"
                    checked
                    readOnly
                  />
                  <label htmlFor="card" className="ml-3 block text-sm font-medium text-secondary-700">
                    Credit Card
                  </label>
                  <CreditCard className="ml-auto h-5 w-5 text-secondary-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="cardName" className="block text-sm font-medium text-secondary-700">
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className="mt-1 input"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-secondary-700">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="mt-1 input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cardExpiry" className="block text-sm font-medium text-secondary-700">
                    Expiration Date *
                  </label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="mt-1 input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cardCvc" className="block text-sm font-medium text-secondary-700">
                    CVC *
                  </label>
                  <input
                    type="text"
                    id="cardCvc"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleChange}
                    placeholder="XXX"
                    className="mt-1 input"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="lg:hidden">
              <button
                type="submit"
                className="w-full btn btn-primary py-3"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-medium text-secondary-900">Order Summary</h2>
              <p className="mt-1 text-sm text-secondary-600">{items.length} item(s)</p>
            </div>
            
            <ul className="divide-y divide-secondary-200">
              {items.map(item => (
                <li key={item.product.id} className="p-4 flex">
                  <div className="flex-shrink-0 w-16 h-16 bg-secondary-100 rounded-md overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-sm font-medium text-secondary-900">{item.product.name}</h3>
                      <p className="mt-1 text-xs text-secondary-500">{item.product.category}</p>
                    </div>
                    <div className="flex-1 flex items-end justify-between">
                      <p className="text-sm text-secondary-500">Qty {item.quantity}</p>
                      <p className="text-sm font-medium text-secondary-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="p-6 border-t border-secondary-200">
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-secondary-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-secondary-900">${subtotal.toFixed(2)}</dd>
                </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-secondary-600">Shipping</dt>
                  <dd className="text-sm font-medium text-secondary-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </dd>
                </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-secondary-600">Taxes</dt>
                  <dd className="text-sm font-medium text-secondary-900">${tax.toFixed(2)}</dd>
                </div>
                
                <div className="border-t border-secondary-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-secondary-900">Total</dt>
                  <dd className="text-base font-medium text-secondary-900">${total.toFixed(2)}</dd>
                </div>
              </dl>
              
              <div className="mt-6 hidden lg:block">
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full btn btn-primary py-3"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
 