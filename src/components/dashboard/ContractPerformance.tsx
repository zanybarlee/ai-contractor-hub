
import { BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ContractPerformance = () => {
  return (
    <Card className="lg:col-span-2 shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Contract Performance</CardTitle>
        <Badge variant="outline" className="text-blue-600 bg-blue-50">Last 30 days</Badge>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center px-8 py-12 space-y-4">
            <BarChart className="h-12 w-12 text-blue-600 mx-auto" />
            <h3 className="text-lg font-medium">Performance Analytics</h3>
            <p className="text-gray-500 max-w-md">
              Track the performance of your contracts with detailed analytics 
              and visualization tools.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractPerformance;
