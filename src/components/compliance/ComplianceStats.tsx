
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ComplianceStats as ComplianceStatsType } from "@/types/compliance";

interface ComplianceStatsProps {
  stats: ComplianceStatsType;
}

const ComplianceStats = ({ stats }: ComplianceStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Status</CardTitle>
        <CardDescription>AI-powered real-time compliance tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Overall Compliance</span>
              <span className="text-sm font-medium">{stats.overall}%</span>
            </div>
            <Progress value={stats.overall} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Building Codes</span>
              <span className="text-sm font-medium">{stats.building}%</span>
            </div>
            <Progress 
              value={stats.building} 
              className="[&>div]:bg-blue-600 bg-blue-100" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Safety Regulations</span>
              <span className="text-sm font-medium">{stats.safety}%</span>
            </div>
            <Progress 
              value={stats.safety} 
              className="[&>div]:bg-green-600 bg-green-100" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Environmental</span>
              <span className="text-sm font-medium">{stats.environmental}%</span>
            </div>
            <Progress 
              value={stats.environmental} 
              className="[&>div]:bg-yellow-600 bg-yellow-100" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Labor Laws</span>
              <span className="text-sm font-medium">{stats.labor}%</span>
            </div>
            <Progress 
              value={stats.labor} 
              className="[&>div]:bg-purple-600 bg-purple-100" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceStats;
