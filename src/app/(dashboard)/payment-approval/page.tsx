'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertTriangle,
  DollarSign,
  FileText,
  User,
  Calendar,
  Bell,
  Download
} from 'lucide-react';
import { useState } from 'react';

interface PaymentRequest {
  id: string;
  requestNumber: string;
  amount: number;
  currency: string;
  description: string;
  descriptionAr: string;
  requestedBy: string;
  requestDate: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  priority: 'low' | 'medium' | 'high';
  invoiceNumber?: string;
  vendor: string;
  category: string;
}

const mockPaymentRequests: PaymentRequest[] = [
  {
    id: '1',
    requestNumber: 'PR-2024-001',
    amount: 15000,
    currency: 'SAR',
    description: 'Office Equipment Purchase',
    descriptionAr: 'شراء معدات مكتبية',
    requestedBy: 'Ahmed Hassan',
    requestDate: '2024-01-15',
    dueDate: '2024-01-20',
    status: 'pending',
    priority: 'high',
    invoiceNumber: 'INV-2024-001',
    vendor: 'Tech Solutions Ltd',
    category: 'Equipment'
  },
  {
    id: '2', 
    requestNumber: 'PR-2024-002',
    amount: 8500,
    currency: 'SAR',
    description: 'Software License Renewal',
    descriptionAr: 'تجديد رخصة البرمجيات',
    requestedBy: 'Sara Al-Mahmoud',
    requestDate: '2024-01-14',
    dueDate: '2024-01-25',
    status: 'approved',
    priority: 'medium',
    invoiceNumber: 'INV-2024-002',
    vendor: 'Software Corp',
    category: 'Software'
  },
  {
    id: '3',
    requestNumber: 'PR-2024-003', 
    amount: 3200,
    currency: 'SAR',
    description: 'Marketing Materials',
    descriptionAr: 'مواد تسويقية',
    requestedBy: 'Omar Khalil',
    requestDate: '2024-01-13',
    dueDate: '2024-01-18',
    status: 'processing',
    priority: 'low',
    vendor: 'Print House',
    category: 'Marketing'
  }
];

export default function PaymentApprovalPage() {
  const [requests, setRequests] = useState<PaymentRequest[]>(mockPaymentRequests);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'processing': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (id: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: 'approved' as const } : req
      )
    );
  };

  const handleReject = (id: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: 'rejected' as const } : req
      )
    );
  };

  const filteredRequests = selectedStatus === 'all' 
    ? requests 
    : requests.filter(req => req.status === selectedStatus);

  const pendingCount = requests.filter(req => req.status === 'pending').length;
  const approvedCount = requests.filter(req => req.status === 'approved').length;
  const totalAmount = requests
    .filter(req => req.status === 'approved')
    .reduce((sum, req) => sum + req.amount, 0);

  return (
    <div className="container mx-auto py-4 space-y-6">
      <PageHeader
        title="استلام موافقة الدفع - Payment Approval"
        description="إدارة طلبات الدفع والموافقات - Manage payment requests and approvals"
        className="mb-8"
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">طلبات في الانتظار</p>
                <p className="text-xs text-gray-500">Pending Requests</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">طلبات معتمدة</p>
                <p className="text-xs text-gray-500">Approved Requests</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المعتمد</p>
                <p className="text-xs text-gray-500">Total Approved</p>
                <p className="text-2xl font-bold text-blue-600">{totalAmount.toLocaleString()} ر.س</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إشعارات جديدة</p>
                <p className="text-xs text-gray-500">New Notifications</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <Bell className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <label className="text-sm font-medium">تصفية حسب الحالة - Filter by Status:</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded-md px-3 py-1 text-sm"
              >
                <option value="all">جميع الطلبات - All Requests</option>
                <option value="pending">في الانتظار - Pending</option>
                <option value="approved">معتمد - Approved</option>
                <option value="rejected">مرفوض - Rejected</option>
                <option value="processing">قيد المعالجة - Processing</option>
              </select>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              تصدير التقرير - Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Requests List */}
      <Card>
        <CardHeader>
          <CardTitle>طلبات الدفع - Payment Requests ({filteredRequests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {/* Request Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-lg">{request.requestNumber}</h3>
                        <p className="text-sm text-gray-600">{request.description}</p>
                        <p className="text-sm text-gray-500">{request.descriptionAr}</p>
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority === 'high' ? 'عالي - High' : 
                           request.priority === 'medium' ? 'متوسط - Medium' : 'منخفض - Low'}
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          <span className="flex items-center space-x-1 rtl:space-x-reverse">
                            {getStatusIcon(request.status)}
                            <span>
                              {request.status === 'pending' ? 'في الانتظار' :
                               request.status === 'approved' ? 'معتمد' :
                               request.status === 'rejected' ? 'مرفوض' : 'قيد المعالجة'}
                            </span>
                          </span>
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{request.requestedBy}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{request.requestDate}</span>
                      </div>
                      {request.invoiceNumber && (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span>{request.invoiceNumber}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-gray-500">المورد - Vendor:</span>
                        <span>{request.vendor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="flex items-center justify-center lg:justify-start">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {request.amount.toLocaleString()} {request.currency}
                      </p>
                      <p className="text-sm text-gray-500">
                        تاريخ الاستحقاق - Due: {request.dueDate}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 rtl:space-x-reverse justify-end">
                    {request.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => handleApprove(request.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          موافقة - Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleReject(request.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          رفض - Reject
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      التفاصيل - Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredRequests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>لا توجد طلبات دفع</p>
                <p className="text-sm">No payment requests found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}