import { LayoutDashboardIcon, Settings2Icon, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboardIcon, label: "Dashboard", path: "/" },
    { icon: Settings2Icon, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-6 px-4">
            <Building2 className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">FeasiFlow</h2>
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-2")}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}