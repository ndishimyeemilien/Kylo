import  { useState } from 'react';
import { Package, Search, Filter, Eye, Check, X, Clock, AlertTriangle, Download, Truck } from 'lucide-react';
import AdminLayout from './AdminLayout';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
  date: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  // Mock orders data - would come from Firebase in a real app
  const orders: Order[] = [
    {
      id: 'ORD-5123',
      customer: {
        name: 'John Smith',
        email: 'john@example.com',
      },
      items: [
        { id: 1, name: 'Premium Cotton T-Shirt', quantity: 2, price: 39.99 },
        { id: 5, name: 'Oversized Hoodie', quantity: 1, price: 59.99 },
      ],
      date: '2023-06-17',
      total: 139.97,
      status: 'Delivered',
      paymentStatus: 'Paid',
      shippingAddress: {
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA',
      },
    },
    {
      id: 'ORD-5122',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
      },
      items: [
        { id: 3, name: 'Floral Summer Dress', quantity: 1, price: 79.99 },
      ],
      date: '2023-06-16',
      total: 79.99,
      status: 'Processing',
      paymentStatus: 'Paid',
      shippingAddress: {
        address: '456 Park Ave',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        country: 'USA',
      },
    },
    {
      id: 'ORD-5121',
      customer: {
        name: 'Michael Brown',
        email: 'michael@example.com',
      },
      items: [
        { id: 7, name: 'Wool Blend Coat', quantity: 1, price: 199.99 },
        { id: 2, name: 'Slim Fit Jeans', quantity: 1, price: 89.99 },
      ],
      date: '2023-06-15',
      total: 289.98,
      status: 'Shipped',
      paymentStatus: 'Paid',
      shippingAddress: {
        address: '789 Pine St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94102',
        country: 'USA',
      },
    },
    {
      id: 'ORD-5120',
      customer: {
        name: 'Emily Davis',
        email: 'emily@example.com',
      },
      items: [
        { id: 6, name: 'Kids Dinosaur T-Shirt', quantity: 2, price: 24.99 },
      ],
      date: '2023-06-15',
      total: 49.98,
      status: 'Pending',
      paymentStatus: 'Pending',
      shippingAddress: {
        address: '101 Oak Rd',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        country: 'USA',
      },
    },
    {
      id: 'ORD-5119',
      customer: {
        name: 'David Wilson',
        email: 'david@example.com',
      },
      items: [
        { id: 4, name: 'Leather Ankle Boots', quantity: 1, price: 149.99 },
      ],
      date: '2023-06-14',
      total: 149.99,
      status: 'Cancelled',
      paymentStatus: 'Failed',
      shippingAddress: {
        address: '202 Maple St',
        city: 'Boston',
        state: 'MA',
        zip: '02108',
        country: 'USA',
      },
    },
  ];
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && order.status.toLowerCase() === statusFilter.toLowerCase();
  });
  
  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };
  
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Processing':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'Shipped':
        return <Truck className="h-5 w-5 text-primary-500" />;
      case 'Delivered':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'Cancelled':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-primary-100 text-primary-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-secondary-100 text-secondary-800';
    }
  };
  
  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-secondary-100 text-secondary-800';
    }
  };
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-secondary-900">Orders</h1>
        <p className="text-secondary-600">Manage customer orders</p>
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
              placeholder="Search by order ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <div className="flex space-x-2">
            <select 
              className="input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="btn btn-secondary flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Orders table */}
      {filteredOrders.length > 0 ? (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary-900">{order.customer.name}</div>
                      <div className="text-xs text-secondary-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => openOrderDetails(order)}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
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
          <Package className="h-12 w-12 text-secondary-400 mx-auto" />
          <h3 className="mt-2 text-sm font-medium text-secondary-900">No orders found</h3>
          <p className="mt-1 text-sm text-secondary-500">
            {searchTerm || statusFilter !== 'all'
              ? `No orders matching your search criteria`
              : "When customers place orders, they will appear here"
            }
          </p>
        </div>
      )}
      
      {/* Order Details Modal */}
      {isViewModalOpen && selectedOrder && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-secondary-900 bg-opacity-75 transition-opacity" onClick={() => setIsViewModalOpen(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-secondary-900 flex items-center">
                        Order Details
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                      </h3>
                      <span className="text-secondary-600 text-sm">{selectedOrder.date}</span>
                    </div>
                    
                    <div className="mt-4 border-t pt-4">
                      <h4 className="text-sm font-medium text-secondary-900">Order ID</h4>
                      <p className="text-sm text-secondary-600">{selectedOrder.id}</p>
                    </div>
                    
                    <div className="mt-4 border-t pt-4">
                      <h4 className="text-sm font-medium text-secondary-900">Customer Information</h4>
                      <p className="text-sm text-secondary-600">{selectedOrder.customer.name}</p>
                      <p className="text-sm text-secondary-600">{selectedOrder.customer.email}</p>
                    </div>
                    
                    <div className="mt-4 border-t pt-4">
                      <h4 className="text-sm font-medium text-secondary-900">Shipping Address</h4>
                      <p className="text-sm text-secondary-600">{selectedOrder.shippingAddress.address}</p>
                      <p className="text-sm text-secondary-600">
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
                      </p>
                      <p className="text-sm text-secondary-600">{selectedOrder.shippingAddress.country}</p>
                    </div>
                    
                    <div className="mt-4 border-t pt-4">
                      <h4 className="text-sm font-medium text-secondary-900">Order Items</h4>
                      <ul className="mt-2 divide-y divide-secondary-200">
                        {selectedOrder.items.map((item) => (
                          <li key={item.id} className="py-2 flex justify-between">
                            <div>
                              <p className="text-sm font-medium text-secondary-900">{item.name}</p>
                              <p className="text-sm text-secondary-600">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-secondary-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-4 border-t pt-4">
                      <div className="flex justify-between">
                        <p className="text-sm text-secondary-600">Subtotal</p>
                        <p className="text-sm text-secondary-900">${selectedOrder.total.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-secondary-600">Shipping</p>
                        <p className="text-sm text-secondary-900">$0.00</p>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-secondary-600">Tax</p>
                        <p className="text-sm text-secondary-900">$0.00</p>
                      </div>
                      <div className="flex justify-between mt-2 font-medium">
                        <p className="text-sm text-secondary-900">Total</p>
                        <p className="text-sm text-secondary-900">${selectedOrder.total.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 border-t pt-4 flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-secondary-900">Payment Status</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                          {selectedOrder.paymentStatus}
                        </span>
                      </div>
                      
                      <div className="text-right">
                        <h4 className="text-sm font-medium text-secondary-900">Payment Method</h4>
                        <p className="text-sm text-secondary-600">Credit Card</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary-50 px-4 py-3 sm:px-6 flex justify-between">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 sm:text-sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="inline-flex justify-center rounded-md border border-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-secondary-700 hover:bg-secondary-50 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrders;
 