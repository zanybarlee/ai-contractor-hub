
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface SOPAdjudicationDisputeProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

const SOPAdjudicationDispute: React.FC<SOPAdjudicationDisputeProps> = ({ data, onChange }) => {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field, e.target.value);
  };

  const handleDisputeTypeChange = (disputeType: string, checked: boolean) => {
    if (checked) {
      onChange('disputeType', disputeType);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Dispute Details</CardTitle>
          <CardDescription>
            Specify the nature of the dispute and provide a detailed description
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">Dispute: (Tick where appropriate ✓)</Label>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="paymentResponseDisputed"
                  checked={data.disputeType === "Payment response disputed"}
                  onCheckedChange={(checked) => 
                    handleDisputeTypeChange("Payment response disputed", checked as boolean)
                  }
                />
                <Label htmlFor="paymentResponseDisputed" className="text-sm">
                  Payment response disputed <span className="text-gray-500">(applicable to construction contracts only)</span>
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="noPaymentResponse"
                  checked={data.disputeType === "No payment response"}
                  onCheckedChange={(checked) => 
                    handleDisputeTypeChange("No payment response", checked as boolean)
                  }
                />
                <Label htmlFor="noPaymentResponse" className="text-sm">
                  No payment response <span className="text-gray-500">(applicable to construction contracts only)</span>
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="paidAmountDisputed"
                  checked={data.disputeType === "Paid amount disputed"}
                  onCheckedChange={(checked) => 
                    handleDisputeTypeChange("Paid amount disputed", checked as boolean)
                  }
                />
                <Label htmlFor="paidAmountDisputed" className="text-sm">
                  Paid amount disputed <span className="text-gray-500">(including nil payment by the payment due date)</span>
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="disputeDescription">Brief Description of Dispute *</Label>
            <Textarea
              id="disputeDescription"
              placeholder="Provide a detailed description of the dispute..."
              rows={8}
              value={data.disputeDescription}
              onChange={handleInputChange('disputeDescription')}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> The claimant hereby intends to apply for adjudication on the reference payment claim under the Building and Construction Industry Security of Payment Act.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authorisation</CardTitle>
          <CardDescription>
            Enter the signature details and authorisation information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="claimantAuthorisedRepresentative">Name of Claimant / Authorised Representative:</Label>
            <Input
              id="claimantAuthorisedRepresentative"
              placeholder="Full name of authorised person"
              value={data.claimantAuthorisedRepresentative}
              onChange={handleInputChange('claimantAuthorisedRepresentative')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organisationStamp">Organisation Stamp (if applicable):</Label>
            <Input
              id="organisationStamp"
              placeholder="Details of organisation stamp or seal"
              value={data.organisationStamp}
              onChange={handleInputChange('organisationStamp')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signatureDate">Date:</Label>
            <Input
              id="signatureDate"
              type="date"
              value={data.signatureDate}
              onChange={handleInputChange('signatureDate')}
            />
            <p className="text-sm text-gray-500">Format: DD/MM/YY</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Inputs marked with * are mandatory under the Building and Construction Industry Security of Payment Act.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPAdjudicationDispute;
