
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleContracts } from "@/lib/contracts";
import { formatCurrency } from "@/lib/formatters";
import { generateRiskMonitoringData } from "@/lib/riskMonitoring";

// Components
import RiskMonitoring from "@/components/RiskMonitoring";
import ContractHeader from "@/components/contract/ContractHeader";
import ContractMetrics from "@/components/contract/ContractMetrics";
import ContractOverviewTab from "@/components/contract/tabs/ContractOverviewTab";
import ContractClausesTab from "@/components/contract/tabs/ContractClausesTab";
import ContractVersionHistoryTab from "@/components/contract/tabs/ContractVersionHistoryTab";
import ContractNegotiationTab from "@/components/contract/tabs/ContractNegotiationTab";
import ContractDisputeResolutionTab from "@/components/contract/tabs/ContractDisputeResolutionTab";
import ContractAIChatbot from "@/components/ai/ContractAIChatbot";
import ContractMilestoneTracker from "@/components/ai/ContractMilestoneTracker";
import ContractDocumentComparison from "@/components/ai/ContractDocumentComparison";

const ContractDetails = () => {
  const { id } = useParams<{ id: string }>();
  const contract = sampleContracts.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState("overview");

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Contract Not Found</h2>
            <p className="text-gray-600 mb-6">The contract you're looking for doesn't exist or has been removed.</p>
            <Link to="/contracts">
              <Button>Return to Contracts</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const riskMonitoringData = generateRiskMonitoringData(contract.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <ContractHeader 
            title={contract.title}
            status={contract.status}
            clientName={contract.parties.clientName}
            contractorName={contract.parties.contractorName}
          />

          <ContractMetrics 
            value={contract.value}
            currency={contract.currency}
            versionsCount={contract.versions.length}
          />

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-8 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="clauses">Clauses Analysis</TabsTrigger>
              <TabsTrigger value="risk">Risk & Compliance</TabsTrigger>
              <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
              <TabsTrigger value="disputes">Dispute Resolution</TabsTrigger>
              <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="history">Version History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ContractOverviewTab 
                contract={contract} 
                formatCurrency={formatCurrency} 
              />
            </TabsContent>

            <TabsContent value="clauses" className="space-y-6">
              <ContractClausesTab clauses={contract.clauses} />
            </TabsContent>

            <TabsContent value="risk" className="space-y-6">
              <RiskMonitoring {...riskMonitoringData} />
            </TabsContent>

            <TabsContent value="negotiation" className="space-y-6">
              <ContractNegotiationTab />
            </TabsContent>
            
            <TabsContent value="disputes" className="space-y-6">
              <ContractDisputeResolutionTab />
            </TabsContent>

            <TabsContent value="ai-assistant" className="space-y-6">
              <div className="h-[600px]">
                <ContractAIChatbot 
                  contractId={contract.id}
                  initialMessage={`Hello! I can help you with questions about the "${contract.title}" contract. Feel free to ask about payment terms, warranties, or any specific clauses.`}
                />
              </div>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-6">
              <ContractMilestoneTracker contractId={contract.id} />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <ContractVersionHistoryTab versions={contract.versions} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ContractDetails;
