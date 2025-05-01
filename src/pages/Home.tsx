import  { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import Newsletter from '../components/Newsletter';
import { products, categories } from '../data/products';

const Home = () => {
  // Featured products - show the first 4 products
  const featuredProducts = products.slice(0, 4);
  
  // New arrivals - products marked as new
  const newArrivals = products.filter(product => product.isNew).slice(0, 3);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXNoaW9uJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NDYwMzM4MTR8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
            alt="Modern clothing store"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold">Redefine Your Style</h1>
            <p className="mt-4 text-lg text-white/80">
              Discover the latest trends and timeless classics at Kylo_Shop. 
              Premium fashion for the modern lifestyle.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="btn btn-primary">
                Shop Now
              </Link>
              <Link to="/about" className="btn bg-white/10 text-white hover:bg-white/20">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-secondary-900">Shop by Category</h2>
            <p className="mt-4 text-secondary-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-semibold text-secondary-900">Featured Products</h2>
              <p className="mt-2 text-secondary-600">Hand-picked favorites for you</p>
            </div>
            <Link to="/products" className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotion Banner */}
      <section className="py-12 bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Summer Sale Now On!</h2>
          <p className="mt-4 text-lg text-white/90">Up to 50% off selected items. Limited time only.</p>
          <Link to="/products?tag=sale" className="mt-6 inline-block btn bg-white text-primary-700 hover:bg-white/90">
            Shop the Sale
          </Link>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-semibold text-secondary-900">New Arrivals</h2>
              <p className="mt-2 text-secondary-600">Just hit our shelves</p>
            </div>
            <Link to="/products?tag=new" className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Fashion Feature Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBmYXNoaW9uJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NDYwMzM4MTR8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
                alt="Woman in yellow tracksuit" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold text-secondary-900 mb-4">Express Your Unique Style</h2>
              <p className="text-secondary-700 mb-6">
                At Kylo_Shop, we believe fashion is a form of self-expression. Our carefully curated collection 
                blends contemporary trends with timeless styles, allowing you to create a wardrobe that truly 
                reflects your personality.
              </p>
              <ul className="space-y-3 text-secondary-700 mb-8">
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center mr-2 flex-shrink-0">✓</span>
                  <span>Premium quality materials that last</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center mr-2 flex-shrink-0">✓</span>
                  <span>Ethically sourced and produced</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center mr-2 flex-shrink-0">✓</span>
                  <span>Unique designs you won't find elsewhere</span>
                </li>
              </ul>
              <Link to="/products" className="btn btn-primary">
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Instagram Feed Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-secondary-900">Follow Us on Instagram</h2>
            <p className="mt-2 text-secondary-600">@kylo_shop</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBmYXNoaW9uJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NDYwMzM4MTR8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
              alt="Instagram post" 
              className="w-full h-64 object-cover rounded-md hover:opacity-90 transition-opacity"
            />
            <img 
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBmYXNoaW9uJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NDYwMzM4MTR8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
              alt="Instagram post" 
              className="w-full h-64 object-cover rounded-md hover:opacity-90 transition-opacity"
            />
            <img 
              src="https://images.unsplash.com/photo-1573787300288-9a1620beae88?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBmYXNoaW9uJTIwc3RvcmV8ZW58MHx8fHwxNzQ2MDMzODE0fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
              alt="Instagram post" 
              className="w-full h-64 object-cover rounded-md hover:opacity-90 transition-opacity"
            />
            <img 
              src="https://images.unsplash.com/photo-1634316164679-dabb68a88a3c?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjBmYXNoaW9uJTIwc3RvcmV8ZW58MHx8fHwxNzQ2MDMzODE0fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
              alt="Instagram post" 
              className="w-full h-64 object-cover rounded-md hover:opacity-90 transition-opacity"
            />
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;
 