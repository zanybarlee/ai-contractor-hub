
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import DisputeAnalysisForm from "../dispute-resolution/DisputeAnalysisForm";
import DisputeAnalysisResults from "../dispute-resolution/DisputeAnalysisResults";
import { analyzeDispute } from "../dispute-resolution/AnalysisService";
import { AnalysisResult } from "../dispute-resolution/MockData";

const ContractDisputeResolutionTab = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyzeDispute = (description: string) => {
    setIsAnalyzing(true);

    // Call the analysis service
    analyzeDispute()
      .then((result) => {
        setAnalysisResult(result);
        toast({
          title: "Analysis Complete",
          description: "AI has analyzed your dispute and provided resolution options.",
        });
      })
      .finally(() => {
        setIsAnalyzing(false);
      });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Dispute Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <DisputeAnalysisForm 
            onAnalyze={handleAnalyzeDispute} 
            isAnalyzing={isAnalyzing} 
          />
          
          {analysisResult && (
            <DisputeAnalysisResults result={analysisResult} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractDisputeResolutionTab;
