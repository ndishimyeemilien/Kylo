import  { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  X, 
  Upload,
  Image,
  Tag
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { Product } from '../../types';

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New product form state
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setDescription] = useState('');
  const [productCategory, setCategory] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productInventory, setInventory] = useState('');
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  
  // For demo, we'll just use products from context
  useEffect(() => {
    // In a real app, this would fetch from Firebase
    import('../../data/products').then(module => {
      setProducts(module.products);
      setLoading(false);
    });
  }, []);
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const openAddModal = () => {
    setEditingProduct(null);
    resetForm();
    setIsModalOpen(true);
  };
  
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductPrice(product.price.toString());
    setDescription(product.description);
    setCategory(product.category);
    setInventory(product.inventory.toString());
    setIsModalOpen(true);
  };
  
  const resetForm = () => {
    setProductName('');
    setProductPrice('');
    setDescription('');
    setCategory('');
    setProductImage(null);
    setInventory('');
    setFormErrors({});
  };
  
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!productName.trim()) errors.name = 'Product name is required';
    if (!productPrice.trim()) errors.price = 'Price is required';
    else if (isNaN(parseFloat(productPrice)) || parseFloat(productPrice) <= 0) 
      errors.price = 'Price must be a valid positive number';
    
    if (!productDescription.trim()) errors.description = 'Description is required';
    if (!productCategory.trim()) errors.category = 'Category is required';
    if (!editingProduct && !productImage) errors.image = 'Product image is required';
    
    if (!productInventory.trim()) errors.inventory = 'Inventory count is required';
    else if (isNaN(parseInt(productInventory)) || parseInt(productInventory) < 0)
      errors.inventory = 'Inventory must be a valid non-negative number';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // In a real app, this would add or update the product in Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add or update product logic would go here

      // Example of what this would look like with Firebase:
      // if (editingProduct) {
      //   const productRef = doc(db, 'products', editingProduct.id.toString());
      //   await updateDoc(productRef, {
      //     name: productName,
      //     price: parseFloat(productPrice),
      //     description: productDescription,
      //     category: productCategory,
      //     inventory: parseInt(productInventory)
      //   });
      // } else {
      //   let imageUrl = '';
      //   if (productImage) {
      //     const storageRef = ref(storage, `products/${productImage.name}`);
      //     await uploadBytes(storageRef, productImage);
      //     imageUrl = await getDownloadURL(storageRef);
      //   }
      //
      //   await addDoc(collection(db, 'products'), {
      //     name: productName,
      //     price: parseFloat(productPrice),
      //     description: productDescription,
      //     category: productCategory,
      //     inventory: parseInt(productInventory),
      //     images: [imageUrl],
      //     rating: 0,
      //     reviews: 0,
      //     tags: []
      //   });
      // }
      
      // Demo of updating UI directly
      if (editingProduct) {
        setProducts(products.map(p => 
          p.id === editingProduct.id 
            ? { 
                ...p, 
                name: productName, 
                price: parseFloat(productPrice),
                description: productDescription,
                category: productCategory,
                inventory: parseInt(productInventory)
              } 
            : p
        ));
      } else {
        const newProduct: Product = {
          id: Math.max(...products.map(p => p.id)) + 1,
          name: productName,
          price: parseFloat(productPrice),
          description: productDescription,
          category: productCategory,
          inventory: parseInt(productInventory),
          images: [
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
          ],
          rating: 0,
          reviews: 0,
          tags: []
        };
        
        setProducts([...products, newProduct]);
      }
      
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      setFormErrors({ submit: 'Error saving product. Please try again.' });
    } finally {
      setFormSubmitting(false);
    }
  };
  
  const handleDeleteProduct = (productId: number) => {
    // In a real app, this would delete from Firebase
    // const productRef = doc(db, 'products', productId.toString());
    // await deleteDoc(productRef);
    
    // Remove from UI
    setProducts(products.filter(p => p.id !== productId));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };
  
  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Products</h1>
          <p className="text-secondary-600">Manage your product catalog</p>
        </div>
        <button
          onClick={openAddModal}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-secondary-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <div className="flex space-x-2">
            <select className="input">
              <option value="">All Categories</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="unisex">Unisex</option>
            </select>
            <button className="btn btn-secondary flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Products table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading products...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Inventory
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-secondary-100 rounded-md overflow-hidden">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-10 w-10 object-cover object-center"
                            />
                          ) : (
                            <div className="h-10 w-10 flex items-center justify-center">
                              <ShoppingBag className="h-6 w-6 text-secondary-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-secondary-900 line-clamp-1">
                            {product.name}
                          </div>
                          <div className="text-sm text-secondary-500 line-clamp-1">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-secondary-900">
                        ${product.price.toFixed(2)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-secondary-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                      {product.inventory} in stock
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.inventory > 0 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inventory > 0 ? 'Active' : 'Out of Stock'}
                      </span>
                      {product.isNew && (
                        <span className="ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          New
                        </span>
                      )}
                      {product.isOnSale && (
                        <span className="ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Sale
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <ShoppingBag className="h-12 w-12 text-secondary-400 mx-auto" />
          <h3 className="mt-2 text-sm font-medium text-secondary-900">No products found</h3>
          <p className="mt-1 text-sm text-secondary-500">
            {searchTerm 
              ? `No products matching "${searchTerm}"`
              : "Get started by adding your first product"
            }
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={openAddModal}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-secondary-900 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-secondary-900">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="product-name" className="block text-sm font-medium text-secondary-700">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          id="product-name"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          className={`mt-1 input ${formErrors.name ? 'border-red-300' : ''}`}
                          placeholder="Enter product name"
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="product-price" className="block text-sm font-medium text-secondary-700">
                            Price *
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-secondary-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="text"
                              id="product-price"
                              value={productPrice}
                              onChange={(e) => setProductPrice(e.target.value)}
                              className={`input pl-7 ${formErrors.price ? 'border-red-300' : ''}`}
                              placeholder="0.00"
                            />
                          </div>
                          {formErrors.price && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="product-inventory" className="block text-sm font-medium text-secondary-700">
                            Inventory *
                          </label>
                          <input
                            type="text"
                            id="product-inventory"
                            value={productInventory}
                            onChange={(e) => setInventory(e.target.value)}
                            className={`mt-1 input ${formErrors.inventory ? 'border-red-300' : ''}`}
                            placeholder="Quantity"
                          />
                          {formErrors.inventory && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.inventory}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="product-category" className="block text-sm font-medium text-secondary-700">
                          Category *
                        </label>
                        <select
                          id="product-category"
                          value={productCategory}
                          onChange={(e) => setCategory(e.target.value)}
                          className={`mt-1 input ${formErrors.category ? 'border-red-300' : ''}`}
                        >
                          <option value="">Select a category</option>
                          <option value="Men">Men</option>
                          <option value="Women">Women</option>
                          <option value="Kids">Kids</option>
                          <option value="Unisex">Unisex</option>
                        </select>
                        {formErrors.category && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="product-description" className="block text-sm font-medium text-secondary-700">
                          Description *
                        </label>
                        <textarea
                          id="product-description"
                          rows={3}
                          value={productDescription}
                          onChange={(e) => setDescription(e.target.value)}
                          className={`mt-1 input ${formErrors.description ? 'border-red-300' : ''}`}
                          placeholder="Enter product description"
                        ></textarea>
                        {formErrors.description && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-secondary-700">
                          Product Image {!editingProduct && '*'}
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-secondary-300 border-dashed rounded-md">
                          {productImage ? (
                            <div className="space-y-1 text-center">
                              <div className="flex text-sm text-secondary-600">
                                <p className="pl-1">{productImage.name}</p>
                              </div>
                              <p className="text-xs text-secondary-500">
                                {(productImage.size / 1024).toFixed(2)} KB
                              </p>
                              <button 
                                type="button"
                                onClick={() => setProductImage(null)}
                                className="text-xs text-red-600 hover:text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          ) : editingProduct && editingProduct.images && editingProduct.images.length > 0 ? (
                            <div className="space-y-1 text-center">
                              <img
                                src={editingProduct.images[0]}
                                alt={editingProduct.name}
                                className="h-32 w-auto mx-auto"
                              />
                              <button 
                                type="button"
                                className="text-xs text-primary-600 hover:text-primary-500 mt-1"
                              >
                                Change Image
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-1 text-center">
                              <Image className="h-12 w-12 text-secondary-400 mx-auto" />
                              <div className="flex text-sm text-secondary-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500">
                                  <span>Upload a file</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-secondary-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          )}
                        </div>
                        {formErrors.image && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.image}</p>
                        )}
                      </div>
                      
                      {formErrors.submit && (
                        <div className="text-sm text-red-600 p-2 border border-red-200 rounded-md bg-red-50">
                          {formErrors.submit}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary-50 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse sm:gap-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={formSubmitting}
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 sm:text-sm"
                >
                  {formSubmitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center rounded-md border border-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-secondary-700 hover:bg-secondary-50 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
 