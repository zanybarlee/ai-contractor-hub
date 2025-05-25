
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SOPAdjudicationPartiesProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

const SOPAdjudicationParties: React.FC<SOPAdjudicationPartiesProps> = ({ data, onChange }) => {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Respondent Details</CardTitle>
          <CardDescription>
            Enter the details of the respondent (recipient of this notice)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="respondentName">To: Respondent's Name or Registered Company/Organisation Name *</Label>
            <Input
              id="respondentName"
              placeholder="e.g., ABC Construction Pte Ltd"
              value={data.respondentName}
              onChange={handleInputChange('respondentName')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="respondentAddress">Service Address *</Label>
              <Textarea
                id="respondentAddress"
                placeholder="Complete service address"
                value={data.respondentAddress}
                onChange={handleInputChange('respondentAddress')}
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="respondentPhone">Tel:</Label>
                <Input
                  id="respondentPhone"
                  placeholder="Phone number"
                  value={data.respondentPhone}
                  onChange={handleInputChange('respondentPhone')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="respondentFax">Fax:</Label>
                <Input
                  id="respondentFax"
                  placeholder="Fax number"
                  value={data.respondentFax}
                  onChange={handleInputChange('respondentFax')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="respondentEmail">Email:</Label>
                <Input
                  id="respondentEmail"
                  type="email"
                  placeholder="Email address"
                  value={data.respondentEmail}
                  onChange={handleInputChange('respondentEmail')}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="respondentPersonInCharge">Person-in-charge (Respondent):</Label>
            <Input
              id="respondentPersonInCharge"
              placeholder="Name of authorised representative, designation, contact details"
              value={data.respondentPersonInCharge}
              onChange={handleInputChange('respondentPersonInCharge')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Claimant Details</CardTitle>
          <CardDescription>
            Enter the details of the claimant (sender of this notice)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="claimantName">From: Claimant's Name or Registered Company/Organisation Name *</Label>
            <Input
              id="claimantName"
              placeholder="e.g., XYZ Subcontractor Pte Ltd"
              value={data.claimantName}
              onChange={handleInputChange('claimantName')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="claimantAddress">Service Address *</Label>
              <Textarea
                id="claimantAddress"
                placeholder="Complete service address"
                value={data.claimantAddress}
                onChange={handleInputChange('claimantAddress')}
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="claimantPhone">Tel:</Label>
                <Input
                  id="claimantPhone"
                  placeholder="Phone number"
                  value={data.claimantPhone}
                  onChange={handleInputChange('claimantPhone')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="claimantFax">Fax:</Label>
                <Input
                  id="claimantFax"
                  placeholder="Fax number"
                  value={data.claimantFax}
                  onChange={handleInputChange('claimantFax')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="claimantEmail">Email:</Label>
                <Input
                  id="claimantEmail"
                  type="email"
                  placeholder="Email address"
                  value={data.claimantEmail}
                  onChange={handleInputChange('claimantEmail')}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="claimantPersonInCharge">Person-in-charge (Claimant):</Label>
            <Input
              id="claimantPersonInCharge"
              placeholder="Name of authorised representative, designation, contact details"
              value={data.claimantPersonInCharge}
              onChange={handleInputChange('claimantPersonInCharge')}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPAdjudicationParties;
