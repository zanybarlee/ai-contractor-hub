
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  BarChart,
  TrendingDown,
  TrendingUp,
  Calendar,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Risk {
  id: string;
  title: string;
  project: string;
  severity: "low" | "medium" | "high" | "critical";
  category: string;
  status: "open" | "mitigating" | "resolved";
  probability: number;
  impact: number;
  description: string;
  detectedDate: string;
  assignedTo?: string;
}

export const RiskMonitor = () => {
  // Mock risk data
  const risks: Risk[] = [
    {
      id: "risk1",
      title: "Supply chain disruption",
      project: "Project A",
      severity: "high",
      category: "Procurement",
      status: "mitigating",
      probability: 70,
      impact: 80,
      description: "Key materials delayed by 3 weeks due to international shipping issues",
      detectedDate: "2023-08-01",
      assignedTo: "Sarah Johnson"
    },
    {
      id: "risk2",
      title: "Unclear scope definition",
      project: "Project B",
      severity: "critical",
      category: "Contractual",
      status: "open",
      probability: 90,
      impact: 85,
      description: "Client expectations not aligned with contract specifications",
      detectedDate: "2023-08-05"
    },
    {
      id: "risk3",
      title: "Regulatory compliance issues",
      project: "Project C",
      severity: "medium",
      category: "Legal",
      status: "open",
      probability: 50,
      impact: 90,
      description: "New environmental regulations may affect project timeline",
      detectedDate: "2023-07-28",
      assignedTo: "Michael Chen"
    },
    {
      id: "risk4",
      title: "Budget overrun",
      project: "Project D",
      severity: "low",
      category: "Financial",
      status: "resolved",
      probability: 30,
      impact: 60,
      description: "Initial budget projections exceeded by 5%",
      detectedDate: "2023-07-15",
      assignedTo: "David Wilson"
    },
  ];

  // Dashboard stats
  const stats = {
    totalRisks: risks.length,
    openRisks: risks.filter(r => r.status === "open").length,
    mitigatingRisks: risks.filter(r => r.status === "mitigating").length,
    resolvedRisks: risks.filter(r => r.status === "resolved").length,
    highSeverity: risks.filter(r => r.severity === "critical" || r.severity === "high").length
  };

  // Get severity badge
  const getSeverityBadge = (severity: Risk["severity"]) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Critical</Badge>;
      case "high":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Low</Badge>;
    }
  };

  // Get status badge
  const getStatusBadge = (status: Risk["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Open</Badge>;
      case "mitigating":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Mitigating</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Resolved</Badge>;
    }
  };

  // Get risk score and color
  const getRiskScore = (probability: number, impact: number) => {
    const score = (probability * impact) / 100;
    let color = "bg-green-500";
    if (score > 70) color = "bg-red-500";
    else if (score > 40) color = "bg-amber-500";
    else if (score > 20) color = "bg-yellow-500";
    
    return { score, color };
  };

  return (
    <div className="space-y-6">
      {/* Risk stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Risks</p>
                <h3 className="text-2xl font-bold">{stats.totalRisks}</h3>
              </div>
              <div className="bg-blue-50 p-2 rounded-full">
                <AlertCircle size={20} className="text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Open Risks</p>
                <h3 className="text-2xl font-bold">{stats.openRisks}</h3>
              </div>
              <div className="bg-blue-50 p-2 rounded-full">
                <AlertTriangle size={20} className="text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Mitigating</p>
                <h3 className="text-2xl font-bold">{stats.mitigatingRisks}</h3>
              </div>
              <div className="bg-purple-50 p-2 rounded-full">
                <TrendingDown size={20} className="text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <h3 className="text-2xl font-bold">{stats.resolvedRisks}</h3>
              </div>
              <div className="bg-green-50 p-2 rounded-full">
                <CheckCircle2 size={20} className="text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">High Severity</p>
                <h3 className="text-2xl font-bold">{stats.highSeverity}</h3>
              </div>
              <div className="bg-red-50 p-2 rounded-full">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Risk list */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Risk Register</h2>
          <Button className="gap-2">
            <TrendingUp className="h-4 w-4" />
            New Risk
          </Button>
        </div>
        
        {risks.map(risk => {
          const { score, color } = getRiskScore(risk.probability, risk.impact);
          return (
            <Card key={risk.id} className="overflow-hidden">
              <div className={`h-1 ${color}`} />
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex gap-2 mb-1 flex-wrap">
                      {getSeverityBadge(risk.severity)}
                      {getStatusBadge(risk.status)}
                      <Badge variant="outline" className="bg-gray-50">{risk.category}</Badge>
                    </div>
                    <h3 className="font-semibold">{risk.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Project: {risk.project}</p>
                    <p className="text-sm mt-2">{risk.description}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Detected: {risk.detectedDate}
                      </span>
                      {risk.assignedTo && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" /> Assigned to: {risk.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 min-w-[150px] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-100 flex items-center justify-center">
                      <span className="text-lg font-bold">{score.toFixed(0)}</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Risk Score</span>
                    <div className="w-full mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Impact</span>
                        <span>{risk.impact}%</span>
                      </div>
                      <Progress value={risk.impact} className="h-1" />
                    </div>
                    <div className="w-full mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Probability</span>
                        <span>{risk.probability}%</span>
                      </div>
                      <Progress value={risk.probability} className="h-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
