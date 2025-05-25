
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";
import { DesignBuildDocFlow } from "@/components/contractors/DesignBuildDocFlow";
import { TenderManagement } from "@/components/contractors/TenderManagement";
import { SchedulingIntelligence } from "@/components/contractors/SchedulingIntelligence";
import { ClaimsDisputes } from "@/components/contractors/ClaimsDisputes";

const Contractors = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64 overflow-auto">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Contractors</h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            End-to-end contractor workflows, from design-build management to tender management, planning, and dispute resolution.
          </p>
          
          <Tabs defaultValue="design-build" className="w-full">
            <TabsList className="w-full mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <TabsTrigger value="design-build">Design-Build Document Flow</TabsTrigger>
              <TabsTrigger value="tender">Tender Management</TabsTrigger>
              <TabsTrigger value="scheduling">Planning & Scheduling</TabsTrigger>
              <TabsTrigger value="claims">Claims & Disputes</TabsTrigger>
            </TabsList>
            <TabsContent value="design-build">
              <DesignBuildDocFlow />
            </TabsContent>
            <TabsContent value="tender">
              <TenderManagement />
            </TabsContent>
            <TabsContent value="scheduling">
              <SchedulingIntelligence />
            </TabsContent>
            <TabsContent value="claims">
              <ClaimsDisputes />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Contractors;
