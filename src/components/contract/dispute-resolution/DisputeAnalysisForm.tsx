
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DisputeAnalysisFormProps {
  onAnalyze: (description: string) => void;
  isAnalyzing: boolean;
}

const DisputeAnalysisForm = ({ onAnalyze, isAnalyzing }: DisputeAnalysisFormProps) => {
  const [disputeDescription, setDisputeDescription] = useState("");
  const { toast } = useToast();

  const handleAnalyzeClick = () => {
    if (disputeDescription.trim().length < 10) {
      toast({
        title: "Description too short",
        description: "Please provide more details about the dispute.",
        variant: "destructive",
      });
      return;
    }

    onAnalyze(disputeDescription);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="dispute-description" className="text-sm font-medium mb-2 block">
          Describe the dispute or potential claim
        </label>
        <Textarea
          id="dispute-description"
          placeholder="E.g., Our project has been delayed by 4 weeks due to unexpected heavy rainfall. We believe this qualifies as a force majeure event under section 8.2 of the contract..."
          value={disputeDescription}
          onChange={(e) => setDisputeDescription(e.target.value)}
          className="min-h-[120px]"
        />
      </div>
      <Button 
        onClick={handleAnalyzeClick} 
        disabled={isAnalyzing || disputeDescription.trim().length < 10}
        className="w-full"
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Dispute"}
      </Button>
    </div>
  );
};

export default DisputeAnalysisForm;
