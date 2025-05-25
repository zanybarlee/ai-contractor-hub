
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SOPResponsePartiesProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

const SOPResponseParties: React.FC<SOPResponsePartiesProps> = ({ data, onChange }) => {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Claimant Details</CardTitle>
          <CardDescription>
            Details of the party who made the payment claim (receiving this response)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="claimantName">To: (Claimant's name or registered company / organisation name)</Label>
            <Input
              id="claimantName"
              placeholder="e.g., BUILDER PTE LTD"
              value={data.claimantName}
              onChange={handleInputChange('claimantName')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="claimantAddress">Service Address</Label>
            <Textarea
              id="claimantAddress"
              rows={2}
              placeholder="e.g., 19 Construction Road, Singapore 191919"
              value={data.claimantAddress}
              onChange={handleInputChange('claimantAddress')}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="claimantPhone">Tel:</Label>
              <Input
                id="claimantPhone"
                placeholder="e.g., 61234567"
                value={data.claimantPhone}
                onChange={handleInputChange('claimantPhone')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="claimantFax">Fax:</Label>
              <Input
                id="claimantFax"
                placeholder="e.g., 67654321"
                value={data.claimantFax}
                onChange={handleInputChange('claimantFax')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="claimantEmail">Email:</Label>
              <Input
                id="claimantEmail"
                type="email"
                placeholder="e.g., cpl@builder.com.sg"
                value={data.claimantEmail}
                onChange={handleInputChange('claimantEmail')}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="claimantPersonInCharge">Person-in-charge (Claimant)</Label>
            <Input
              id="claimantPersonInCharge"
              placeholder="Name of authorised representative, designation, contact details"
              value={data.claimantPersonInCharge}
              onChange={handleInputChange('claimantPersonInCharge')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Respondent Details</CardTitle>
          <CardDescription>
            Details of the party making the payment response
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="respondentName">From: (Respondent's name or registered company / organisation name)</Label>
            <Input
              id="respondentName"
              placeholder="e.g., FORTUNE PTE LTD"
              value={data.respondentName}
              onChange={handleInputChange('respondentName')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="respondentAddress">Service Address</Label>
            <Textarea
              id="respondentAddress"
              rows={2}
              placeholder="e.g., 18 Development Road, Singapore 288888"
              value={data.respondentAddress}
              onChange={handleInputChange('respondentAddress')}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="respondentPhone">Tel:</Label>
              <Input
                id="respondentPhone"
                placeholder="e.g., 63456789"
                value={data.respondentPhone}
                onChange={handleInputChange('respondentPhone')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="respondentFax">Fax:</Label>
              <Input
                id="respondentFax"
                placeholder="e.g., 69876543"
                value={data.respondentFax}
                onChange={handleInputChange('respondentFax')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="respondentEmail">Email:</Label>
              <Input
                id="respondentEmail"
                type="email"
                placeholder="e.g., fpl@fortune.com.sg"
                value={data.respondentEmail}
                onChange={handleInputChange('respondentEmail')}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="respondentPersonInCharge">Person-in-charge (Respondent)</Label>
            <Input
              id="respondentPersonInCharge"
              placeholder="Name of authorised representative, designation, contact details"
              value={data.respondentPersonInCharge}
              onChange={handleInputChange('respondentPersonInCharge')}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPResponseParties;
