
import { useState } from "react";
import { Scale, BookOpen, AlertCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ContractDisputeResolutionTab = () => {
  const [disputeDescription, setDisputeDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    type: string;
    relevantClauses: { id: string; title: string; content: string }[];
    legalPrecedents: { case: string; relevance: string; outcome: string }[];
    resolutionOptions: { title: string; description: string; probability: number }[];
  }>(null);
  const { toast } = useToast();

  const handleAnalyzeDispute = () => {
    if (disputeDescription.trim().length < 10) {
      toast({
        title: "Description too short",
        description: "Please provide more details about the dispute.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis with a timeout
    setTimeout(() => {
      // Mock data for dispute analysis result
      setAnalysisResult({
        type: "Delay Claim",
        relevantClauses: [
          {
            id: "cl002",
            title: "Liquidated Damages",
            content: "Liquidated damages of $5,000 per day for delays...",
          },
          {
            id: "cl008",
            title: "Force Majeure",
            content: "Neither party shall be liable for failure to perform... due to causes beyond its reasonable control...",
          },
        ],
        legalPrecedents: [
          {
            case: "Smith Construction v. Metro Development (2021)",
            relevance: "Similar weather-related delay claim with force majeure clause",
            outcome: "Court ruled in favor of contractor due to unprecedented weather events",
          },
          {
            case: "Urban Builders v. City Council (2020)",
            relevance: "Dispute over liquidated damages calculation method",
            outcome: "Partial reduction of liquidated damages based on actual losses",
          },
        ],
        resolutionOptions: [
          {
            title: "Invoke Force Majeure",
            description: "Weather events qualify under the force majeure clause, potentially releasing contractor from liquidated damages",
            probability: 75,
          },
          {
            title: "Negotiate Reduced Damages",
            description: "Propose prorating liquidated damages based on partial completion and mitigating factors",
            probability: 60,
          },
          {
            title: "Mediation",
            description: "Suggest third-party mediation based on contract Section 8.3 before pursuing arbitration",
            probability: 90,
          },
        ],
      });
      
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "AI has analyzed your dispute and provided resolution options.",
      });
    }, 2000);
  };

  const getResolutionBadgeColor = (probability: number) => {
    if (probability >= 75) return "bg-green-100 text-green-800";
    if (probability >= 50) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Dispute Analysis</CardTitle>
        </CardHeader>
        <CardContent>
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
              onClick={handleAnalyzeDispute} 
              disabled={isAnalyzing || disputeDescription.trim().length < 10}
              className="w-full"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Dispute"}
            </Button>
          </div>

          {analysisResult && (
            <div className="mt-6 space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium flex items-center gap-2 text-blue-800">
                  <AlertCircle className="h-5 w-5" />
                  Dispute Type: {analysisResult.type}
                </h3>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Relevant Contract Clauses</h3>
                <div className="space-y-3">
                  {analysisResult.relevantClauses.map((clause) => (
                    <div key={clause.id} className="p-3 bg-gray-50 rounded-lg border">
                      <h4 className="font-medium">{clause.title}</h4>
                      <p className="text-sm text-gray-700 mt-1">{clause.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Legal Precedents
                </h3>
                <div className="space-y-3">
                  {analysisResult.legalPrecedents.map((precedent, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                      <h4 className="font-medium">{precedent.case}</h4>
                      <p className="text-sm text-gray-700 mt-1">Relevance: {precedent.relevance}</p>
                      <p className="text-sm text-gray-700 mt-1">Outcome: {precedent.outcome}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Resolution Recommendations
                </h3>
                <div className="space-y-3">
                  {analysisResult.resolutionOptions.map((option, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{option.title}</h4>
                        <Badge className={getResolutionBadgeColor(option.probability)}>
                          {option.probability}% Success
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">{option.description}</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        Implement This Approach <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractDisputeResolutionTab;
