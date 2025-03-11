
import { FileText, AlertTriangle, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface DashboardStat {
  name: string;
  value: string;
  icon: any;
  trend: string;
  trendType: "positive" | "negative";
  color: string;
  iconColor: string;
}

interface DashboardStatsProps {
  stats: DashboardStat[];
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.name} 
          className="overflow-hidden shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out"
        >
          <div className={`h-1 ${
            index === 0 ? "bg-blue-500" : 
            index === 1 ? "bg-yellow-500" : 
            index === 2 ? "bg-purple-500" : 
            "bg-green-500"
          }`} />
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-baseline space-x-1">
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                  <Badge variant="outline" className={`
                    ${stat.trendType === "positive" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}
                  `}>
                    {stat.trend}
                  </Badge>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
