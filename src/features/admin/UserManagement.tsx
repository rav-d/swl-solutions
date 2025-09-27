import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  role: z.string().min(1, 'Please select a role'),
  department: z.string().min(1, 'Please select a department'),
  status: z.string().min(1, 'Please select a status'),
  permissions: z.array(z.string()).min(1, 'Please select at least one permission'),
});

type UserFormData = z.infer<typeof userSchema>;

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'developer' | 'designer' | 'sales' | 'support';
  department: 'engineering' | 'design' | 'sales' | 'marketing' | 'support' | 'hr';
  status: 'active' | 'inactive' | 'pending';
  permissions: string[];
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      firstName: 'Eleanor',
      lastName: 'Vance',
      email: 'eleanor@swlsolutions.dev',
      role: 'admin',
      department: 'engineering',
      status: 'active',
      permissions: ['read', 'write', 'delete', 'admin'],
      avatar: 'EV',
      lastLogin: '2024-01-20T10:30:00Z',
      createdAt: '2023-06-15T09:00:00Z',
      updatedAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      firstName: 'Marcus',
      lastName: 'Holloway',
      email: 'marcus@swlsolutions.dev',
      role: 'developer',
      department: 'engineering',
      status: 'active',
      permissions: ['read', 'write'],
      avatar: 'MH',
      lastLogin: '2024-01-20T08:15:00Z',
      createdAt: '2023-08-20T14:30:00Z',
      updatedAt: '2024-01-19T16:45:00Z'
    },
    {
      id: '3',
      firstName: 'Anya',
      lastName: 'Petrova',
      email: 'anya@swlsolutions.dev',
      role: 'designer',
      department: 'design',
      status: 'active',
      permissions: ['read', 'write'],
      avatar: 'AP',
      lastLogin: '2024-01-19T17:20:00Z',
      createdAt: '2023-09-10T11:00:00Z',
      updatedAt: '2024-01-19T17:20:00Z'
    },
    {
      id: '4',
      firstName: 'Kenji',
      lastName: 'Tanaka',
      email: 'kenji@swlsolutions.dev',
      role: 'developer',
      department: 'engineering',
      status: 'active',
      permissions: ['read', 'write'],
      avatar: 'KT',
      lastLogin: '2024-01-18T15:45:00Z',
      createdAt: '2023-11-05T13:20:00Z',
      updatedAt: '2024-01-18T15:45:00Z'
    },
    {
      id: '5',
      firstName: 'Sofia',
      lastName: 'Rossi',
      email: 'sofia@swlsolutions.dev',
      role: 'sales',
      department: 'sales',
      status: 'active',
      permissions: ['read'],
      avatar: 'SR',
      lastLogin: '2024-01-17T12:30:00Z',
      createdAt: '2024-01-02T10:15:00Z',
      updatedAt: '2024-01-17T12:30:00Z'
    },
    {
      id: '6',
      firstName: 'David',
      lastName: 'Kim',
      email: 'david@swlsolutions.dev',
      role: 'manager',
      department: 'engineering',
      status: 'pending',
      permissions: ['read', 'write', 'manage'],
      avatar: 'DK',
      createdAt: '2024-01-19T09:30:00Z',
      updatedAt: '2024-01-19T09:30:00Z'
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const statusColors = {
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'pending': 'bg-yellow-100 text-yellow-800',
  };

  const roleColors = {
    'admin': 'bg-red-100 text-red-800',
    'manager': 'bg-purple-100 text-purple-800',
    'developer': 'bg-blue-100 text-blue-800',
    'designer': 'bg-pink-100 text-pink-800',
    'sales': 'bg-green-100 text-green-800',
    'support': 'bg-orange-100 text-orange-800',
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditing(false);
    reset();
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditing(true);
    setValue('firstName', user.firstName);
    setValue('lastName', user.lastName);
    setValue('email', user.email);
    setValue('role', user.role);
    setValue('department', user.department);
    setValue('status', user.status);
    setValue('permissions', user.permissions);
    setIsModalOpen(true);
  };

  const onSubmit = (data: UserFormData) => {
    if (isEditing && selectedUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...data, updatedAt: new Date().toISOString() }
          : user
      ));
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        ...data,
        avatar: `${data.firstName[0]}${data.lastName[0]}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUsers([newUser, ...users]);
    }
    setIsModalOpen(false);
    reset();
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getRoleLabel = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const getDepartmentLabel = (department: string) => {
    return department.charAt(0).toUpperCase() + department.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-300">Manage team members, roles, and permissions.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddUser}
          className="bg-brand-accent text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold"
        >
          Add New User
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Total Users</p>
              <p className="text-2xl font-bold text-white">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Active Users</p>
              <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'active').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Pending Users</p>
              <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'pending').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Departments</p>
              <p className="text-2xl font-bold text-white">{new Set(users.map(u => u.department)).size}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg text-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="sales">Sales</option>
              <option value="support">Support</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-accent/20">
            <thead className="bg-brand-primary/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-brand-secondary divide-y divide-brand-accent/20">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-brand-primary/20"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{user.avatar}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleColors[user.role as keyof typeof roleColors]}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{getDepartmentLabel(user.department)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[user.status as keyof typeof statusColors]}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-brand-accent hover:text-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsModalOpen(false)} />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-brand-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-brand-accent/20"
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="bg-brand-secondary px-6 pt-6 pb-4">
                    <h3 className="text-lg font-medium text-white mb-4">
                      {isEditing ? 'Edit User' : 'Add New User'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">First Name *</label>
                        <input
                          {...register('firstName')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Last Name *</label>
                        <input
                          {...register('lastName')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Role *</label>
                        <select
                          {...register('role')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white"
                        >
                          <option value="">Select role</option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="developer">Developer</option>
                          <option value="designer">Designer</option>
                          <option value="sales">Sales</option>
                          <option value="support">Support</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Department *</label>
                        <select
                          {...register('department')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white"
                        >
                          <option value="">Select department</option>
                          <option value="engineering">Engineering</option>
                          <option value="design">Design</option>
                          <option value="sales">Sales</option>
                          <option value="marketing">Marketing</option>
                          <option value="support">Support</option>
                          <option value="hr">HR</option>
                        </select>
                        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Status *</label>
                        <select
                          {...register('status')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white"
                        >
                          <option value="">Select status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="pending">Pending</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-brand-primary/30 px-6 py-3 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-300 bg-brand-primary border border-brand-accent/30 rounded-md hover:bg-brand-primary/70"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-brand-accent rounded-md hover:bg-blue-600"
                    >
                      {isEditing ? 'Update User' : 'Add User'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
