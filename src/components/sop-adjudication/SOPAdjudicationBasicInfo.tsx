
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SOPAdjudicationBasicInfoProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

const SOPAdjudicationBasicInfo: React.FC<SOPAdjudicationBasicInfoProps> = ({ data, onChange }) => {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Notice Basic Information</CardTitle>
        <CardDescription>
          Enter the basic details for your Notice of Intention to Apply for Adjudication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="noticeDate">Date of Notice</Label>
          <Input
            id="noticeDate"
            type="date"
            value={data.noticeDate}
            onChange={handleInputChange('noticeDate')}
          />
          <p className="text-sm text-gray-500">Format: DD/MM/YY</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Notice of Intention to Apply for Adjudication</h3>
          <p className="text-sm text-blue-800">
            This form creates a formal notice under the Building and Construction Industry Security of Payment Act. 
            All mandatory fields must be completed to ensure compliance with the Act.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SOPAdjudicationBasicInfo;
