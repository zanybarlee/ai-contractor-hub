import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RiskMonitoring from "@/components/RiskMonitoring";
import ContractHeader from "@/components/contract/ContractHeader";
import ContractMetrics from "@/components/contract/ContractMetrics";
import ContractClausesTab from "@/components/contract/tabs/ContractClausesTab";
import ContractNegotiationTab from "@/components/contract/tabs/ContractNegotiationTab";
import { sampleContracts } from "@/lib/contracts";

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

  const riskMonitoringData = {
    riskScore: 75,
    complianceScore: 85,
    alerts: [
      {
        id: '1',
        type: 'risk' as const,
        severity: 'high' as const,
        message: 'Liquidated damages clause exceeds industry standard by 25%. High risk of dispute.',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        type: 'compliance' as const,
        severity: 'medium' as const,
        message: 'Recent updates to local building codes affect Section 3.2. Review required.',
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        type: 'dispute' as const,
        severity: 'low' as const,
        message: 'AI analysis predicts 15% chance of payment dispute based on similar projects.',
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
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="clauses">Clauses Analysis</TabsTrigger>
              <TabsTrigger value="risk">Risk & Compliance</TabsTrigger>
              <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
              <TabsTrigger value="history">Version History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contract Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">CLIENT</h3>
                      <p className="text-gray-900">{contract.parties.clientName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">CONTRACTOR</h3>
                      <p className="text-gray-900">{contract.parties.contractorName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">TEMPLATE TYPE</h3>
                      <p className="text-gray-900">{contract.templateId}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">VALUE</h3>
                      <p className="text-gray-900">{formatCurrency(contract.value, contract.currency)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">CREATED</h3>
                      <p className="text-gray-900">{new Date(contract.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">LAST UPDATED</h3>
                      <p className="text-gray-900">{new Date(contract.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">CONTRACT SUMMARY (AI GENERATED)</h3>
                    <div className="p-4 bg-gray-50 rounded-lg text-gray-700 text-sm">
                      <p>This agreement is between {contract.parties.clientName} and {contract.parties.contractorName} for the {contract.title} project.</p>
                      <p className="mt-2">Key provisions include:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Payment terms: 30 days from invoice date</li>
                        <li>Liquidated damages: {formatCurrency(5000, contract.currency)} per day for delays</li>
                        <li>Warranty period: 12 months from practical completion</li>
                        <li>Project duration: 18 months from commencement date</li>
                      </ul>
                      <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200 text-yellow-800">
                        <p className="font-medium flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          AI Analysis: Medium Risk Contract
                        </p>
                        <p className="mt-1 text-sm">The liquidated damages clause presents a significant risk factor. Consider negotiating a cap on total damages.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Version History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="space-y-6">
                      {contract.versions.map((version, index) => (
                        <div key={version.id} className="relative pl-10">
                          <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center z-10">
                            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              {new Date(version.createdAt).toLocaleString()}
                            </p>
                            <p className="font-medium mt-1">
                              Version {contract.versions.length - index}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                              {version.changes}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              By {version.createdBy}
                            </p>
                            <div className="mt-2">
                              <Button variant="outline" size="sm">
                                View This Version
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ContractDetails;
