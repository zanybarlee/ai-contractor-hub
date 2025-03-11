
import { Badge } from "@/components/ui/badge";
import { DocumentComparisonResult } from "./types";

interface DifferenceSummaryViewProps {
  comparisonResult: DocumentComparisonResult;
}

const DifferenceSummaryView = ({ comparisonResult }: DifferenceSummaryViewProps) => {
  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case "minor":
        return "bg-gray-100 text-gray-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "major":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium mt-4">Key Differences:</h3>
      
      <div className="space-y-4">
        {comparisonResult.differences.map((diff, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden">
            <div className="p-3 bg-muted flex items-center justify-between">
              <div className="font-medium">{diff.sectionTitle}</div>
              <Badge className={getSignificanceColor(diff.significance)}>
                {diff.significance.charAt(0).toUpperCase() + diff.significance.slice(1)} Change
              </Badge>
            </div>
            <div className="p-4 space-y-3">
              {diff.originalText && (
                <div className="bg-red-50 p-3 rounded border border-red-100 text-sm">
                  <div className="text-xs font-medium text-red-800 mb-1">Original:</div>
                  {diff.originalText}
                </div>
              )}
              {diff.newText && (
                <div className="bg-green-50 p-3 rounded border border-green-100 text-sm">
                  <div className="text-xs font-medium text-green-800 mb-1">New:</div>
                  {diff.newText}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifferenceSummaryView;
