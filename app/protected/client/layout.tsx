import {Footer} from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Suspense fallback={<div className="w-full h-16 bg-background border-b animate-pulse" />}>
          <Navbar />
        </Suspense>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
}
