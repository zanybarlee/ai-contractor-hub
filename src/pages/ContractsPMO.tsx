
import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDashboard } from "@/components/pmo/ProjectDashboard";
import { DocumentLibrary } from "@/components/pmo/DocumentLibrary";
import { RiskMonitor } from "@/components/pmo/RiskMonitor";
import { MilestoneTracker } from "@/components/pmo/MilestoneTracker";

const ContractsPMO = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Animation for page load
    const timer = setTimeout(() => {
      document.querySelectorAll('.animate-on-load').forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-4');
        }, i * 100);
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Contracts PMO</h1>
              <p className="text-gray-600 mt-1">
                Portfolio-level visibility across all projects and contracts
              </p>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="dashboard">Multi-Project Dashboard</TabsTrigger>
              <TabsTrigger value="documents">Document Library</TabsTrigger>
              <TabsTrigger value="risks">Risk Monitor</TabsTrigger>
              <TabsTrigger value="milestones">Milestone Tracker</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
              <ProjectDashboard />
            </TabsContent>

            <TabsContent value="documents" className="animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
              <DocumentLibrary />
            </TabsContent>

            <TabsContent value="risks" className="animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
              <RiskMonitor />
            </TabsContent>

            <TabsContent value="milestones" className="animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
              <MilestoneTracker />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ContractsPMO;
