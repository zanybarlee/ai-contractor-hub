
import { FileText } from "lucide-react";
import { DocumentComparisonResult } from "./types";

interface SideBySideViewProps {
  originalDocId: string;
  comparisonDocId: string;
  comparisonResult: DocumentComparisonResult;
  mockDocuments: Record<string, string>;
}

const SideBySideView = ({
  originalDocId,
  comparisonDocId,
  comparisonResult,
  mockDocuments,
}: SideBySideViewProps) => {
  const highlightDifferences = (text: string, docId: string) => {
    let highlightedText = text;
    comparisonResult.differences.forEach(diff => {
      // Only highlight text if it exists for the current document
      if (docId === originalDocId && diff.originalText) {
        highlightedText = highlightedText.replace(
          diff.originalText,
          `<span class="bg-red-100 px-1 rounded">${diff.originalText}</span>`
        );
      } else if (docId === comparisonDocId && diff.newText) {
        highlightedText = highlightedText.replace(
          diff.newText,
          `<span class="bg-green-100 px-1 rounded">${diff.newText}</span>`
        );
      }
    });
    return highlightedText;
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
      <div className="grid grid-cols-2 divide-x">
        <div className="p-3 bg-muted flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          <h3 className="font-medium text-sm">
            {originalDocId === "contract-v1" ? "City Center Tower - v1 (Initial)" : 
             originalDocId === "contract-v2" ? "City Center Tower - v2 (Revised)" :
             originalDocId === "template-fidic" ? "FIDIC Red Book Template" : ""}
          </h3>
        </div>
        <div className="p-3 bg-muted flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          <h3 className="font-medium text-sm">
            {comparisonDocId === "contract-v2" ? "City Center Tower - v2 (Revised)" : 
             comparisonDocId === "contract-v3" ? "City Center Tower - v3 (Final)" :
             comparisonDocId === "competitor-1" ? "Competitor Standard Contract" : ""}
          </h3>
        </div>
        <div className="p-4 h-[500px] overflow-auto text-sm">
          {originalDocId && mockDocuments[originalDocId] && (
            <pre className="whitespace-pre-wrap font-sans" 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightDifferences(mockDocuments[originalDocId], originalDocId) 
                  }} 
            />
          )}
        </div>
        <div className="p-4 h-[500px] overflow-auto text-sm">
          {comparisonDocId && mockDocuments[comparisonDocId] && (
            <pre className="whitespace-pre-wrap font-sans" 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightDifferences(mockDocuments[comparisonDocId], comparisonDocId) 
                  }} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBySideView;
