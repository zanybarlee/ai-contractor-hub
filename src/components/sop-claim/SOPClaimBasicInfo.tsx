
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SOPClaimBasicInfoProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

const SOPClaimBasicInfo: React.FC<SOPClaimBasicInfoProps> = ({ data, onChange }) => {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Payment Claim Basic Information</CardTitle>
        <CardDescription>
          Enter the basic details for your SOP Act payment claim
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="claimReferenceNumber">Payment Claim Reference Number</Label>
            <Input
              id="claimReferenceNumber"
              placeholder="e.g., CPL\FPL\Payment-9"
              value={data.claimReferenceNumber}
              onChange={handleInputChange('claimReferenceNumber')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="claimDate">Payment Claim Date</Label>
            <Input
              id="claimDate"
              type="date"
              value={data.claimDate}
              onChange={handleInputChange('claimDate')}
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
      </CardContent>
    </Card>
  );
};

export default SOPClaimBasicInfo;
