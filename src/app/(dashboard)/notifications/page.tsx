'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Mail, 
  CheckCircle2,
  Clock,
  AlertTriangle,
  Trash2,
  Settings,
  MarkAsUnread,
  Archive,
  Filter
} from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  timestamp: string;
  actionRequired: boolean;
  category: string;
  relatedId?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Payment Approved',
    titleAr: 'تم اعتماد الدفع',
    message: 'Payment request PR-2024-001 has been approved for 15,000 SAR',
    messageAr: 'تم اعتماد طلب الدفع PR-2024-001 بمبلغ 15,000 ريال سعودي',
    type: 'success',
    priority: 'high',
    read: false,
    timestamp: '2024-01-15T10:30:00',
    actionRequired: false,
    category: 'Payment',
    relatedId: 'PR-2024-001'
  },
  {
    id: '2',
    title: 'New Purchase Order',
    titleAr: 'أمر شراء جديد',
    message: 'New purchase order PO-2024-003 requires your approval',
    messageAr: 'أمر الشراء الجديد PO-2024-003 يتطلب موافقتك',
    type: 'warning',
    priority: 'high',
    read: false,
    timestamp: '2024-01-15T09:15:00',
    actionRequired: true,
    category: 'Purchase Order',
    relatedId: 'PO-2024-003'
  },
  {
    id: '3',
    title: 'Service Delivery Completed',
    titleAr: 'تم إكمال تسليم الخدمة',
    message: 'Service delivery for request SR-2024-008 has been completed',
    messageAr: 'تم إكمال تسليم الخدمة لطلب SR-2024-008',
    type: 'success',
    priority: 'medium',
    read: true,
    timestamp: '2024-01-14T16:45:00',
    actionRequired: false,
    category: 'Service',
    relatedId: 'SR-2024-008'
  },
  {
    id: '4',
    title: 'Document Upload Required',
    titleAr: 'مطلوب رفع مستند',
    message: 'Missing documents for invoice INV-2024-005. Please upload required files.',
    messageAr: 'مستندات مفقودة للفاتورة INV-2024-005. يرجى رفع الملفات المطلوبة.',
    type: 'warning',
    priority: 'medium',
    read: false,
    timestamp: '2024-01-14T14:20:00',
    actionRequired: true,
    category: 'Documents',
    relatedId: 'INV-2024-005'
  },
  {
    id: '5',
    title: 'System Maintenance',
    titleAr: 'صيانة النظام',
    message: 'Scheduled system maintenance on January 20, 2024 from 2:00 AM to 4:00 AM',
    messageAr: 'صيانة النظام المجدولة في 20 يناير 2024 من الساعة 2:00 صباحاً إلى 4:00 صباحاً',
    type: 'info',
    priority: 'low',
    read: true,
    timestamp: '2024-01-12T11:00:00',
    actionRequired: false,
    category: 'System'
  },
  {
    id: '6',
    title: 'Overdue Payment',
    titleAr: 'دفعة متأخرة',
    message: 'Payment for invoice INV-2024-001 is overdue. Immediate action required.',
    messageAr: 'الدفع للفاتورة INV-2024-001 متأخر. مطلوب إجراء فوري.',
    type: 'error',
    priority: 'high',
    read: false,
    timestamp: '2024-01-10T08:30:00',
    actionRequired: true,
    category: 'Payment',
    relatedId: 'INV-2024-001'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Bell className="h-5 w-5 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
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

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: false } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = selectedFilter === 'all' || notif.category === selectedFilter;
    const matchesReadFilter = !showUnreadOnly || !notif.read;
    return matchesFilter && matchesReadFilter;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;
  const actionRequiredCount = notifications.filter(notif => notif.actionRequired && !notif.read).length;
  const highPriorityCount = notifications.filter(notif => notif.priority === 'high' && !notif.read).length;

  const formatTime = (timestamp: string) => {
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
        title="الإشعارات والتنبيهات - Notifications & Alerts"
        description="إدارة الإشعارات والتنبيهات البريدية - Manage notifications and email alerts"
        className="mb-8"
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">غير مقروءة</p>
                <p className="text-xs text-gray-500">Unread</p>
                <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تتطلب إجراء</p>
                <p className="text-xs text-gray-500">Action Required</p>
                <p className="text-2xl font-bold text-orange-600">{actionRequiredCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">أولوية عالية</p>
                <p className="text-xs text-gray-500">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المجموع</p>
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-600">{notifications.length}</p>
              </div>
              <Mail className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Filter className="h-4 w-4 text-gray-500" />
                <select 
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">جميع الفئات - All Categories</option>
                  <option value="Payment">المدفوعات - Payment</option>
                  <option value="Purchase Order">أوامر الشراء - Purchase Orders</option>
                  <option value="Service">الخدمات - Services</option>
                  <option value="Documents">المستندات - Documents</option>
                  <option value="System">النظام - System</option>
                </select>
              </div>
              
              <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="rounded"
                />
                <span>غير المقروءة فقط - Unread only</span>
              </label>
            </div>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                تحديد الكل كمقروء - Mark All Read
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                إعدادات الإشعارات - Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>الإشعارات - Notifications ({filteredNotifications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`border rounded-lg p-4 transition-colors ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                        <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <h4 className="text-sm text-gray-600">{notification.titleAr}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-1">{notification.message}</p>
                      <p className="text-sm text-gray-500 mb-3">{notification.messageAr}</p>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Badge className={getTypeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority === 'high' ? 'عالي - High' :
                           notification.priority === 'medium' ? 'متوسط - Medium' : 'منخفض - Low'}
                        </Badge>
                        <Badge variant="outline">
                          {notification.category}
                        </Badge>
                        {notification.actionRequired && (
                          <Badge className="bg-orange-100 text-orange-800">
                            إجراء مطلوب - Action Required
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatTime(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse ml-4">
                    {!notification.read ? (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsUnread(notification.id)}
                      >
                        <MarkAsUnread className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredNotifications.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>لا توجد إشعارات</p>
                <p className="text-sm">No notifications found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}