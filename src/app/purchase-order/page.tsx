"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Save, 
  Send, 
  Calculator,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface PurchaseOrderItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: string;
}

interface PurchaseOrderData {
  orderNumber: string;
  supplier: string;
  supplierEmail: string;
  supplierPhone: string;
  orderDate: string;
  expectedDelivery: string;
  priority: string;
  paymentTerms: string;
  notes: string;
  items: PurchaseOrderItem[];
}

const sampleOrders: any[] = [];

export default function PurchaseOrderPage() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PurchaseOrderData>({
    orderNumber: `PO-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    supplier: "",
    supplierEmail: "",
    supplierPhone: "",
    orderDate: new Date().toISOString().split('T')[0],
    expectedDelivery: "",
    priority: "",
    paymentTerms: "",
    notes: "",
    items: []
  });

  const [newItem, setNewItem] = useState<Omit<PurchaseOrderItem, 'id' | 'total'>>({
    description: "",
    quantity: 1,
    unitPrice: 0,
    category: ""
  });

  const handleInputChange = (field: keyof PurchaseOrderData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (field: keyof typeof newItem, value: string | number) => {
    setNewItem(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    if (!newItem.description || newItem.quantity <= 0 || newItem.unitPrice <= 0) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع بيانات الصنف",
        variant: "destructive"
      });
      return;
    }

    const item: PurchaseOrderItem = {
      id: Date.now(),
      ...newItem,
      total: newItem.quantity * newItem.unitPrice
    };

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, item]
    }));

    setNewItem({
      description: "",
      quantity: 1,
      unitPrice: 0,
      category: ""
    });
  };

  const removeItem = (id: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.items.length === 0) {
      toast({
        title: "خطأ في الطلب",
        description: "يجب إضافة عنصر واحد على الأقل",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم إرسال طلب الشراء بنجاح",
        description: `رقم الطلب: ${formData.orderNumber}`,
      });
      
      // Reset form
      setFormData({
        orderNumber: `PO-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        supplier: "",
        supplierEmail: "",
        supplierPhone: "",
        orderDate: new Date().toISOString().split('T')[0],
        expectedDelivery: "",
        priority: "",
        paymentTerms: "",
        notes: "",
        items: []
      });
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="success">موافق عليه</Badge>;
      case "pending":
        return <Badge variant="pending">في الانتظار</Badge>;
      case "rejected":
        return <Badge variant="destructive">مرفوض</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t("purchaseOrder")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            الخطوة الثالثة: تقديم طلب أمر الشراء
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Purchase Order Form */}
        <div className="lg:col-span-2">
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className={isMobile ? "truncate" : ""}>طلب شراء جديد</span>
              </CardTitle>
              <CardDescription>
                أدخل البيانات التي تريد مشاركتها لإنشاء طلب شراء جديد
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="mobile-form space-y-3 sm:space-y-4">
                {/* Order Information */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="orderNumber">رقم الطلب</Label>
                    <Input
                      id="orderNumber"
                      value={formData.orderNumber}
                      onChange={(e) => handleInputChange("orderNumber", e.target.value)}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderDate">تاريخ الطلب</Label>
                    <Input
                      id="orderDate"
                      type="date"
                      value={formData.orderDate}
                      onChange={(e) => handleInputChange("orderDate", e.target.value)}
                    />
                  </div>
                </div>

                {/* Supplier Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">بيانات المورد</h3>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="supplier">اسم المورد</Label>
                      <Input
                        id="supplier"
                        value={formData.supplier}
                        onChange={(e) => handleInputChange("supplier", e.target.value)}
                        placeholder="أدخل اسم المورد"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supplierEmail">البريد الإلكتروني</Label>
                      <Input
                        id="supplierEmail"
                        type="email"
                        value={formData.supplierEmail}
                        onChange={(e) => handleInputChange("supplierEmail", e.target.value)}
                        placeholder="supplier@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="supplierPhone">رقم الهاتف</Label>
                      <Input
                        id="supplierPhone"
                        value={formData.supplierPhone}
                        onChange={(e) => handleInputChange("supplierPhone", e.target.value)}
                        placeholder="+966 50 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedDelivery">تاريخ التسليم المتوقع</Label>
                      <Input
                        id="expectedDelivery"
                        type="date"
                        value={formData.expectedDelivery}
                        onChange={(e) => handleInputChange("expectedDelivery", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">الأولوية</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الأولوية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">منخفضة</SelectItem>
                          <SelectItem value="medium">متوسطة</SelectItem>
                          <SelectItem value="high">عالية</SelectItem>
                          <SelectItem value="urgent">عاجل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Add Items Section */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">إضافة الأصناف</h3>
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="itemDescription">وصف الصنف</Label>
                      <Input
                        id="itemDescription"
                        value={newItem.description}
                        onChange={(e) => handleItemChange("description", e.target.value)}
                        placeholder="وصف الصنف"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="itemQuantity">الكمية</Label>
                      <Input
                        id="itemQuantity"
                        type="number"
                        min="1"
                        value={newItem.quantity}
                        onChange={(e) => handleItemChange("quantity", parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="itemPrice">السعر للوحدة</Label>
                      <Input
                        id="itemPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={newItem.unitPrice}
                        onChange={(e) => handleItemChange("unitPrice", parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="itemCategory">الفئة</Label>
                      <Select value={newItem.category} onValueChange={(value) => handleItemChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equipment">معدات</SelectItem>
                          <SelectItem value="supplies">مستلزمات</SelectItem>
                          <SelectItem value="services">خدمات</SelectItem>
                          <SelectItem value="software">برمجيات</SelectItem>
                          <SelectItem value="other">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="button" onClick={addItem} className="mobile-button">
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة صنف
                  </Button>
                </div>

                {/* Items Table */}
                {formData.items.length > 0 && (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">الأصناف المضافة</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto mobile-scroll">
                        <Table className={isMobile ? "mobile-table" : ""}>
                          <TableHeader>
                            <TableRow>
                              <TableHead>الوصف</TableHead>
                              <TableHead>الكمية</TableHead>
                              <TableHead>السعر</TableHead>
                              <TableHead>المجموع</TableHead>
                              <TableHead>الفئة</TableHead>
                              <TableHead>الإجراءات</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {formData.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.description}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.unitPrice.toFixed(2)} ر.س</TableCell>
                                <TableCell className="font-semibold">{item.total.toFixed(2)} ر.س</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{item.category}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                    className="text-destructive mobile-button p-1 sm:p-2"
                                  >
                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="flex justify-between items-center p-3 sm:p-4 bg-muted rounded-lg">
                      <span className="text-base sm:text-lg font-semibold">المجموع الكلي:</span>
                      <span className="text-lg sm:text-xl font-bold text-primary">
                        {calculateTotal().toFixed(2)} ر.س
                      </span>
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">شروط الدفع</Label>
                    <Select value={formData.paymentTerms} onValueChange={(value) => handleInputChange("paymentTerms", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر شروط الدفع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net30">صافي 30 يوم</SelectItem>
                        <SelectItem value="net60">صافي 60 يوم</SelectItem>
                        <SelectItem value="advance">دفع مقدم</SelectItem>
                        <SelectItem value="cod">دفع عند الاستلام</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات إضافية</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="أضف أي ملاحظات أو تعليمات خاصة..."
                    className="min-h-[80px] sm:min-h-[100px]"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" className="mobile-button order-3 sm:order-1">
                    <Save className="h-4 w-4 mr-2" />
                    حفظ مسودة
                  </Button>
                  <Button type="button" variant="outline" className="mobile-button order-2">
                    إلغاء
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="mobile-button order-1 sm:order-3">
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        إرسال الطلب
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Purchase Order History */}
        <div>
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">الطلبات السابقة</CardTitle>
              <CardDescription>
                آخر طلبات الشراء المرسلة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {sampleOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>لا توجد طلبات سابقة</p>
                  <p className="text-sm">No previous orders</p>
                </div>
              ) : (
                sampleOrders.map((order) => (
                  <div key={order.id} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                    {getStatusIcon(order.status)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs sm:text-sm truncate">
                        {order.orderNumber}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {isMobile ? order.supplier.substring(0, 20) + '...' : order.supplier}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(order.status)}
                        <span className="text-xs text-muted-foreground">
                          {order.createdAt}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs sm:text-sm font-semibold text-primary">
                          {order.total.toFixed(2)} ر.س
                        </span>
                        <span className="text-xs text-muted-foreground">
                          التسليم: {order.expectedDelivery}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mobile-card mt-4 sm:mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">إحصائيات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">الطلبات الكلية</span>
                <span className="font-semibold">{sampleOrders.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">في الانتظار</span>
                <span className="font-semibold text-orange-600">
                  {sampleOrders.filter(o => o.status === 'pending').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">تم الموافقة</span>
                <span className="font-semibold text-green-600">
                  {sampleOrders.filter(o => o.status === 'approved').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي القيمة</span>
                <span className="font-semibold text-primary">
                  {sampleOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)} ر.س
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}