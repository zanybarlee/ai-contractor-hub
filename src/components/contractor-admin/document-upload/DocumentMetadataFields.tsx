
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface DocumentMetadataFieldsProps {
  title: string;
  contractId: string;
  type: string;
  status: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const DocumentMetadataFields = ({ 
  title, 
  contractId, 
  type, 
  status, 
  onInputChange, 
  onSelectChange 
}: DocumentMetadataFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="title">Document Title</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={onInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Document Type</Label>
          <Select 
            onValueChange={(value) => onSelectChange("type", value)}
            defaultValue={type}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Amendment">Amendment</SelectItem>
              <SelectItem value="Notice">Notice</SelectItem>
              <SelectItem value="Claim">Claim</SelectItem>
              <SelectItem value="Letter">Letter</SelectItem>
              <SelectItem value="Correspondence">Correspondence</SelectItem>
              <SelectItem value="Instruction">Instruction</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="contractId">Related Contract ID (optional)</Label>
          <Input
            id="contractId"
            name="contractId"
            value={contractId}
            onChange={onInputChange}
            placeholder="e.g., c001"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select 
          onValueChange={(value) => onSelectChange("status", value)}
          defaultValue={status}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Submitted">Submitted</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default DocumentMetadataFields;
