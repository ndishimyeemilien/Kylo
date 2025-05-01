import  { Link } from 'react-router-dom';
import { Package, Users, DollarSign, TrendingUp, ShoppingBag, Calendar, Clock } from 'lucide-react';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  // In a real app, these would be fetched from Firebase
  const stats = [
    { 
      name: 'Total Orders', 
      value: '124', 
      change: '+12%', 
      trend: 'up',
      icon: <Package className="h-6 w-6 text-primary-600" /> 
    },
    { 
      name: 'Total Customers', 
      value: '85', 
      change: '+5%', 
      trend: 'up',
      icon: <Users className="h-6 w-6 text-indigo-600" /> 
    },
    { 
      name: 'Revenue', 
      value: '$8,259', 
      change: '+18%', 
      trend: 'up',
      icon: <DollarSign className="h-6 w-6 text-green-600" /> 
    },
    { 
      name: 'Products', 
      value: '42', 
      change: '+2', 
      trend: 'up',
      icon: <ShoppingBag className="h-6 w-6 text-yellow-600" /> 
    },
  ];
  
  // Recent orders data
  const recentOrders = [
    { id: 'ORD-5123', customer: 'John Smith', date: '2023-06-17', total: 129.99, status: 'Delivered' },
    { id: 'ORD-5122', customer: 'Sarah Johnson', date: '2023-06-16', total: 75.50, status: 'Processing' },
    { id: 'ORD-5121', customer: 'Michael Brown', date: '2023-06-15', total: 249.00, status: 'Shipped' },
    { id: 'ORD-5120', customer: 'Emily Davis', date: '2023-06-15', total: 32.99, status: 'Processing' },
    { id: 'ORD-5119', customer: 'David Wilson', date: '2023-06-14', total: 145.75, status: 'Delivered' },
  ];
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-secondary-900">Admin Dashboard</h1>
        <p className="text-secondary-600">Welcome back, Admin!</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">{stat.name}</p>
                <p className="mt-1 text-3xl font-semibold text-secondary-900">{stat.value}</p>
              </div>
              <div className="p-3 rounded-full bg-secondary-50">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <TrendingUp className={`h-3 w-3 mr-1 ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500 transform rotate-180'
                }`} />
                {stat.change}
              </div>
              <span className="text-xs text-secondary-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Orders */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-secondary-900">Recent Orders</h2>
          <Link 
            to="/admin/orders" 
            className="text-sm font-medium text-primary-600 hover:text-primary-800"
          >
            View all
          </Link>
        </div>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Order
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
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-secondary-400" />
                        {order.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Quick actions and analytics sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-secondary-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link 
              to="/admin/products" 
              className="flex flex-col items-center justify-center p-4 border border-secondary-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors"
            >
              <ShoppingBag className="h-8 w-8 text-primary-600" />
              <span className="mt-2 text-sm font-medium text-secondary-900">Add Product</span>
            </Link>
            <Link 
              to="/admin/orders" 
              className="flex flex-col items-center justify-center p-4 border border-secondary-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors"
            >
              <Package className="h-8 w-8 text-primary-600" />
              <span className="mt-2 text-sm font-medium text-secondary-900">Manage Orders</span>
            </Link>
            <div className="flex flex-col items-center justify-center p-4 border border-secondary-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors cursor-pointer">
              <Users className="h-8 w-8 text-primary-600" />
              <span className="mt-2 text-sm font-medium text-secondary-900">View Customers</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border border-secondary-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors cursor-pointer">
              <TrendingUp className="h-8 w-8 text-primary-600" />
              <span className="mt-2 text-sm font-medium text-secondary-900">Analytics</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-secondary-900 mb-4">Store Performance</h2>
          <div className="relative">
            {/* This would be a chart in a real app */}
            <div className="h-64 bg-secondary-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-secondary-400 mx-auto" />
                <p className="mt-2 text-secondary-600">Analytics chart would be displayed here</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-secondary-500">Conversion Rate</p>
                <p className="text-lg font-semibold text-secondary-900">3.2%</p>
              </div>
              <div>
                <p className="text-xs text-secondary-500">Avg. Order Value</p>
                <p className="text-lg font-semibold text-secondary-900">$86.54</p>
              </div>
              <div>
                <p className="text-xs text-secondary-500">Cart Abandonment</p>
                <p className="text-lg font-semibold text-secondary-900">24.3%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
 