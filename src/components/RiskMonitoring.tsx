
import { AlertTriangle, ShieldCheck, Scale, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RiskMonitoringProps {
  contractId: string;
  riskScore: number;
  complianceScore: number;
  alerts: {
    id: string;
    type: 'risk' | 'compliance' | 'dispute';
    severity: 'low' | 'medium' | 'high';
    message: string;
    timestamp: string;
  }[];
}

const RiskMonitoring = ({ contractId, riskScore, complianceScore, alerts }: RiskMonitoringProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className={getScoreColor(riskScore)}>{riskScore}%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Based on AI analysis of contract terms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className={getScoreColor(complianceScore)}>{complianceScore}%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Regulatory compliance status
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk & Compliance Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-4 rounded-lg border"
              >
                {alert.type === 'risk' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                {alert.type === 'compliance' && <ShieldCheck className="h-5 w-5 text-green-600" />}
                {alert.type === 'dispute' && <Scale className="h-5 w-5 text-blue-600" />}
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={cn("capitalize", getSeverityColor(alert.severity))}>
                      {alert.severity}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(alert.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{alert.message}</p>
                </div>
                
                <Button variant="outline" size="sm">
                  Take Action
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskMonitoring;
