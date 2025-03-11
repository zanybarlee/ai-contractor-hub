
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import RiskMonitoring from "@/components/RiskMonitoring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComplianceMonitoring from "@/components/ComplianceMonitoring";
import DisputePrevention from "@/components/DisputePrevention";

const RiskManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const riskMonitoringData = {
    contractId: "all",
    riskScore: 75,
    complianceScore: 85,
    alerts: [
      {
        id: '1',
        type: 'risk' as const,
        severity: 'high' as const,
        message: 'Multiple contracts have liquidated damages clauses exceeding industry standards',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        type: 'compliance' as const,
        severity: 'medium' as const,
        message: 'New building code updates affect 3 active contracts',
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        type: 'dispute' as const,
        severity: 'low' as const,
        message: 'AI analysis predicts potential payment disputes in upcoming projects',
        timestamp: new Date().toISOString(),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Risk Management & Compliance</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="disputes">Dispute Prevention</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <RiskMonitoring {...riskMonitoringData} />
            </TabsContent>

            <TabsContent value="compliance">
              <ComplianceMonitoring />
            </TabsContent>

            <TabsContent value="disputes">
              <DisputePrevention />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default RiskManagement;
