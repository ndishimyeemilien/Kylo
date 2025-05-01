import  { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Product } from '../types';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const categoryParam = searchParams.get('category');
  const tagParam = searchParams.get('tag');
  
  useEffect(() => {
    let filtered = [...products];
    
    // Apply URL params first
    if (categoryParam) {
      const category = categoryParam.toLowerCase();
      filtered = filtered.filter(p => p.category.toLowerCase() === category);
      if (!selectedCategories.includes(categoryParam)) {
        setSelectedCategories([...selectedCategories, categoryParam]);
      }
    }
    
    if (tagParam) {
      const tag = tagParam.toLowerCase();
      if (tag === 'sale') {
        filtered = filtered.filter(p => p.isOnSale);
      } else if (tag === 'new') {
        filtered = filtered.filter(p => p.isNew);
      } else {
        filtered = filtered.filter(p => p.tags.some(t => t.toLowerCase() === tag));
      }
    }
    
    // Apply selected filters
    if (selectedCategories.length > 0 && !categoryParam) {
      filtered = filtered.filter(p => 
        selectedCategories.some(cat => p.category.toLowerCase() === cat.toLowerCase())
      );
    }
    
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes?.some(size => selectedSizes.includes(size))
      );
    }
    
    // Apply price range
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [categoryParam, tagParam, selectedCategories, selectedSizes, priceRange]);
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceRange([0, 300]);
  };
  
  const allCategories = Array.from(new Set(products.map(p => p.category)));
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes || [])));
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  Clear All
                </button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="space-y-2">
                  {allCategories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 text-primary-600 rounded border-secondary-300"
                      />
                      <span className="ml-2 text-secondary-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-secondary-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Sizes */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Sizes</h4>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`h-8 min-w-8 px-2 flex items-center justify-center rounded-md text-sm ${
                        selectedSizes.includes(size) 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">
              {categoryParam 
                ? `${categoryParam} Collection` 
                : tagParam === 'sale' 
                  ? 'Sale Items'
                  : tagParam === 'new'
                    ? 'New Arrivals'
                    : 'All Products'}
            </h1>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden btn btn-secondary flex items-center"
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </button>
          </div>
          
          {/* Active filters */}
          {(selectedCategories.length > 0 || selectedSizes.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map(cat => (
                <span key={cat} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                  {cat}
                  <button onClick={() => toggleCategory(cat)} className="ml-1 p-1">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              
              {selectedSizes.map(size => (
                <span key={size} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                  Size: {size}
                  <button onClick={() => toggleSize(size)} className="ml-1 p-1">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary-600">No products found matching the selected filters.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 btn btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile filters drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-secondary-900 bg-opacity-50" onClick={() => setIsFilterOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 max-w-full w-full sm:w-96 bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="h-5 w-5 text-secondary-600" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="space-y-2">
                  {allCategories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 text-primary-600 rounded border-secondary-300"
                      />
                      <span className="ml-2 text-secondary-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-secondary-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Sizes */}
              <div>
                <h4 className="font-medium mb-2">Sizes</h4>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`h-8 min-w-8 px-2 flex items-center justify-center rounded-md text-sm ${
                        selectedSizes.includes(size) 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t flex gap-4">
              <button 
                onClick={clearFilters}
                className="flex-1 btn btn-secondary"
              >
                Clear All
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 btn btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
 