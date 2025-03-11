
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContractOverviewTabProps {
  contract: {
    parties: {
      clientName: string;
      contractorName: string;
    };
    templateId: string;
    value: number;
    currency: string;
    createdAt: string;
    updatedAt: string;
    title: string;
  };
  formatCurrency: (value: number, currency: string) => string;
}

const ContractOverviewTab = ({ contract, formatCurrency }: ContractOverviewTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">CLIENT</h3>
            <p className="text-gray-900">{contract.parties.clientName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">CONTRACTOR</h3>
            <p className="text-gray-900">{contract.parties.contractorName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">TEMPLATE TYPE</h3>
            <p className="text-gray-900">{contract.templateId}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">VALUE</h3>
            <p className="text-gray-900">{formatCurrency(contract.value, contract.currency)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">CREATED</h3>
            <p className="text-gray-900">{new Date(contract.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">LAST UPDATED</h3>
            <p className="text-gray-900">{new Date(contract.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">CONTRACT SUMMARY (AI GENERATED)</h3>
          <div className="p-4 bg-gray-50 rounded-lg text-gray-700 text-sm">
            <p>This agreement is between {contract.parties.clientName} and {contract.parties.contractorName} for the {contract.title} project.</p>
            <p className="mt-2">Key provisions include:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Payment terms: 30 days from invoice date</li>
              <li>Liquidated damages: {formatCurrency(5000, contract.currency)} per day for delays</li>
              <li>Warranty period: 12 months from practical completion</li>
              <li>Project duration: 18 months from commencement date</li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200 text-yellow-800">
              <p className="font-medium flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                AI Analysis: Medium Risk Contract
              </p>
              <p className="mt-1 text-sm">The liquidated damages clause presents a significant risk factor. Consider negotiating a cap on total damages.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractOverviewTab;
