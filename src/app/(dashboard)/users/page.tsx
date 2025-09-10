'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Search,
  Settings,
  Shield,
  Mail,
  Phone,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Upload
} from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  role: string;
  roleAr: string;
  department: string;
  departmentAr: string;
  status: 'active' | 'inactive' | 'pending';
  permissions: string[];
  lastLogin: string;
  joinDate: string;
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    nameAr: 'أحمد حسن',
    email: 'ahmed.hassan@company.com',
    phone: '+966501234567',
    role: 'Admin',
    roleAr: 'مدير النظام',
    department: 'IT',
    departmentAr: 'تقنية المعلومات',
    status: 'active',
    permissions: ['all'],
    lastLogin: '2024-01-15T10:30:00',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Sara Al-Mahmoud',
    nameAr: 'سارة المحمود',
    email: 'sara.mahmoud@company.com',
    phone: '+966502345678',
    role: 'Finance Manager',
    roleAr: 'مدير مالي',
    department: 'Finance',
    departmentAr: 'المالية',
    status: 'active',
    permissions: ['finance', 'reports', 'payments'],
    lastLogin: '2024-01-15T09:15:00',
    joinDate: '2023-03-10'
  },
  {
    id: '3',
    name: 'Omar Khalil',
    nameAr: 'عمر خليل',
    email: 'omar.khalil@company.com',
    phone: '+966503456789',
    role: 'Procurement Officer',
    roleAr: 'موظف مشتريات',
    department: 'Procurement',
    departmentAr: 'المشتريات',
    status: 'active',
    permissions: ['purchase-orders', 'vendors', 'reports'],
    lastLogin: '2024-01-14T16:45:00',
    joinDate: '2023-06-20'
  },
  {
    id: '4',
    name: 'Fatima Al-Zahra',
    nameAr: 'فاطمة الزهراء',
    email: 'fatima.zahra@company.com',
    phone: '+966504567890',
    role: 'Service Coordinator',
    roleAr: 'منسق خدمات',
    department: 'Operations',
    departmentAr: 'العمليات',
    status: 'active',
    permissions: ['services', 'consultations', 'reports'],
    lastLogin: '2024-01-14T14:20:00',
    joinDate: '2023-09-05'
  },
  {
    id: '5',
    name: 'Mohammed Al-Rashid',
    nameAr: 'محمد الراشد',
    email: 'mohammed.rashid@company.com',
    phone: '+966505678901',
    role: 'Accountant',
    roleAr: 'محاسب',
    department: 'Accounting',
    departmentAr: 'المحاسبة',
    status: 'pending',
    permissions: ['accounting', 'invoices'],
    lastLogin: '',
    joinDate: '2024-01-10'
  },
  {
    id: '6',
    name: 'Layla Abdulrahman',
    nameAr: 'ليلى عبدالرحمن',
    email: 'layla.abdulrahman@company.com',
    phone: '+966506789012',
    role: 'HR Specialist',
    roleAr: 'أخصائي موارد بشرية',
    department: 'Human Resources',
    departmentAr: 'الموارد البشرية',
    status: 'inactive',
    permissions: ['users', 'reports'],
    lastLogin: '2024-01-05T11:00:00',
    joinDate: '2023-11-15'
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Finance Manager': return 'bg-blue-100 text-blue-800';
      case 'Procurement Officer': return 'bg-orange-100 text-orange-800';
      case 'Service Coordinator': return 'bg-green-100 text-green-800';
      case 'Accountant': return 'bg-cyan-100 text-cyan-800';
      case 'HR Specialist': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nameAr.includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeUsers = users.filter(user => user.status === 'active').length;
  const pendingUsers = users.filter(user => user.status === 'pending').length;
  const totalUsers = users.length;

  const formatLastLogin = (timestamp: string) => {
    if (!timestamp) return 'لم يسجل دخول - Never logged in';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'منذ قليل - Just now';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة - ${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `منذ ${diffInDays} يوم - ${diffInDays}d ago`;
  };

  return (
    <div className="container mx-auto py-4 space-y-6">
      <PageHeader
        title="إدارة المستخدمين والصلاحيات - User Management & Permissions"
        description="إدارة المستخدمين والأدوار والصلاحيات - Manage users, roles, and permissions"
        className="mb-8"
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                <p className="text-xs text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">{totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">نشطين</p>
                <p className="text-xs text-gray-500">Active</p>
                <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">في الانتظار</p>
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingUsers}</p>
              </div>
              <UserPlus className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الأدوار</p>
                <p className="text-xs text-gray-500">Roles</p>
                <p className="text-2xl font-bold text-purple-600">6</p>
              </div>
              <Settings className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في المستخدمين - Search users"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">جميع الأدوار - All Roles</option>
                <option value="Admin">مدير النظام - Admin</option>
                <option value="Finance Manager">مدير مالي - Finance Manager</option>
                <option value="Procurement Officer">موظف مشتريات - Procurement Officer</option>
                <option value="Service Coordinator">منسق خدمات - Service Coordinator</option>
                <option value="Accountant">محاسب - Accountant</option>
                <option value="HR Specialist">أخصائي موارد بشرية - HR Specialist</option>
              </select>
            </div>
            
            <div className="w-full md:w-48">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">جميع الحالات - All Status</option>
                <option value="active">نشط - Active</option>
                <option value="inactive">غير نشط - Inactive</option>
                <option value="pending">في الانتظار - Pending</option>
              </select>
            </div>
            
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              مستخدم جديد - New User
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              تصدير المستخدمين - Export Users
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              استيراد المستخدمين - Import Users
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              إدارة الأدوار - Manage Roles
            </Button>
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              إدارة الصلاحيات - Manage Permissions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المستخدمين - Users List ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                  {/* User Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.nameAr}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{user.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Role & Department */}
                  <div>
                    <div className="space-y-2">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <p className="text-xs text-gray-500">{user.roleAr}</p>
                      <div className="text-sm">
                        <p className="font-medium">{user.department}</p>
                        <p className="text-gray-500">{user.departmentAr}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status === 'active' ? 'نشط - Active' :
                       user.status === 'inactive' ? 'غير نشط - Inactive' : 'في الانتظار - Pending'}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatLastLogin(user.lastLogin)}
                    </p>
                  </div>

                  {/* Permissions */}
                  <div>
                    <p className="text-sm font-medium mb-2">الصلاحيات - Permissions</p>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 3).map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                      {user.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.permissions.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="text-sm">
                    <p className="text-gray-500">تاريخ الانضمام</p>
                    <p className="text-gray-500">Join Date</p>
                    <p className="font-medium">{user.joinDate}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 rtl:space-x-reverse justify-end">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>لا توجد مستخدمين</p>
                <p className="text-sm">No users found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}