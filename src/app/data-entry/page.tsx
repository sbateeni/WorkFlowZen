"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  FileText, 
  Upload, 
  Search, 
  Download, 
  Trash2, 
  Eye, 
  File, 
  Image, 
  FileSpreadsheet,
  Plus,
  Filter
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface DocumentData {
  title: string;
  description: string;
  category: string;
  tags: string;
  file?: File;
}

interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  fileType: string;
  size: string;
  uploadedAt: string;
  tags: string[];
  status: "active" | "archived" | "pending";
}

const documentCategories = [
  "عقود - Contracts",
  "فواتير - Invoices", 
  "تقارير - Reports",
  "مراسلات - Correspondence",
  "مستندات قانونية - Legal Documents",
  "مستندات مالية - Financial Documents",
  "أخرى - Others"
];

const sampleDocuments: Document[] = [
  {
    id: 1,
    title: "عقد الخدمة الأساسي",
    description: "عقد تقديم الخدمات التقنية للعميل",
    category: "عقود",
    fileType: "PDF",
    size: "2.3 MB",
    uploadedAt: "2024-01-15",
    tags: ["عقد", "خدمات", "تقني"],
    status: "active"
  },
  {
    id: 2,
    title: "Financial Report Q1",
    description: "Quarterly financial summary and analysis",
    category: "تقارير",
    fileType: "Excel",
    size: "1.8 MB",
    uploadedAt: "2024-01-14",
    tags: ["مالي", "تقرير", "ربعي"],
    status: "active"
  },
  {
    id: 3,
    title: "مراسلة العميل - Project Updates",
    description: "Monthly project progress communication",
    category: "مراسلات",
    fileType: "Word",
    size: "650 KB",
    uploadedAt: "2024-01-13",
    tags: ["مراسلة", "مشروع", "تحديث"],
    status: "pending"
  }
];

export default function DataEntryPage() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [formData, setFormData] = useState<DocumentData>({
    title: "",
    description: "",
    category: "",
    tags: "",
  });

  const handleInputChange = (field: keyof DocumentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newDocument: Document = {
        id: documents.length + 1,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        fileType: formData.file?.type.split('/')[1].toUpperCase() || "Unknown",
        size: formData.file ? `${(formData.file.size / 1024 / 1024).toFixed(1)} MB` : "Unknown",
        uploadedAt: new Date().toISOString().split('T')[0],
        tags: formData.tags.split(',').map(tag => tag.trim()),
        status: "active"
      };

      setDocuments(prev => [newDocument, ...prev]);
      
      toast({
        title: "تم رفع الملف بنجاح",
        description: `تم إضافة "${formData.title}" إلى قاعدة البيانات`,
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        tags: "",
      });
    } catch (error) {
      toast({
        title: "خطأ في رفع الملف",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <File className="h-4 w-4 text-red-500" />;
      case "excel":
      case "xlsx":
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />;
      case "word":
      case "docx":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "jpg":
      case "png":
      case "gif":
        return <Image className="h-4 w-4 text-purple-500" aria-label="Image file" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">نشط</Badge>;
      case "pending":
        return <Badge variant="pending">في الانتظار</Badge>;
      case "archived":
        return <Badge variant="secondary">مؤرشف</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t("dataEntry")}</h1>
            <p className="text-muted-foreground">
              الخطوة الثانية: إدخال البيانات والوثائق المطلوبة
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Document Upload Form */}
          <div className="lg:col-span-1">
            <Card className="mobile-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className={isMobile ? "truncate" : ""}>رفع مستند جديد</span>
                </CardTitle>
                <CardDescription>
                  أضف مستندًا جديدًا إلى قاعدة البيانات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="mobile-form space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان المستند</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="أدخل عنوان المستند"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">الوصف</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="وصف المستند..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">الفئة</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">اختر الفئة</option>
                      {documentCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">العلامات (مفصولة بفاصلة)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => handleInputChange("tags", e.target.value)}
                      placeholder="علامة1, علامة2, علامة3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">رفع الملف</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif"
                    />
                    <p className="text-xs text-muted-foreground">
                      الملفات المسموحة: PDF, Word, Excel, Images (أقصى حجم: 10MB)
                    </p>
                  </div>

                  <Button type="submit" disabled={isUploading} className="w-full mobile-button">
                    {isUploading ? (
                      <>
                        <Upload className="mr-2 h-4 w-4 animate-spin" />
                        جاري الرفع...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        رفع المستند
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Documents Management */}
          <div className="lg:col-span-2">
            <Card className="mobile-card">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">إدارة المستندات</CardTitle>
                <CardDescription>
                  البحث والإدارة لجميع المستندات المرفوعة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث في المستندات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-48">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">جميع الفئات</option>
                      {documentCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Documents Table */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto mobile-scroll">
                    <Table className={isMobile ? "mobile-table" : ""}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المستند</TableHead>
                        <TableHead>الفئة</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>الحجم</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-start gap-2">
                              {getFileIcon(doc.fileType)}
                              <div>
                                <p className="font-medium text-xs sm:text-sm">{doc.title}</p>
                                <p className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-[200px]">
                                  {isMobile ? doc.description.substring(0, 20) + '...' : doc.description}
                                </p>
                                <div className="flex gap-1 mt-1">
                                  {doc.tags.slice(0, 2).map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {doc.tags.length > 2 && (
                                    <Badge variant="outline" className="text-xs px-1 py-0">
                                      +{doc.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{doc.category}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{doc.fileType}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{doc.size}</TableCell>
                          <TableCell className="text-sm">{doc.uploadedAt}</TableCell>
                          <TableCell>{getStatusBadge(doc.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive mobile-button p-1 sm:p-2">
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    </Table>
                  </div>
                </div>

                {filteredDocuments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد مستندات مطابقة للبحث</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
          <Card className="mobile-card">
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">إجمالي المستندات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-primary">{documents.length}</div>
              <p className="text-xs text-muted-foreground">مستند مرفوع</p>
            </CardContent>
          </Card>
          
          <Card className="mobile-card">
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">المستندات النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {documents.filter(d => d.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">نشط</p>
            </CardContent>
          </Card>
          
          <Card className="mobile-card">
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">في الانتظار</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-orange-600">
                {documents.filter(d => d.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">معلق</p>
            </CardContent>
          </Card>
          
          <Card className="mobile-card">
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">الحجم الإجمالي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-blue-600">4.8 MB</div>
              <p className="text-xs text-muted-foreground">مساحة مستخدمة</p>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}