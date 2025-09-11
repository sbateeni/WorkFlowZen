import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">WorkFlowZen</h1>
        <p className="text-lg text-muted-foreground">نظام إدارة سير العمل الاحترافي</p>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          ادخل إلى لوحة التحكم
        </Link>
      </div>
    </div>
  );
}