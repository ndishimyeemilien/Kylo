import  { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-5">
              <span className="text-2xl font-bold text-primary-400">KYLO</span>
              <span className="text-2xl font-light text-white">_SHOP</span>
            </Link>
            <p className="text-secondary-300 text-sm">
              Premium fashion clothing and accessories for the modern lifestyle.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-secondary-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=men" className="text-secondary-400 hover:text-white">Men</Link></li>
              <li><Link to="/products?category=women" className="text-secondary-400 hover:text-white">Women</Link></li>
              <li><Link to="/products?category=kids" className="text-secondary-400 hover:text-white">Kids</Link></li>
              <li><Link to="/products?category=accessories" className="text-secondary-400 hover:text-white">Accessories</Link></li>
              <li><Link to="/products?tag=sale" className="text-secondary-400 hover:text-white">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-secondary-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-secondary-400 hover:text-white">Contact</Link></li>
              <li><Link to="/careers" className="text-secondary-400 hover:text-white">Careers</Link></li>
              <li><Link to="/stores" className="text-secondary-400 hover:text-white">Stores</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-secondary-400 hover:text-white">FAQ</Link></li>
              <li><Link to="/shipping" className="text-secondary-400 hover:text-white">Shipping & Returns</Link></li>
              <li><Link to="/terms" className="text-secondary-400 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-secondary-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-800 mt-12 pt-8 text-center text-secondary-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Kylo_Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 