import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User, LogOut, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { itemCount } = useCart();
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-secondary-600 lg:hidden"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">KYLO</span>
              <span className="text-2xl font-light text-secondary-800">_SHOP</span>
            </Link>
            <div className="hidden lg:ml-10 lg:flex lg:items-center lg:space-x-8">
              <Link to="/" className="text-secondary-600 hover:text-secondary-900 px-3 py-2">Home</Link>
              <Link to="/products" className="text-secondary-600 hover:text-secondary-900 px-3 py-2">Shop</Link>
              <Link to="/about" className="text-secondary-600 hover:text-secondary-900 px-3 py-2">About</Link>
              <Link to="/contact" className="text-secondary-600 hover:text-secondary-900 px-3 py-2">Contact</Link>
              {isAdmin && (
                <Link to="/admin" className="text-primary-600 hover:text-primary-800 px-3 py-2 font-medium">Admin</Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-secondary-600 hover:text-secondary-900"
              onClick={toggleSearch}
            >
              <Search className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="p-2 text-secondary-600 hover:text-secondary-900 flex items-center"
              >
                <User className="h-5 w-5" />
                {currentUser && (
                  <span className="ml-1 hidden md:inline-block text-sm truncate max-w-[100px]">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                )}
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 text-sm text-secondary-700 border-b border-secondary-200">
                        <p className="font-medium">{currentUser.displayName || 'User'}</p>
                        <p className="truncate">{currentUser.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </div>
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                      >
                        <div className="flex items-center">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <Link to="/cart" className="p-2 text-secondary-600 hover:text-secondary-900 relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center bg-primary-600 text-white rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-secondary-900 bg-opacity-75 z-50" onClick={toggleMenu}></div>
        <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50 flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={toggleMenu}>
              <span className="text-2xl font-bold text-primary-600">KYLO</span>
              <span className="text-2xl font-light text-secondary-800">_SHOP</span>
            </Link>
            <button type="button" className="p-2" onClick={toggleMenu}>
              <X className="h-6 w-6 text-secondary-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
            <Link to="/" className="block px-3 py-2 text-secondary-600 hover:text-secondary-900" onClick={toggleMenu}>Home</Link>
            <Link to="/products" className="block px-3 py-2 text-secondary-600 hover:text-secondary-900" onClick={toggleMenu}>Shop</Link>
            <Link to="/about" className="block px-3 py-2 text-secondary-600 hover:text-secondary-900" onClick={toggleMenu}>About</Link>
            <Link to="/contact" className="block px-3 py-2 text-secondary-600 hover:text-secondary-900" onClick={toggleMenu}>Contact</Link>
            
            {currentUser ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-secondary-600 hover:text-secondary-900" onClick={toggleMenu}>Dashboard</Link>
                {isAdmin && (
                  <Link to="/admin" className="block px-3 py-2 text-primary-600 font-medium hover:text-primary-800" onClick={toggleMenu}>Admin Dashboard</Link>
                )}
                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 text-secondary-600 hover:text-secondary-900">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-secondary-600 hover:text-secondary-900" onClick={toggleMenu}>Sign In</Link>
                <Link to="/register" className="block px-3 py-2 text-secondary-600 hover:text-secondary-900" onClick={toggleMenu}>Create Account</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search dropdown */}
      <div className={`${isSearchOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white shadow-md z-30 p-4`}>
        <div className="max-w-7xl mx-auto flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="input flex-grow"
          />
          <button className="ml-2 btn btn-primary">Search</button>
          <button className="ml-2 text-secondary-600" onClick={toggleSearch}>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
 