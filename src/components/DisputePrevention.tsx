
import { MessageSquare, AlertTriangle, ArrowUp, ArrowDown, Lightbulb, FileText, Clock, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface DisputeRisk {
  id: string;
  contractId: string;
  contractTitle: string;
  riskType: "payment" | "delay" | "scope" | "quality";
  riskLevel: "low" | "medium" | "high";
  probability: number;
  impact: number;
  description: string;
  aiRecommendation: string;
  precedents?: number;
}

const DisputePrevention = () => {
  const disputeRisks: DisputeRisk[] = [
    {
      id: "dr1",
      contractId: "c001",
      contractTitle: "Downtown Office Tower Construction",
      riskType: "payment",
      riskLevel: "high",
      probability: 75,
      impact: 85,
      description: "High risk of payment disputes based on unclear payment milestone definitions in contract section 4.2.",
      aiRecommendation: "Revise payment terms to include specific, measurable completion criteria for each milestone.",
      precedents: 8
    },
    {
      id: "dr2",
      contractId: "c003",
      contractTitle: "Hospital Renovation Project",
      riskType: "delay",
      riskLevel: "medium",
      probability: 60,
      impact: 70,
      description: "Medium risk of delays due to potential supply chain issues for specialized medical equipment.",
      aiRecommendation: "Add contingency clauses for supply chain disruptions and identify alternative suppliers.",
      precedents: 12
    },
    {
      id: "dr3",
      contractId: "c005",
      contractTitle: "Waterfront Residential Development",
      riskType: "scope",
      riskLevel: "high",
      probability: 80,
      impact: 65,
      description: "High risk of scope disputes due to ambiguous specifications in landscape and exterior finish work.",
      aiRecommendation: "Create detailed specifications with visual references and specific materials list for landscape work.",
      precedents: 15
    },
    {
      id: "dr4",
      contractId: "c002",
      contractTitle: "Municipal Bridge Repair",
      riskType: "quality",
      riskLevel: "low",
      probability: 25,
      impact: 90,
      description: "Low probability but high impact quality concerns based on historical performance of concrete supplier.",
      aiRecommendation: "Implement enhanced testing protocol for concrete deliveries and maintain detailed documentation.",
      precedents: 3
    },
  ];

  const disputeStats = {
    predicted: 12,
    resolved: 8,
    active: 4,
    preventionRate: 72,
    commonTypes: [
      { type: "Payment", percentage: 45 },
      { type: "Delay", percentage: 30 },
      { type: "Scope Change", percentage: 15 },
      { type: "Quality", percentage: 10 },
    ]
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskTypeIcon = (type: string) => {
    switch (type) {
      case "payment": return <FileText className="h-5 w-5 text-blue-600" />;
      case "delay": return <Clock className="h-5 w-5 text-yellow-600" />;
      case "scope": return <BarChart3 className="h-5 w-5 text-purple-600" />;
      case "quality": return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Predicted Disputes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disputeStats.predicted}</div>
            <p className="text-xs text-muted-foreground">
              Based on AI analysis of contract terms and project data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dispute Prevention Rate</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disputeStats.preventionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Successfully prevented through early intervention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disputeStats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently in negotiation or mediation process
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Common Dispute Types</CardTitle>
          <CardDescription>Historical analysis of dispute categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disputeStats.commonTypes.map((type) => (
              <div key={type.type} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{type.type}</span>
                  <span className="text-sm font-medium">{type.percentage}%</span>
                </div>
                <Progress value={type.percentage} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI-Predicted Dispute Risks</CardTitle>
          <CardDescription>Based on contract analysis and historical legal precedents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {disputeRisks.map((risk) => (
              <div key={risk.id} className="border rounded-lg p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      {getRiskTypeIcon(risk.riskType)}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-medium">{risk.contractTitle}</h4>
                          <Badge className={getRiskLevelColor(risk.riskLevel)}>
                            {risk.riskLevel.charAt(0).toUpperCase() + risk.riskLevel.slice(1)} Risk
                          </Badge>
                          <span className="text-sm text-gray-500">Contract #{risk.contractId}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{risk.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Probability</span>
                              <span className="text-sm">{risk.probability}%</span>
                            </div>
                            <Progress value={risk.probability} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Impact</span>
                              <span className="text-sm">{risk.impact}%</span>
                            </div>
                            <Progress value={risk.impact} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-md">
                          <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong className="text-sm">AI Recommendation:</strong>
                            <p className="text-sm">{risk.aiRecommendation}</p>
                          </div>
                        </div>
                        
                        {risk.precedents && (
                          <div className="mt-3 text-sm text-gray-600">
                            Based on {risk.precedents} similar historical cases
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col gap-2 justify-end">
                    <Button size="sm">
                      Review Contract
                    </Button>
                    <Button variant="outline" size="sm">
                      Add to Action Plan
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisputePrevention;
