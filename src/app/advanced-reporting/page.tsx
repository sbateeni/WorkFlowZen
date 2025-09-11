"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/lib/language-context';
import { useMobile } from '@/hooks/use-mobile';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Table,
  FileSpreadsheet,
  FileImage,
  Printer,
  Share2,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function AdvancedReporting() {
  const { t, isRTL } = useLanguage();
  const { isMobile } = useMobile();
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [exportFormat, setExportFormat] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { id: 'workflow', name: t('Workflow Performance Report', 'تقرير أداء سير العمل'), icon: TrendingUp },
    { id: 'financial', name: t('Financial Summary Report', 'تقرير الملخص المالي'), icon: PieChart },
    { id: 'employee', name: t('Employee Activity Report', 'تقرير نشاط الموظفين'), icon: BarChart3 },
    { id: 'compliance', name: t('Compliance Audit Report', 'تقرير مراجعة الامتثال'), icon: CheckCircle },
    { id: 'asset', name: t('Asset Utilization Report', 'تقرير استخدام الأصول'), icon: Table },
    { id: 'vendor', name: t('Vendor Performance Report', 'تقرير أداء المورد'), icon: FileSpreadsheet }
  ];

  const exportFormats = [
    { id: 'pdf', name: 'PDF', icon: FileText },
    { id: 'excel', name: 'Excel', icon: FileSpreadsheet },
    { id: 'csv', name: 'CSV', icon: Table },
    { id: 'image', name: 'PNG', icon: FileImage }
  ];

  const recentReports = [
    { id: 1, name: t('Monthly Workflow Report', 'تقرير سير العمل الشهري'), type: 'Workflow', date: '2024-01-15', status: 'completed', size: '2.4 MB' },
    { id: 2, name: t('Q4 Financial Summary', 'ملخص الربع الرابع المالي'), type: 'Financial', date: '2024-01-10', status: 'completed', size: '1.8 MB' },
    { id: 3, name: t('Employee Performance Review', 'مراجعة أداء الموظفين'), type: 'Employee', date: '2024-01-08', status: 'processing', size: '3.2 MB' },
    { id: 4, name: t('Compliance Audit Q4', 'مراجعة الامتثال الربع الرابع'), type: 'Compliance', date: '2024-01-05', status: 'failed', size: '0 MB' },
  ];

  const generateReport = async () => {
    if (!selectedReport || !dateRange || !exportFormat) return;
    
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    
    // In a real app, this would trigger the actual report generation
    alert(t('Report generated successfully!', 'تم إنشاء التقرير بنجاح!'));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('Advanced Reporting & Data Export', 'التقارير المتقدمة وتصدير البيانات')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('Generate comprehensive reports and export data in multiple formats', 
               'إنشاء تقارير شاملة وتصدير البيانات بتنسيقات متعددة')}
          </p>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${isMobile ? 'text-sm' : ''}`}>
            <TabsTrigger value="generate">{t('Generate Report', 'إنشاء تقرير')}</TabsTrigger>
            <TabsTrigger value="templates">{t('Templates', 'القوالب')}</TabsTrigger>
            <TabsTrigger value="history">{t('History', 'السجل')}</TabsTrigger>
          </TabsList>

          {/* Generate Report Tab */}
          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('Report Configuration', 'تكوين التقرير')}
                </CardTitle>
                <CardDescription>
                  {t('Configure your report parameters and generate custom reports', 
                     'تكوين معاملات التقرير وإنشاء تقارير مخصصة')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
                  {/* Report Type Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="reportType">{t('Report Type', 'نوع التقرير')}</Label>
                    <Select value={selectedReport} onValueChange={setSelectedReport}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('Select report type', 'اختر نوع التقرير')} />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTypes.map((report) => (
                          <SelectItem key={report.id} value={report.id}>
                            <div className="flex items-center gap-2">
                              <report.icon className="h-4 w-4" />
                              {report.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Range */}
                  <div className="space-y-2">
                    <Label htmlFor="dateRange">{t('Date Range', 'النطاق الزمني')}</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('Select date range', 'اختر النطاق الزمني')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">{t('Today', 'اليوم')}</SelectItem>
                        <SelectItem value="week">{t('This Week', 'هذا الأسبوع')}</SelectItem>
                        <SelectItem value="month">{t('This Month', 'هذا الشهر')}</SelectItem>
                        <SelectItem value="quarter">{t('This Quarter', 'هذا الربع')}</SelectItem>
                        <SelectItem value="year">{t('This Year', 'هذا العام')}</SelectItem>
                        <SelectItem value="custom">{t('Custom Range', 'نطاق مخصص')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Export Format */}
                  <div className="space-y-2">
                    <Label htmlFor="exportFormat">{t('Export Format', 'تنسيق التصدير')}</Label>
                    <Select value={exportFormat} onValueChange={setExportFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('Select format', 'اختر التنسيق')} />
                      </SelectTrigger>
                      <SelectContent>
                        {exportFormats.map((format) => (
                          <SelectItem key={format.id} value={format.id}>
                            <div className="flex items-center gap-2">
                              <format.icon className="h-4 w-4" />
                              {format.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">{t('Additional Filters', 'مرشحات إضافية')}</h3>
                  <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
                    <div className="space-y-2">
                      <Label>{t('Department', 'القسم')}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t('All Departments', 'جميع الأقسام')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t('All Departments', 'جميع الأقسام')}</SelectItem>
                          <SelectItem value="hr">{t('Human Resources', 'الموارد البشرية')}</SelectItem>
                          <SelectItem value="finance">{t('Finance', 'المالية')}</SelectItem>
                          <SelectItem value="it">{t('IT', 'تقنية المعلومات')}</SelectItem>
                          <SelectItem value="operations">{t('Operations', 'العمليات')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{t('Status', 'الحالة')}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t('All Status', 'جميع الحالات')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t('All Status', 'جميع الحالات')}</SelectItem>
                          <SelectItem value="completed">{t('Completed', 'مكتمل')}</SelectItem>
                          <SelectItem value="pending">{t('Pending', 'معلق')}</SelectItem>
                          <SelectItem value="in-progress">{t('In Progress', 'قيد التنفيذ')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{t('Priority', 'الأولوية')}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t('All Priorities', 'جميع الأولويات')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t('All Priorities', 'جميع الأولويات')}</SelectItem>
                          <SelectItem value="high">{t('High', 'عالية')}</SelectItem>
                          <SelectItem value="medium">{t('Medium', 'متوسطة')}</SelectItem>
                          <SelectItem value="low">{t('Low', 'منخفضة')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{t('Amount Range', 'نطاق المبلغ')}</Label>
                      <Input placeholder={t('Min - Max', 'الحد الأدنى - الحد الأقصى')} />
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center">
                  <Button 
                    onClick={generateReport}
                    disabled={!selectedReport || !dateRange || !exportFormat || isGenerating}
                    size="lg"
                    className="px-8"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t('Generating...', 'جاري الإنشاء...')}
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        {t('Generate Report', 'إنشاء التقرير')}
                      </>
                    )}
                  </Button>
                </div>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{t('Generating report...', 'جاري إنشاء التقرير...')}</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
              {reportTypes.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <report.icon className="h-5 w-5" />
                      {report.name}
                    </CardTitle>
                    <CardDescription>
                      {t('Pre-configured template with standard metrics', 
                         'قالب مُعد مسبقاً مع المقاييس القياسية')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        {t('Preview', 'معاينة')}
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        {t('Use Template', 'استخدام القالب')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('Report History', 'سجل التقارير')}</CardTitle>
                <CardDescription>
                  {t('View and download previously generated reports', 
                     'عرض وتحميل التقارير المُنشأة سابقاً')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(report.status)}
                        <div>
                          <h3 className="font-medium">{report.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{report.type}</span>
                            <span>{report.date}</span>
                            <span>{report.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {report.status === 'completed' && (
                          <>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              {t('View', 'عرض')}
                            </Button>
                            <Button size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              {t('Download', 'تحميل')}
                            </Button>
                          </>
                        )}
                        {report.status === 'processing' && (
                          <Badge variant="outline" className="text-yellow-600">
                            {t('Processing', 'قيد المعالجة')}
                          </Badge>
                        )}
                        {report.status === 'failed' && (
                          <Badge variant="destructive">
                            {t('Failed', 'فشل')}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}