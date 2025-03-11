import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, FileText, AlertTriangle, History, MessageSquare, Download, Share2, Pencil } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { sampleContracts } from "@/lib/contracts";
import { cn } from "@/lib/utils";
import RiskMonitoring from "@/components/RiskMonitoring";

const ContractDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const contract = sampleContracts.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState("overview");
  const [negotiationComments, setNegotiationComments] = useState("");

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

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getRiskClass = (score: number) => {
    if (score < 30) return "bg-green-100 text-green-800";
    if (score < 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const handleNegotiationSend = () => {
    if (negotiationComments.trim() === "") return;
    
    toast({
      title: "Negotiation Comment Sent",
      description: "Your comment has been shared with the project team.",
    });
    setNegotiationComments("");
  };

  const handleGenerateAlternative = (clauseId: string) => {
    toast({
      title: "Alternative Generated",
      description: "AI has generated an alternative clause for review.",
    });
  };

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
          <div className="mb-6">
            <Link to="/contracts" className="text-sm text-gray-600 flex items-center hover:text-gray-900">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Contracts
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-gray-900">{contract.title}</h2>
                <Badge className={cn(
                  "ml-2",
                  contract.status === "Draft" ? "bg-gray-200 text-gray-800" :
                  contract.status === "Under Review" ? "bg-blue-100 text-blue-800" :
                  contract.status === "Negotiating" ? "bg-yellow-100 text-yellow-800" :
                  contract.status === "Signed" ? "bg-green-100 text-green-800" :
                  "bg-red-100 text-red-800"
                )}>
                  {contract.status}
                </Badge>
              </div>
              <p className="text-gray-600 mt-1">
                {contract.parties.clientName} • {contract.parties.contractorName}
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button size="sm" className="gap-2">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-50">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contract Value</p>
                    <h3 className="text-xl font-semibold text-gray-900 mt-1">
                      {formatCurrency(contract.value, contract.currency)}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-yellow-50">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Risk Score</p>
                    <h3 className="text-xl font-semibold text-gray-900 mt-1">
                      Medium Risk
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-50">
                    <History className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Versions</p>
                    <h3 className="text-xl font-semibold text-gray-900 mt-1">
                      {contract.versions.length} Revisions
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
              {contract.clauses.map((clause) => (
                <Card key={clause.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">{clause.title}</h3>
                        <Badge className={cn("ml-2", getRiskClass(clause.riskScore))}>
                          {clause.riskScore < 30 ? "Low" : clause.riskScore < 70 ? "Medium" : "High"} Risk
                        </Badge>
                      </div>
                      <div className="text-gray-700 mb-4">
                        {clause.content}
                      </div>
                    </div>
                    {(clause.recommendations || clause.alternatives) && (
                      <div className="bg-gray-50 p-6 border-t">
                        {clause.recommendations && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">AI Recommendations</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                              {clause.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {clause.alternatives && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Alternative Clauses</h4>
                            <div className="space-y-2">
                              {clause.alternatives.map((alt, index) => (
                                <div key={index} className="p-3 bg-white border rounded-md text-sm text-gray-700">
                                  {alt}
                                  <div className="mt-2 flex justify-end">
                                    <Button variant="outline" size="sm">Replace with This</Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {!clause.alternatives && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleGenerateAlternative(clause.id)}
                            className="mt-2"
                          >
                            Generate Alternative
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="risk" className="space-y-6">
              <RiskMonitoring
                contractId={contract.id}
                {...riskMonitoringData}
              />
            </TabsContent>

            <TabsContent value="negotiation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Negotiation Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-900">AI Negotiation Assistant</p>
                          <p className="text-sm text-blue-700 mt-1">
                            Based on the contract analysis, these are the key negotiation points:
                          </p>
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-blue-700">
                            <li>The liquidated damages clause ($5,000/day) is above industry standard for this project size</li>
                            <li>Payment terms (30 days) could be negotiated to 14 days to improve cash flow</li>
                            <li>Consider adding a cap on total liquidated damages (typically 5-10% of contract value)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-yellow-900">Counter Proposal Detection</p>
                          <p className="text-sm text-yellow-700 mt-1">
                            Client proposed changes to Clause 2 (Liquidated Damages) could increase your financial exposure by approximately {formatCurrency(contract.value * 0.03, contract.currency)}.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Negotiation Comments</h3>
                      <Textarea
                        placeholder="Add your negotiation notes or questions here..."
                        className="min-h-[120px]"
                        value={negotiationComments}
                        onChange={(e) => setNegotiationComments(e.target.value)}
                      />
                      <div className="flex justify-end mt-2">
                        <Button onClick={handleNegotiationSend}>
                          Send Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
