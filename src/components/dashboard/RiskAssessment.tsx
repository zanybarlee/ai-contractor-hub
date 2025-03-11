
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RiskAssessment = () => {
  return (
    <Card className="shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  i === 1 ? "bg-red-50" : 
                  i === 2 ? "bg-yellow-50" : 
                  "bg-green-50"
                }`}>
                  <AlertTriangle className={`h-5 w-5 ${
                    i === 1 ? "text-red-600" : 
                    i === 2 ? "text-yellow-600" : 
                    "text-green-600"
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {i === 1 ? "High Risk Alert" : i === 2 ? "Medium Risk Alert" : "Low Risk Alert"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {i === 1 ? "Urgent action required" : i === 2 ? "Review recommended" : "Monitoring only"}
                  </p>
                </div>
              </div>
              <Badge className={`${
                i === 1 ? "bg-red-100 text-red-800 hover:bg-red-200" : 
                i === 2 ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" : 
                "bg-green-100 text-green-800 hover:bg-green-200"
              } border-none`}>
                {i === 1 ? "High" : i === 2 ? "Medium" : "Low"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;
