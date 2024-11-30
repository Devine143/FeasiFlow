import { LayoutDashboardIcon, Settings2Icon, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboardIcon, label: "Dashboard", path: "/" },
    { icon: Settings2Icon, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className={cn(
            "flex items-center gap-2 mb-6",
            isCollapsed ? "justify-center px-0" : "px-4"
          )}>
            <Building2 className="h-8 w-8 text-primary" />
            {!isCollapsed && <h2 className="text-lg font-semibold">FeasiFlow</h2>}
          </div>
          <div className="space-y-2">
            {menuItems.map((item) => (
              <TooltipProvider key={item.path} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={item.path}>
                      <Button
                        variant={location.pathname === item.path ? "secondary" : "ghost"}
                        className={cn(
                          "w-full h-12",
                          isCollapsed ? "justify-center px-2" : "justify-start gap-3 px-4"
                        )}
                      >
                        <item.icon className={cn(
                          "transition-all",
                          isCollapsed ? "h-6 w-6" : "h-5 w-5"
                        )} />
                        {!isCollapsed && <span className="text-sm">{item.label}</span>}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right" className="text-sm font-medium">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}