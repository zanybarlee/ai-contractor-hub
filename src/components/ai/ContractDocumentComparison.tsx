
import { useState } from "react";
import { Files, ArrowRight, AlertCircle, CheckCircle, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { compareContractDocuments, type DocumentComparisonResult } from "@/lib/aiAgents";

const ContractDocumentComparison = () => {
  const [originalDocId, setOriginalDocId] = useState<string>("");
  const [comparisonDocId, setComparisonDocId] = useState<string>("");
  const [comparisonResult, setComparisonResult] = useState<DocumentComparisonResult | null>(null);

  const handleCompare = () => {
    if (!originalDocId || !comparisonDocId) return;
    
    const result = compareContractDocuments(originalDocId, comparisonDocId);
    setComparisonResult(result);
  };

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

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 0.8) return "text-green-600";
    if (similarity >= 0.6) return "text-yellow-600";
    return "text-red-600";
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
            onClick={handleCompare}
            disabled={!originalDocId || !comparisonDocId}
            className="w-full"
          >
            Compare Documents
          </Button>

          {comparisonResult && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  <span className="font-medium">Similarity Score:</span>
                </div>
                <span className={`text-lg font-bold ${getSimilarityColor(comparisonResult.similarity)}`}>
                  {Math.round(comparisonResult.similarity * 100)}%
                </span>
              </div>

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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractDocumentComparison;
