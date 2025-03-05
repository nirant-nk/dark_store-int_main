
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WarehouseMap } from "@/components/dashboard/WarehouseMap";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Animate in
    setLoaded(true);

    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div 
        className="transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? '240px' : '64px' }}
      >
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main 
          className={`px-4 md:px-6 pt-20 pb-6 max-w-[1800px] mx-auto transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <div className="flex items-center mt-1 text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>{formatDate(currentTime)} · {formatTime(currentTime)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 py-1">
                System Status: Operational
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 py-1">
               Active Tasks
              </Badge>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full max-w-lg grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="warehouse">Warehouse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WarehouseMap />
                {/* <AnalyticsCard /> */}
              </div>
            </TabsContent>
            
            <TabsContent value="inventory">
            </TabsContent>
            
            <TabsContent value="orders">
            </TabsContent>
            
            <TabsContent value="warehouse">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WarehouseMap />
                {/* <AnalyticsCard /> */}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
