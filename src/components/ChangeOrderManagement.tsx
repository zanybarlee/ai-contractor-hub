
import { useState } from "react";
import { 
  ArrowTrendingUpIcon, 
  AlertTriangle, 
  Banknote,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChangeOrder {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  cost: number;
  scheduleImpact: number;
  status: 'pending' | 'approved' | 'rejected';
  riskScore: number;
  aiRecommendation: string;
  dateSubmitted: string;
}

const sampleChangeOrders: ChangeOrder[] = [
  {
    id: 'co1',
    title: 'Additional Steel Reinforcement',
    description: 'Structural engineer recommends increasing steel reinforcement in foundation.',
    requestedBy: 'John Smith',
    cost: 75000,
    scheduleImpact: 5,
    status: 'pending',
    riskScore: 35,
    aiRecommendation: 'Approve - Critical for structural integrity with minimal schedule impact.',
    dateSubmitted: '2024-02-15',
  },
  {
    id: 'co2',
    title: 'HVAC System Upgrade',
    description: 'Upgrade to higher efficiency HVAC system as per new regulations.',
    requestedBy: 'Sarah Johnson',
    cost: 120000,
    scheduleImpact: 10,
    status: 'approved',
    riskScore: 45,
    aiRecommendation: 'Consider - Long-term benefits outweigh short-term costs.',
    dateSubmitted: '2024-02-10',
  },
  {
    id: 'co3',
    title: 'Facade Material Change',
    description: 'Change external cladding material due to supply chain issues.',
    requestedBy: 'Mike Wilson',
    cost: 90000,
    scheduleImpact: 15,
    status: 'rejected',
    riskScore: 75,
    aiRecommendation: 'Reject - High risk of further delays and cost overruns.',
    dateSubmitted: '2024-02-08',
  },
];

const ChangeOrderManagement = () => {
  const [changeOrders] = useState<ChangeOrder[]>(sampleChangeOrders);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: ChangeOrder['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 40) return 'text-green-600';
    if (score < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Changes</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{changeOrders.length}</div>
            <p className="text-xs text-muted-foreground">Active change orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Impact</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(changeOrders.reduce((acc, co) => acc + co.cost, 0))}
            </div>
            <p className="text-xs text-muted-foreground">Total additional costs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schedule Impact</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {changeOrders.reduce((acc, co) => acc + co.scheduleImpact, 0)} days
            </div>
            <p className="text-xs text-muted-foreground">Total schedule extension</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Change Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {changeOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 p-4 rounded-lg border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{order.title}</h3>
                      <Badge className={cn("capitalize", getStatusColor(order.status))}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{order.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(order.cost)}</p>
                    <p className="text-sm text-gray-600">{order.scheduleImpact} days</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">Requested by: {order.requestedBy}</span>
                    <span className="text-gray-600">Date: {order.dateSubmitted}</span>
                    <span className={cn("font-medium", getRiskColor(order.riskScore))}>
                      Risk Score: {order.riskScore}
                    </span>
                  </div>
                  {order.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>

                <div className="text-sm bg-blue-50 p-3 rounded">
                  <strong>AI Recommendation:</strong> {order.aiRecommendation}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangeOrderManagement;

