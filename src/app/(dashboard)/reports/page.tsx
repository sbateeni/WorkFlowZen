'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Filter,
  Printer,
  Mail,
  Settings
} from 'lucide-react';
import { useState } from 'react';

interface ReportTemplate {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  type: 'financial' | 'workflow' | 'operational' | 'custom';
  formats: string[];
  frequency: string;
  lastGenerated?: string;
  icon: React.ComponentType<any>;
}

const reportTemplates: ReportTemplate[] = [
  {
    id: 'financial-summary',
    name: 'Financial Summary Report',
    nameAr: 'تقرير الملخص المالي',
    description: 'Complete financial overview with payments, invoices, and expenses',
    descriptionAr: 'نظرة عامة مالية كاملة مع المدفوعات والفواتير والمصروفات',
    type: 'financial',
    formats: ['PDF', 'Excel', 'CSV'],
    frequency: 'Monthly',
    lastGenerated: '2024-01-15',
    icon: BarChart3
  },
  {
    id: 'workflow-status',
    name: 'Workflow Status Report', 
    nameAr: 'تقرير حالة سير العمل',
    description: 'Current status of all workflows and pending tasks',
    descriptionAr: 'الحالة الحالية لجميع أنظمة العمل والمهام المعلقة',
    type: 'workflow',
    formats: ['PDF', 'Excel'],
    frequency: 'Weekly',
    lastGenerated: '2024-01-14',
    icon: TrendingUp
  },
  {
    id: 'payment-analysis',
    name: 'Payment Analysis Report',
    nameAr: 'تقرير تحليل المدفوعات',
    description: 'Detailed analysis of payment requests and approvals',
    descriptionAr: 'تحليل مفصل لطلبات الدفع والموافقات',
    type: 'financial',
    formats: ['PDF', 'Excel', 'CSV'],
    frequency: 'Monthly',
    lastGenerated: '2024-01-13',
    icon: PieChart
  },
  {
    id: 'vendor-performance',
    name: 'Vendor Performance Report',
    nameAr: 'تقرير أداء الموردين',
    description: 'Performance metrics and analysis for all vendors',
    descriptionAr: 'مقاييس الأداء والتحليل لجميع الموردين',
    type: 'operational',
    formats: ['PDF', 'Excel'],
    frequency: 'Quarterly',
    icon: BarChart3
  },
  {
    id: 'service-delivery',
    name: 'Service Delivery Report',
    nameAr: 'تقرير تسليم الخدمات',
    description: 'Service delivery timelines and completion rates',
    descriptionAr: 'جداول تسليم الخدمات ومعدلات الإنجاز',
    type: 'operational',
    formats: ['PDF', 'Excel'],
    frequency: 'Monthly',
    lastGenerated: '2024-01-12',
    icon: TrendingUp
  },
  {
    id: 'custom-report',
    name: 'Custom Report Builder',
    nameAr: 'منشئ التقارير المخصصة',
    description: 'Build custom reports with selected data fields',
    descriptionAr: 'إنشاء تقارير مخصصة مع حقول البيانات المحددة',
    type: 'custom',
    formats: ['PDF', 'Excel', 'CSV'],
    frequency: 'On-demand',
    icon: Settings
  }
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-31'
  });

  const filteredReports = selectedType === 'all' 
    ? reportTemplates 
    : reportTemplates.filter(report => report.type === selectedType);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'financial': return 'bg-blue-100 text-blue-800';
      case 'workflow': return 'bg-green-100 text-green-800';
      case 'operational': return 'bg-purple-100 text-purple-800';
      case 'custom': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerateReport = (reportId: string, format: string) => {
    // In a real app, this would trigger report generation
    console.log(`Generating report ${reportId} in ${format} format`);
    alert(`تم بدء إنشاء التقرير بتنسيق ${format} - Report generation started in ${format} format`);
  };

  const handleScheduleReport = (reportId: string) => {
    console.log(`Scheduling report ${reportId}`);
    alert('تم جدولة التقرير - Report scheduled successfully');
  };

  return (
    <div className="container mx-auto py-4 space-y-6">
      <PageHeader
        title="التقارير والتحليلات - Reports & Analytics"
        description="إنشاء وتحميل التقارير بصيغ مختلفة - Generate and download reports in various formats"
        className="mb-8"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">التقارير المتاحة</p>
                <p className="text-xs text-gray-500">Available Reports</p>
                <p className="text-2xl font-bold text-blue-600">{reportTemplates.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تم إنشاؤها هذا الشهر</p>
                <p className="text-xs text-gray-500">Generated This Month</p>
                <p className="text-2xl font-bold text-green-600">24</p>
              </div>
              <Download className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">التقارير المجدولة</p>
                <p className="text-xs text-gray-500">Scheduled Reports</p>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تقارير مخصصة</p>
                <p className="text-xs text-gray-500">Custom Reports</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
              </div>
              <Settings className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Filter className="h-5 w-5" />
            <span>إعدادات التقرير - Report Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="report-type">نوع التقرير - Report Type</Label>
              <select 
                id="report-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">جميع التقارير - All Reports</option>
                <option value="financial">مالي - Financial</option>
                <option value="workflow">سير العمل - Workflow</option>
                <option value="operational">تشغيلي - Operational</option>
                <option value="custom">مخصص - Custom</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="start-date">تاريخ البداية - Start Date</Label>
              <Input 
                id="start-date"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="end-date">تاريخ النهاية - End Date</Label>
              <Input 
                id="end-date"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
            
            <div className="flex items-end">
              <Button className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                تطبيق الفلتر - Apply Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>قوالب التقارير - Report Templates ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <report.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{report.name}</h3>
                        <p className="text-sm text-gray-600">{report.nameAr}</p>
                      </div>
                    </div>
                    <Badge className={getTypeColor(report.type)}>
                      {report.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700">{report.description}</p>
                    <p className="text-sm text-gray-500 mt-1">{report.descriptionAr}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">التكرار - Frequency:</span>
                      <span className="ml-2 font-medium">{report.frequency}</span>
                    </div>
                    {report.lastGenerated && (
                      <div>
                        <span className="text-gray-500">آخر إنشاء - Last:</span>
                        <span className="ml-2 font-medium">{report.lastGenerated}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {report.formats.map((format) => (
                        <Button
                          key={format}
                          size="sm"
                          variant="outline"
                          onClick={() => handleGenerateReport(report.id, format)}
                          className="text-xs"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          {format}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleScheduleReport(report.id)}
                        className="flex-1"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        جدولة - Schedule
                      </Button>
                      <Button size="sm" variant="outline">
                        <Printer className="h-4 w-4 mr-2" />
                        طباعة - Print
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        إرسال - Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>التقارير الحديثة - Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Financial_Summary_January_2024.pdf', date: '2024-01-15', size: '2.3 MB', type: 'PDF' },
              { name: 'Workflow_Status_Weekly.xlsx', date: '2024-01-14', size: '1.8 MB', type: 'Excel' },
              { name: 'Payment_Analysis_Q1.csv', date: '2024-01-13', size: '856 KB', type: 'CSV' },
              { name: 'Vendor_Performance_2024.pdf', date: '2024-01-12', size: '3.1 MB', type: 'PDF' }
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.date} • {file.size}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Badge variant="outline">{file.type}</Badge>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}