
import { Scale, BookOpen, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from "./MockData";

interface DisputeAnalysisResultsProps {
  result: AnalysisResult | null;
}

const DisputeAnalysisResults = ({ result }: DisputeAnalysisResultsProps) => {
  if (!result) return null;

  const getResolutionBadgeColor = (probability: number) => {
    if (probability >= 75) return "bg-green-100 text-green-800";
    if (probability >= 50) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium flex items-center gap-2 text-blue-800">
          <AlertCircle className="h-5 w-5" />
          Dispute Type: {result.type}
        </h3>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Relevant Contract Clauses</h3>
        <div className="space-y-3">
          {result.relevantClauses.map((clause) => (
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
          {result.legalPrecedents.map((precedent, index) => (
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
          {result.resolutionOptions.map((option, index) => (
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
  );
};

export default DisputeAnalysisResults;
