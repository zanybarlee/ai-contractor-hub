
import { AlertTriangle, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ComplianceAlerts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Alerts</CardTitle>
        <CardDescription>AI-driven notifications of regulatory changes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg border bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Building Code Update</h4>
              <p className="text-sm text-gray-600">Local building code updates affecting 3 active contracts. New energy efficiency standards take effect in 14 days.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg border bg-red-50 border-red-200">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Environmental Assessment Overdue</h4>
              <p className="text-sm text-gray-600">Environmental impact assessment for the Riverside project is 5 days overdue. Potential penalties of up to $1,000/day.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg border bg-blue-50 border-blue-200">
            <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">New Safety Training Required</h4>
              <p className="text-sm text-gray-600">Updated safety regulations require all site personnel to complete new training module within 30 days.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceAlerts;
