
import { useState } from "react";
import { Files } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { compareContractDocuments } from "@/lib/aiAgents";
import DocumentSelectionForm from "./document-comparison/DocumentSelectionForm";
import SimilarityScoreIndicator from "./document-comparison/SimilarityScoreIndicator";
import ViewModeSelector from "./document-comparison/ViewModeSelector";
import DifferenceSummaryView from "./document-comparison/DifferenceSummaryView";
import SideBySideView from "./document-comparison/SideBySideView";
import { mockDocuments } from "./document-comparison/mockDocuments";
import { DocumentComparisonResult } from "./document-comparison/types";

const ContractDocumentComparison = () => {
  const [originalDocId, setOriginalDocId] = useState<string>("");
  const [comparisonDocId, setComparisonDocId] = useState<string>("");
  const [comparisonResult, setComparisonResult] = useState<DocumentComparisonResult | null>(null);
  const [viewMode, setViewMode] = useState<"summary" | "sideBySide">("summary");

  const handleCompare = () => {
    if (!originalDocId || !comparisonDocId) return;
    
    const result = compareContractDocuments(originalDocId, comparisonDocId);
    setComparisonResult(result);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Files className="h-5 w-5" />
          Contract Document Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <DocumentSelectionForm
            originalDocId={originalDocId}
            comparisonDocId={comparisonDocId}
            setOriginalDocId={setOriginalDocId}
            setComparisonDocId={setComparisonDocId}
            onCompare={handleCompare}
          />

          {comparisonResult && (
            <div className="mt-6 space-y-4">
              <SimilarityScoreIndicator similarity={comparisonResult.similarity} />
              
              <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />

              {viewMode === "summary" ? (
                <DifferenceSummaryView comparisonResult={comparisonResult} />
              ) : (
                <SideBySideView
                  originalDocId={originalDocId}
                  comparisonDocId={comparisonDocId}
                  comparisonResult={comparisonResult}
                  mockDocuments={mockDocuments}
                />
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractDocumentComparison;
