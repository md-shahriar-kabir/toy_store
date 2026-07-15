import DashboardSidebar from "@/components/shared/dashboardSidebar/DashboardSidebar";
import { GradientBackground } from "@/components/ui/gradient-background";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <div className=" h-screen sticky top-0">
        <DashboardSidebar />
      </div>
      <main className="relative">
        <div className="absolute inset-0 blur-2xl -z-1 opacity-40">
          <GradientBackground />
        </div>

        {children}
      </main>
    </div>
  );
}
