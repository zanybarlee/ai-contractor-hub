
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SOPAdjudicationContractProps {
  data: any;
  onChange: (field: string, value: string | number) => void;
}

const SOPAdjudicationContract: React.FC<SOPAdjudicationContractProps> = ({ data, onChange }) => {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(field, value);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Particulars of Contract</CardTitle>
          <CardDescription>
            Enter the contract details relevant to this adjudication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title or Reference (or a brief description of the project) *</Label>
            <Textarea
              id="projectTitle"
              placeholder="e.g., Fortune Complex"
              value={data.projectTitle}
              onChange={handleInputChange('projectTitle')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contractNumber">Contract Number (or a brief description of the contract) *</Label>
            <Textarea
              id="contractNumber"
              placeholder="e.g., Contract for construction works"
              value={data.contractNumber}
              onChange={handleInputChange('contractNumber')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contractDate">Date Contract Made *</Label>
            <Input
              id="contractDate"
              type="date"
              value={data.contractDate}
              onChange={handleInputChange('contractDate')}
            />
            <p className="text-sm text-gray-500">Format: DD/MM/YY</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Claim and Payment Response</CardTitle>
          <CardDescription>
            Enter the details of the payment claim and response that led to this dispute
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paymentClaimReference">Payment Claim Reference Number:</Label>
            <Input
              id="paymentClaimReference"
              placeholder="e.g., CPL/FPL/Payment-9"
              value={data.paymentClaimReference}
              onChange={handleInputChange('paymentClaimReference')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentClaimAmount">Payment Claim Amount *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="paymentClaimAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="pl-8"
                value={data.paymentClaimAmount}
                onChange={handleInputChange('paymentClaimAmount')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentResponseReference">Payment Response Reference Number:</Label>
            <Input
              id="paymentResponseReference"
              placeholder="e.g., FPL/CPL/Response-9"
              value={data.paymentResponseReference}
              onChange={handleInputChange('paymentResponseReference')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentResponseAmount">Payment Response Amount *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="paymentResponseAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="pl-8"
                value={data.paymentResponseAmount}
                onChange={handleInputChange('paymentResponseAmount')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPAdjudicationContract;
