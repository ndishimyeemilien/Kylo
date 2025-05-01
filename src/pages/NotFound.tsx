import  { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="text-2xl font-semibold text-secondary-900 mt-4">Page Not Found</h2>
        <p className="mt-4 text-secondary-600">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, 
          deleted, or might never have existed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn btn-primary flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Link to="/products" className="btn btn-secondary flex items-center">
            <Search className="mr-2 h-4 w-4" />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
 