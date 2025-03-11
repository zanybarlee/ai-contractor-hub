
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DocumentSelectionFormProps {
  originalDocId: string;
  comparisonDocId: string;
  setOriginalDocId: (id: string) => void;
  setComparisonDocId: (id: string) => void;
  onCompare: () => void;
}

const DocumentSelectionForm = ({
  originalDocId,
  comparisonDocId,
  setOriginalDocId,
  setComparisonDocId,
  onCompare,
}: DocumentSelectionFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Original Document</label>
          <Select value={originalDocId} onValueChange={setOriginalDocId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a document" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contract-v1">City Center Tower - v1 (Initial)</SelectItem>
              <SelectItem value="contract-v2">City Center Tower - v2 (Revised)</SelectItem>
              <SelectItem value="template-fidic">FIDIC Red Book Template</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Comparison Document</label>
          <Select value={comparisonDocId} onValueChange={setComparisonDocId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a document" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contract-v2">City Center Tower - v2 (Revised)</SelectItem>
              <SelectItem value="contract-v3">City Center Tower - v3 (Final)</SelectItem>
              <SelectItem value="competitor-1">Competitor Standard Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={onCompare}
        disabled={!originalDocId || !comparisonDocId}
        className="w-full"
      >
        Compare Documents
      </Button>
    </div>
  );
};

export default DocumentSelectionForm;
