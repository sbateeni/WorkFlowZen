"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}