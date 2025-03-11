
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ComplianceCard = () => {
  return (
    <Card className="shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Compliance Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Overall</span>
            <span className="text-sm font-medium">78%</span>
          </div>
          <Progress value={78} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Documentation</span>
            <span className="text-sm font-medium">92%</span>
          </div>
          <Progress value={92} className="h-2 [&>div]:bg-green-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Regulatory</span>
            <span className="text-sm font-medium">65%</span>
          </div>
          <Progress value={65} className="h-2 [&>div]:bg-yellow-500" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceCard;
