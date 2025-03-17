
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, FileSearch, FileText, FileWarning, Info, Plus } from "lucide-react";

interface TenderItem {
  id: string;
  name: string;
  client: string;
  dueDate: string;
  status: "draft" | "in-progress" | "submitted" | "awarded" | "lost";
  riskScore: number;
  unusualClauses: number;
  completionPercentage: number;
}

interface RiskItem {
  id: string;
  clause: string;
  section: string;
  description: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
}

export const TenderManagement = () => {
  const tenders: TenderItem[] = [
    {
      id: "t1",
      name: "City Center Office Complex",
      client: "Urban Development Corp",
      dueDate: "2023-09-15",
      status: "in-progress",
      riskScore: 65,
      unusualClauses: 4,
      completionPercentage: 75,
    },
    {
      id: "t2",
      name: "Highway Expansion Project",
      client: "State Transportation Authority",
      dueDate: "2023-10-02",
      status: "draft",
      riskScore: 42,
      unusualClauses: 1,
      completionPercentage: 30,
    },
    {
      id: "t3",
      name: "Municipal Water Treatment Plant",
      client: "City Water Department",
      dueDate: "2023-09-28",
      status: "in-progress",
      riskScore: 78,
      unusualClauses: 7,
      completionPercentage: 60,
    },
    {
      id: "t4",
      name: "University Science Building",
      client: "State University",
      dueDate: "2023-11-10",
      status: "draft",
      riskScore: 35,
      unusualClauses: 0,
      completionPercentage: 15,
    },
  ];

  const riskItems: RiskItem[] = [
    {
      id: "r1",
      clause: "Liquidated Damages",
      section: "8.3",
      description: "Unusually high penalty rate of $25,000 per day without cap",
      severity: "high",
      recommendation: "Negotiate a maximum cap and reduced per-day amount",
    },
    {
      id: "r2",
      clause: "Payment Terms",
      section: "12.1",
      description: "90-day payment terms deviate from standard 30-day industry practice",
      severity: "high",
      recommendation: "Propose 45-day payment terms as compromise",
    },
    {
      id: "r3",
      clause: "Warranty Period",
      section: "14.2",
      description: "Extended warranty of 5 years exceeds standard 2-year coverage",
      severity: "medium",
      recommendation: "Clarify scope of warranty and limit extended coverage to critical components only",
    },
    {
      id: "r4",
      clause: "Force Majeure",
      section: "18.1",
      description: "No pandemic or supply chain disruption provisions",
      severity: "medium",
      recommendation: "Add language to include modern force majeure events",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "submitted": return "bg-purple-100 text-purple-800";
      case "awarded": return "bg-green-100 text-green-800";
      case "lost": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return "text-red-600";
    if (risk >= 50) return "text-amber-600";
    return "text-green-600";
  };
  
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": 
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "medium": 
        return <FileWarning className="h-5 w-5 text-amber-600" />;
      case "low": 
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Tender Management AI Assistant</CardTitle>
            <CardDescription>
              Generate risk-based tender checklists, highlight unusual clauses, and suggest negotiation points.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex justify-end mb-4">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Tender
              </Button>
            </div>
            
            <Tabs defaultValue="active">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active Tenders</TabsTrigger>
                <TabsTrigger value="risks">Clause Risk Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-4">
                {tenders.map(tender => (
                  <Card key={tender.id} className="hover:bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{tender.name}</h3>
                            <Badge className={getStatusColor(tender.status)}>{tender.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-500">Client: {tender.client}</p>
                          <p className="text-sm text-gray-500">Due: {tender.dueDate}</p>
                          
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm font-medium">Completion:</span>
                            <Progress value={tender.completionPercentage} className="h-2 w-24" />
                            <span className="text-xs">{tender.completionPercentage}%</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="bg-gray-50 p-3 rounded text-center min-w-[120px]">
                            <p className="text-sm text-gray-600">Risk Score</p>
                            <p className={`text-xl font-semibold ${getRiskColor(tender.riskScore)}`}>
                              {tender.riskScore}/100
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded text-center min-w-[120px]">
                            <p className="text-sm text-gray-600">Unusual Clauses</p>
                            <p className="text-xl font-semibold text-amber-600">
                              {tender.unusualClauses}
                            </p>
                          </div>
                          
                          <div className="flex items-center mt-2 sm:mt-0">
                            <Button variant="outline" className="gap-2">
                              <FileSearch className="h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="risks">
                <Alert className="mb-6 bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle>Risk Analysis for City Center Office Complex</AlertTitle>
                  <AlertDescription>
                    The AI has identified 4 unusual clauses that deviate from FIDIC standards.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  {riskItems.map(risk => (
                    <Card key={risk.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="mt-1">
                            {getSeverityIcon(risk.severity)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{risk.clause}</h3>
                              <Badge variant="outline">Section {risk.section}</Badge>
                              <Badge className={
                                risk.severity === "high" ? "bg-red-100 text-red-800" :
                                risk.severity === "medium" ? "bg-amber-100 text-amber-800" :
                                "bg-blue-100 text-blue-800"
                              }>
                                {risk.severity} risk
                              </Badge>
                            </div>
                            <p className="text-sm">{risk.description}</p>
                            
                            <div className="mt-3 p-3 bg-green-50 rounded-md flex gap-3">
                              <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                              <p className="text-sm text-green-800">
                                <span className="font-medium">Recommendation:</span> {risk.recommendation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
