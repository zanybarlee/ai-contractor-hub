
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SOPResponseBasicInfoProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

const SOPResponseBasicInfo: React.FC<SOPResponseBasicInfoProps> = ({ data, onChange }) => {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Payment Response Basic Information</CardTitle>
        <CardDescription>
          Enter the basic details for your SOP Act payment response
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="responseReferenceNumber">Payment Response Reference Number</Label>
            <Input
              id="responseReferenceNumber"
              placeholder="e.g., FPL\CPL\Response-9"
              value={data.responseReferenceNumber}
              onChange={handleInputChange('responseReferenceNumber')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="responseDate">Payment Response Date</Label>
            <Input
              id="responseDate"
              type="date"
              value={data.responseDate}
              onChange={handleInputChange('responseDate')}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectTitle">Project Title</Label>
          <Input
            id="projectTitle"
            placeholder="e.g., Fortune Complex"
            value={data.projectTitle}
            onChange={handleInputChange('projectTitle')}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contract Details</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contractIdentification">Contract Title / Description</Label>
              <Input
                id="contractIdentification"
                placeholder="e.g., Construction of Fortune Complex comprising an office block, a retail mall and 3 blocks of residential apartments"
                value={data.contractIdentification}
                onChange={handleInputChange('contractIdentification')}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contractNumber">Contract Number</Label>
                <Input
                  id="contractNumber"
                  placeholder="e.g., J04/29"
                  value={data.contractNumber}
                  onChange={handleInputChange('contractNumber')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractDate">Date Contract Made</Label>
                <Input
                  id="contractDate"
                  type="date"
                  value={data.contractDate}
                  onChange={handleInputChange('contractDate')}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referencePeriodFrom">Reference Period From</Label>
                <Input
                  id="referencePeriodFrom"
                  type="date"
                  value={data.referencePeriodFrom}
                  onChange={handleInputChange('referencePeriodFrom')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referencePeriodTo">Reference Period To</Label>
                <Input
                  id="referencePeriodTo"
                  type="date"
                  value={data.referencePeriodTo}
                  onChange={handleInputChange('referencePeriodTo')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Payment Claim Identification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentClaimReference">Payment Claim Reference Number</Label>
              <Input
                id="paymentClaimReference"
                placeholder="e.g., CPL\FPL\Payment-9"
                value={data.paymentClaimReference}
                onChange={handleInputChange('paymentClaimReference')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentClaimDate">Payment Claim Date</Label>
              <Input
                id="paymentClaimDate"
                type="date"
                value={data.paymentClaimDate}
                onChange={handleInputChange('paymentClaimDate')}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="claimAmount">Claim Amount ($)</Label>
            <Input
              id="claimAmount"
              type="number"
              step="0.01"
              placeholder="e.g., 11208534.70"
              value={data.claimAmount}
              onChange={handleInputChange('claimAmount')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SOPResponseBasicInfo;
