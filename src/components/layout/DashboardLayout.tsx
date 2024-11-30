import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "../theme/ThemeToggle";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div
        className={cn(
          "border-r bg-background transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <Sidebar isCollapsed={isCollapsed} />
      </div>
      <main className="flex-1">
        <div className="flex items-center justify-between p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
          <ThemeToggle />
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}