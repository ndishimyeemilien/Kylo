import  { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  Home, 
  LogOut, 
  Menu, 
  X, 
  DollarSign, 
  BarChart2, 
  Tag, 
  Bell
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Orders', href: '/admin/orders', icon: Package },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
    { name: 'Discounts', href: '/admin/discounts', icon: Tag },
  ];
  
  return (
    <div className="h-screen flex overflow-hidden bg-secondary-50">
      {/* Mobile sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 flex ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-secondary-900 bg-opacity-75 transition-opacity" onClick={() => setSidebarOpen(false)}></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-secondary-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-shrink-0 flex items-center px-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-white">KYLO</span>
              <span className="text-xl font-light text-primary-300">_ADMIN</span>
            </Link>
          </div>
          
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? 'bg-secondary-900 text-white'
                        : 'text-secondary-300 hover:bg-secondary-700 hover:text-white'
                    }`}
                  >
                    <item.icon 
                      className={`mr-4 h-6 w-6 ${
                        isActive ? 'text-primary-400' : 'text-secondary-400 group-hover:text-secondary-300'
                      }`} 
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-secondary-700 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center group w-full"
            >
              <div className="ml-3">
                <p className="text-base font-medium text-white">Back to Store</p>
                <p className="text-sm font-medium text-secondary-400 group-hover:text-secondary-300">
                  Exit Admin Panel
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-secondary-800">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-white">KYLO</span>
                <span className="text-xl font-light text-primary-300">_ADMIN</span>
              </Link>
            </div>
            
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 bg-secondary-800 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-secondary-900 text-white'
                          : 'text-secondary-300 hover:bg-secondary-700 hover:text-white'
                      }`}
                    >
                      <item.icon 
                        className={`mr-3 h-6 w-6 ${
                          isActive ? 'text-primary-400' : 'text-secondary-400 group-hover:text-secondary-300'
                        }`} 
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              
              <div className="border-t border-secondary-700 p-4 bg-secondary-800">
                <button
                  onClick={handleLogout}
                  className="flex items-center group w-full"
                >
                  <LogOut className="h-6 w-6 text-secondary-400 group-hover:text-secondary-300" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Back to Store</p>
                    <p className="text-xs font-medium text-secondary-400 group-hover:text-secondary-300">
                      Exit Admin Panel
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6 text-secondary-600" />
          </button>
          
          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-white p-1 rounded-full text-secondary-400 hover:text-secondary-600">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
              
              <Link to="/" className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                View Store
              </Link>
            </div>
          </div>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
 