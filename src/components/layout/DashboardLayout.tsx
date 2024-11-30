import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "../theme/ThemeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 border-r bg-background">
        <Sidebar />
      </div>
      <main className="flex-1">
        <div className="flex justify-end p-4 border-b">
          <ThemeToggle />
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}