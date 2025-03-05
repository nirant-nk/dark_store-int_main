
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ArrowLeftRight, 
  BarChart3, 
  Box, 
  ChevronLeft, 
  Cog, 
  Home, 
  Layers, 
  Truck, 
  Users, 
  PackageOpen,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set CSS variable for the sidebar width
    document.documentElement.style.setProperty(
      '--sidebar-width', 
      isOpen ? '240px' : '64px'
    );
    
    return () => {
      document.documentElement.style.removeProperty('--sidebar-width');
    };
  }, [isOpen]);

  if (!mounted) return null;

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Box, label: "Inventory", path: "/inventory" },
    { icon: ClipboardList, label: "Orders", path: "/orders" },
    { icon: Layers, label: "Warehouse", path: "/warehouse" },
    { icon: Users, label: "Staff", path: "/staff" },
    // { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Cog, label: "Settings", path: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 h-full bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out border-r border-sidebar-border flex flex-col",
        isOpen ? "w-60" : "w-16"
      )}
    >
      <div className={cn(
        "h-14 flex items-center px-4 border-b border-sidebar-border transition-all",
        isOpen ? "justify-between" : "justify-center"
      )}>
        {isOpen ? (
          <>
            <span className="font-medium text-sidebar-foreground">StockPulse</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggle}
              className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <span className="font-bold text-sidebar-primary">D</span>
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 py-2">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-2 py-2 rounded-md transition-all group",
                location.pathname === item.path 
                  ? "bg-sidebar-accent text-sidebar-primary" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                !isOpen && "justify-center"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 shrink-0",
                location.pathname === item.path 
                  ? "text-sidebar-primary" 
                  : "text-sidebar-foreground group-hover:text-sidebar-primary"
              )} />
              
              {isOpen && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t border-sidebar-border p-2">
        <div className={cn(
          "flex items-center rounded-md bg-sidebar-accent/50 p-2 text-xs text-sidebar-foreground/70",
          !isOpen && "justify-center"
        )}>
          {isOpen ? (
            <div className="flex flex-col">
              <span className="text-xs font-medium">Int Main v1.0</span>
              <span className="text-2xs text-sidebar-foreground/50">© 2025 Int Main Inc.</span>
            </div>
          ) : (
            <span className="text-2xs">v1.0</span>
          )}
        </div>
      </div>
    </aside>
  );
}
