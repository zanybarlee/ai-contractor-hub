
import { FileText, AlertTriangle, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ContractMetricsProps {
  value: number;
  currency: string;
  versionsCount: number;
}

const ContractMetrics = ({ value, currency, versionsCount }: ContractMetricsProps) => {
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Contract Value</p>
              <h3 className="text-xl font-semibold text-gray-900 mt-1">
                {formatCurrency(value, currency)}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-yellow-50">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Score</p>
              <h3 className="text-xl font-semibold text-gray-900 mt-1">
                Medium Risk
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-50">
              <History className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Versions</p>
              <h3 className="text-xl font-semibold text-gray-900 mt-1">
                {versionsCount} Revisions
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractMetrics;
