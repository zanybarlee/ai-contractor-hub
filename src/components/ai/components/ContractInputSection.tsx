
import { Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContractInputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  onGenerate: () => void;
  onClearAll: () => void;
  isLoading: boolean;
}

const ContractInputSection: React.FC<ContractInputSectionProps> = ({
  inputText,
  setInputText,
  onGenerate,
  onClearAll,
  isLoading
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          Text to Contract
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="contract-description">Contract Description</Label>
          <Textarea
            id="contract-description"
            placeholder="Describe the contract you want to generate. For example: 'Create a construction contract for building a residential house with payment terms, delivery timeline, and warranty clauses...'"
            className="min-h-[200px] mt-2"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={onGenerate} 
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "Generating..." : "Generate Contract"}
          </Button>
          <Button 
            variant="outline" 
            onClick={onClearAll}
            disabled={isLoading}
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractInputSection;
