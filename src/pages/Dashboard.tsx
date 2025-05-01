import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, Heart, User, CreditCard, MapPin, LogOut, Settings } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      
      try {
        // This is a placeholder for actual Firestore query
        // In a real app, you would fetch real order data
        setOrders([
          {
            id: 'ORD-1234',
            date: '2023-06-15',
            total: 129.99,
            status: 'Delivered',
            items: 2
          },
          {
            id: 'ORD-2345',
            date: '2023-05-28',
            total: 79.50,
            status: 'Processing',
            items: 1
          }
        ]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [currentUser]);
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div>
            <h3 className="text-lg font-medium text-secondary-900 mb-4">Your Orders</h3>
            {loading ? (
              <div className="text-center py-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-2 text-secondary-600">Loading your orders...</p>
              </div>
            ) : orders.length > 0 ? (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <ul className="divide-y divide-secondary-200">
                  {orders.map((order) => (
                    <li key={order.id} className="p-4 hover:bg-secondary-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-secondary-900">{order.id}</p>
                          <p className="text-sm text-secondary-500">Placed on {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-secondary-900">${order.total.toFixed(2)}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <p className="text-sm text-secondary-500">{order.items} item(s)</p>
                        <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                          View details
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <Package className="h-12 w-12 text-secondary-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-secondary-900">No orders yet</h3>
                <p className="mt-1 text-sm text-secondary-500">
                  When you place orders, they will appear here.
                </p>
                <div className="mt-6">
                  <Link
                    to="/products"
                    className="btn btn-primary"
                  >
                    Start shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'wishlist':
        return (
          <div>
            <h3 className="text-lg font-medium text-secondary-900 mb-4">Your Wishlist</h3>
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <Heart className="h-12 w-12 text-secondary-400 mx-auto" />
              <h3 className="mt-2 text-sm font-medium text-secondary-900">Your wishlist is empty</h3>
              <p className="mt-1 text-sm text-secondary-500">
                Save items you like to your wishlist and they will show up here.
              </p>
              <div className="mt-6">
                <Link
                  to="/products"
                  className="btn btn-primary"
                >
                  Browse products
                </Link>
              </div>
            </div>
          </div>
        );
        
      case 'profile':
        return (
          <div>
            <h3 className="text-lg font-medium text-secondary-900 mb-4">Your Profile</h3>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 pb-6 border-b border-secondary-200">
                <div className="flex-shrink-0 bg-primary-100 h-16 w-16 rounded-full flex items-center justify-center text-primary-600 text-xl font-semibold mb-4 sm:mb-0 sm:mr-6">
                  {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-secondary-900">{currentUser?.displayName || 'User'}</h4>
                  <p className="text-secondary-600">{currentUser?.email}</p>
                  <p className="text-sm text-secondary-500 mt-1">Member since {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-secondary-900 flex items-center">
                    <User className="h-5 w-5 mr-2 text-secondary-500" />
                    Personal Information
                  </h4>
                  <div className="mt-3 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700">Full Name</label>
                      <input
                        type="text"
                        defaultValue={currentUser?.displayName || ''}
                        className="mt-1 input"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700">Email</label>
                      <input
                        type="email"
                        value={currentUser?.email || ''}
                        readOnly
                        className="mt-1 input bg-secondary-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700">Phone</label>
                      <input
                        type="tel"
                        className="mt-1 input"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-secondary-900 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-secondary-500" />
                    Shipping Address
                  </h4>
                  <div className="mt-3 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700">Address Line 1</label>
                        <input
                          type="text"
                          className="mt-1 input"
                          placeholder="Street address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700">Address Line 2</label>
                        <input
                          type="text"
                          className="mt-1 input"
                          placeholder="Apt, suite, etc. (optional)"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700">City</label>
                        <input
                          type="text"
                          className="mt-1 input"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700">State</label>
                        <input
                          type="text"
                          className="mt-1 input"
                          placeholder="State/Province"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700">ZIP</label>
                        <input
                          type="text"
                          className="mt-1 input"
                          placeholder="ZIP / Postal Code"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button type="button" className="btn btn-primary px-6">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-primary-100 h-12 w-12 rounded-full flex items-center justify-center text-primary-600 text-lg font-semibold">
                  {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                </div>
                <div className="ml-3">
                  <h2 className="text-lg font-semibold text-secondary-900 truncate">
                    {currentUser?.displayName || 'Welcome'}
                  </h2>
                  <p className="text-sm text-secondary-500 truncate">{currentUser?.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'orders'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  <Package className="mr-3 h-5 w-5 text-secondary-400" />
                  Orders
                </button>
                
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'wishlist'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  <Heart className="mr-3 h-5 w-5 text-secondary-400" />
                  Wishlist
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'profile'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  <User className="mr-3 h-5 w-5 text-secondary-400" />
                  Profile
                </button>
                
                <button
                  onClick={logout}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-secondary-700 hover:bg-secondary-50"
                >
                  <LogOut className="mr-3 h-5 w-5 text-secondary-400" />
                  Sign Out
                </button>
              </nav>
            </div>
            
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Settings className="h-6 w-6 text-primary-500" />
                <h3 className="ml-2 text-sm font-medium text-primary-800">Need Help?</h3>
              </div>
              <p className="mt-2 text-sm text-primary-700">
                Contact our customer support team for assistance with your orders or account.
              </p>
              <Link
                to="/contact"
                className="mt-3 text-sm font-medium text-primary-700 hover:text-primary-800 inline-flex items-center"
              >
                Contact Support
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="mt-8 lg:mt-0 lg:col-span-9">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
 