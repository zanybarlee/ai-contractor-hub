
import { useState } from "react";
import { Files, ArrowRight, AlertCircle, CheckCircle, Percent, FileText, LayoutPanelLeft, LayoutPanelRight, Diff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { compareContractDocuments, type DocumentComparisonResult } from "@/lib/aiAgents";

const ContractDocumentComparison = () => {
  const [originalDocId, setOriginalDocId] = useState<string>("");
  const [comparisonDocId, setComparisonDocId] = useState<string>("");
  const [comparisonResult, setComparisonResult] = useState<DocumentComparisonResult | null>(null);
  const [viewMode, setViewMode] = useState<"summary" | "sideBySide">("summary");

  // Mock document content for demo purposes
  const mockDocuments = {
    "contract-v1": `CONTRACT FOR CITY CENTER TOWER CONSTRUCTION PROJECT

ARTICLE 1: SCOPE OF WORK
1.1 The Contractor shall furnish all labor, materials, equipment and services necessary for the construction of the City Center Tower as defined in the Construction Documents.
1.2 The work shall be completed in accordance with all applicable building codes and regulations.

ARTICLE 2: CONTRACT SUM
2.1 The Owner shall pay the Contractor the sum of $24,500,000 (Twenty-Four Million Five Hundred Thousand Dollars) for the performance of the Contract.
2.2 Payment shall be made within 30 days of invoice date.

ARTICLE 3: TIME OF COMPLETION
3.1 The Work shall be substantially completed within 36 months from the date of commencement.
3.2 Liquidated damages of $5,000 per day shall apply for delays not excused under the terms of this Contract.

ARTICLE 4: GENERAL PROVISIONS
4.1 The Contract Documents consist of this Agreement, Conditions of the Contract, Drawings, Specifications, Addenda and Modifications.
4.2 The Contractor shall maintain insurance as specified in the Contract Documents.
4.3 The Contract may be terminated by either party as provided in the General Conditions.

ARTICLE 5: WARRANTY
5.1 The Contractor warrants to the Owner that materials and equipment furnished under the Contract will be of good quality and new, and that the Work will conform to the requirements of the Contract Documents.
5.2 The warranty period shall be 12 months from the date of Substantial Completion.`,
    
    "contract-v2": `CONTRACT FOR CITY CENTER TOWER CONSTRUCTION PROJECT

ARTICLE 1: SCOPE OF WORK
1.1 The Contractor shall furnish all labor, materials, equipment and services necessary for the construction of the City Center Tower as defined in the Construction Documents.
1.2 The work shall be completed in accordance with all applicable building codes and regulations.

ARTICLE 2: CONTRACT SUM
2.1 The Owner shall pay the Contractor the sum of $24,500,000 (Twenty-Four Million Five Hundred Thousand Dollars) for the performance of the Contract.
2.2 Payment shall be made within 14 days of invoice date.

ARTICLE 3: TIME OF COMPLETION
3.1 The Work shall be substantially completed within 36 months from the date of commencement.
3.2 Liquidated damages of $3,500 per day shall apply for delays not excused under the terms of this Contract, capped at 5% of total contract value.

ARTICLE 4: GENERAL PROVISIONS
4.1 The Contract Documents consist of this Agreement, Conditions of the Contract, Drawings, Specifications, Addenda and Modifications.
4.2 The Contractor shall maintain insurance as specified in the Contract Documents.
4.3 The Contract may be terminated by either party as provided in the General Conditions.

ARTICLE 5: WARRANTY
5.1 The Contractor warrants to the Owner that materials and equipment furnished under the Contract will be of good quality and new, and that the Work will conform to the requirements of the Contract Documents.
5.2 The warranty period shall be 24 months from the date of Substantial Completion.`,
    
    "contract-v3": `CONTRACT FOR CITY CENTER TOWER CONSTRUCTION PROJECT (FINAL VERSION)

ARTICLE 1: SCOPE OF WORK
1.1 The Contractor shall furnish all labor, materials, equipment and services necessary for the construction of the City Center Tower as defined in the Construction Documents.
1.2 The work shall be completed in accordance with all applicable building codes and regulations.
1.3 Additional landscaping and exterior lighting as detailed in Addendum A shall be included in the scope.

ARTICLE 2: CONTRACT SUM
2.1 The Owner shall pay the Contractor the sum of $25,200,000 (Twenty-Five Million Two Hundred Thousand Dollars) for the performance of the Contract.
2.2 Payment shall be made within 14 days of invoice date.
2.3 Final payment is subject to completion of all punch list items.

ARTICLE 3: TIME OF COMPLETION
3.1 The Work shall be substantially completed within 32 months from the date of commencement.
3.2 Liquidated damages of $3,500 per day shall apply for delays not excused under the terms of this Contract, capped at 5% of total contract value.
3.3 Early completion bonus of $10,000 per week for completion before the scheduled date, up to a maximum of $100,000.

ARTICLE 4: GENERAL PROVISIONS
4.1 The Contract Documents consist of this Agreement, Conditions of the Contract, Drawings, Specifications, Addenda and Modifications.
4.2 The Contractor shall maintain insurance as specified in the Contract Documents.
4.3 The Contract may be terminated by either party as provided in the General Conditions.
4.4 Dispute resolution shall follow a three-step process of negotiation, mediation, and binding arbitration.

ARTICLE 5: WARRANTY
5.1 The Contractor warrants to the Owner that materials and equipment furnished under the Contract will be of good quality and new, and that the Work will conform to the requirements of the Contract Documents.
5.2 The warranty period shall be 24 months from the date of Substantial Completion.
5.3 Extended warranty of 5 years shall apply to structural elements and roof systems.`,
    
    "template-fidic": `FIDIC RED BOOK TEMPLATE (Conditions of Contract for Construction)

1. GENERAL PROVISIONS
1.1 Definitions
1.2 Interpretation
1.3 Communications
1.4 Law and Language
1.5 Priority of Documents
1.6 Contract Agreement
1.7 Assignment
1.8 Care and Supply of Documents
1.9 Delayed Drawings or Instructions
1.10 Employer's Use of Contractor's Documents
1.11 Contractor's Use of Employer's Documents
1.12 Confidential Details
1.13 Compliance with Laws
1.14 Joint and Several Liability

2. THE EMPLOYER
2.1 Right of Access to the Site
2.2 Permits, Licenses or Approvals
2.3 Employer's Personnel
2.4 Employer's Financial Arrangements
2.5 Employer's Claims

[Additional sections omitted for brevity]`,

    "competitor-1": `STANDARD CONSTRUCTION AGREEMENT

ARTICLE 1: THE CONTRACT DOCUMENTS
The Contract Documents consist of this Agreement, Conditions of the Contract (General, Supplementary and other Conditions), Drawings, Specifications, Addenda issued prior to execution of this Agreement, other documents listed in this Agreement and Modifications issued after execution of this Agreement, all of which form the Contract.

ARTICLE 2: THE WORK OF THIS CONTRACT
The Contractor shall fully execute the Work described in the Contract Documents, except as specifically indicated in the Contract Documents to be the responsibility of others.

ARTICLE 3: DATE OF COMMENCEMENT AND SUBSTANTIAL COMPLETION
3.1 The date of commencement of the Work shall be the date of this Agreement unless a different date is stated below or provision is made for the date to be fixed in a notice to proceed issued by the Owner.
3.2 The Contractor shall achieve Substantial Completion of the entire Work not later than 30 months from the date of commencement, subject to adjustments of the Contract Time as provided in the Contract Documents.

ARTICLE 4: CONTRACT SUM
4.1 The Owner shall pay the Contractor the Contract Sum of $25,000,000 for the Contractor's performance of the Contract.
4.2 Payment shall be made within 30 days of approved invoice.
4.3 Liquidated damages of $4,000 per day shall apply for delays.

ARTICLE 5: PAYMENTS
5.1 Progress Payments
5.2 Final Payment

ARTICLE 6: TERMINATION OR SUSPENSION
6.1 The Contract may be terminated by the Owner or the Contractor as provided in the General Conditions.
6.2 The Work may be suspended by the Owner as provided in the General Conditions.`
  };

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

  const highlightDifferences = (text: string, docId: string) => {
    if (!comparisonResult) return text;

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

              <div className="flex items-center justify-between">
                <h3 className="font-medium">View Mode:</h3>
                <div className="flex space-x-2">
                  <Button 
                    variant={viewMode === "summary" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setViewMode("summary")}
                    className="flex items-center gap-1"
                  >
                    <Diff className="h-4 w-4" /> Summary
                  </Button>
                  <Button 
                    variant={viewMode === "sideBySide" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setViewMode("sideBySide")}
                    className="flex items-center gap-1"
                  >
                    <LayoutPanelLeft className="h-4 w-4" /> Side by Side
                  </Button>
                </div>
              </div>

              {viewMode === "summary" ? (
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
              ) : (
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
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractDocumentComparison;
