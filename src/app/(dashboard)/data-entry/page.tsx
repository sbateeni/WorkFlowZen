'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Image, 
  Search, 
  Download,
  Trash2,
  Eye,
  Filter
} from 'lucide-react';
import { useState } from 'react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
  tags: string[];
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Contract_Agreement_2024.pdf',
    type: 'PDF',
    size: '2.5 MB',
    uploadDate: '2024-01-15',
    category: 'Contracts',
    tags: ['Contract', 'Legal', '2024']
  },
  {
    id: '2',
    name: 'Invoice_12345.pdf',
    type: 'PDF', 
    size: '1.2 MB',
    uploadDate: '2024-01-14',
    category: 'Invoices',
    tags: ['Invoice', 'Finance']
  },
  {
    id: '3',
    name: 'Project_Proposal.docx',
    type: 'DOCX',
    size: '5.8 MB', 
    uploadDate: '2024-01-13',
    category: 'Proposals',
    tags: ['Proposal', 'Project']
  }
];

export default function DataEntryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(documents.map(doc => doc.category)))];

  return (
    <div className="container mx-auto py-4 space-y-6">
      <PageHeader
        title="إدخال البيانات والوثائق - Data & Documents Entry"
        description="رفع وإدارة الملفات والمستندات - Upload and manage files and documents"
        className="mb-8"
      />

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Upload className="h-5 w-5" />
            <span>رفع الملفات - Upload Files</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              اسحب وأفلت الملفات هنا أو انقر للتصفح
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop files here or click to browse
            </p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              اختر الملفات - Choose Files
            </Button>
            <p className="text-xs text-gray-400 mt-2">
              PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max: 10MB)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">الفئة - Category</Label>
              <select 
                id="category"
                className="w-full p-2 border rounded-md"
              >
                <option value="">اختر الفئة - Select Category</option>
                <option value="contracts">العقود - Contracts</option>
                <option value="invoices">الفواتير - Invoices</option>
                <option value="proposals">المقترحات - Proposals</option>
                <option value="reports">التقارير - Reports</option>
                <option value="other">أخرى - Other</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="tags">العلامات - Tags</Label>
              <Input 
                id="tags"
                placeholder="أدخل العلامات مفصولة بفواصل - Enter tags separated by commas"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">الوصف - Description</Label>
            <Textarea 
              id="description"
              placeholder="وصف الملف أو ملاحظات إضافية - File description or additional notes"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Search className="h-5 w-5" />
            <span>البحث والتصفية - Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الملفات والعلامات - Search files and tags"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'جميع الفئات - All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              تصفية متقدمة - Advanced Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2 rtl:space-x-reverse">
              <FileText className="h-5 w-5" />
              <span>المستندات المحفوظة - Saved Documents ({filteredDocuments.length})</span>
            </span>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              تصدير القائمة - Export List
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      {doc.type === 'PDF' ? (
                        <FileText className="h-8 w-8 text-red-600" />
                      ) : doc.type.includes('image') ? (
                        <Image className="h-8 w-8 text-green-600" />
                      ) : (
                        <FileText className="h-8 w-8 text-blue-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{doc.name}</h3>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-gray-500 mt-1">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.uploadDate}</span>
                        <span>•</span>
                        <Badge variant="secondary" className="text-xs">
                          {doc.category}
                        </Badge>
                      </div>
                      <div className="flex space-x-1 rtl:space-x-reverse mt-2">
                        {doc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>لا توجد مستندات تطابق البحث</p>
                <p className="text-sm">No documents match your search</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}