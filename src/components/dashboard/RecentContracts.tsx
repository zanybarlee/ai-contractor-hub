
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RecentContracts = () => {
  return (
    <Card className="shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Contracts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-50">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">City Center Tower Project</h4>
                  <p className="text-sm text-gray-600">Last updated 2h ago</p>
                </div>
              </div>
              <Badge variant={i === 1 ? "default" : i === 2 ? "outline" : "secondary"}>
                {i === 1 ? "Active" : i === 2 ? "Draft" : "Review"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentContracts;
