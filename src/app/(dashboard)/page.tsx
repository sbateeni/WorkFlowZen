export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">WorkFlowZen Dashboard</h1>
      <p className="text-gray-600">نظام إدارة سير العمل - تتبع ومراقبة جميع العمليات</p>
      
      <div className="grid gap-4">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Workflow Steps</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span>خطوة 1: إرسال إيميل استشارة للعميل</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">مكتمل</span>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span>خطوة 2: إدخال البيانات والوثائق المطلوبة</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">جاري</span>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span>خطوة 3: تقديم طلب أمر الشراء</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">معلق</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}