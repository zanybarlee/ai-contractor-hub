
import { useState } from "react";
import { FileText, Wand2, Download, FileCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { queryTextToContract } from "./textToContractService";

const TextToContractModule = () => {
  const [inputText, setInputText] = useState("");
  const [generatedContract, setGeneratedContract] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayFormat, setDisplayFormat] = useState<"contract" | "sop-claim">("contract");
  const { toast } = useToast();

  const handleGenerateContract = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a description to generate a contract.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const contractText = await queryTextToContract(inputText);
      setGeneratedContract(contractText);
      toast({
        title: "Contract Generated",
        description: "Your contract has been successfully generated.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate contract. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadContract = () => {
    if (!generatedContract) return;

    const content = displayFormat === "sop-claim" ? renderSOPClaimAsText() : generatedContract;
    const filename = displayFormat === "sop-claim" ? 'sop-payment-claim.txt' : 'generated-contract.txt';

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    setInputText("");
    setGeneratedContract("");
    setDisplayFormat("contract");
  };

  const formatContractText = (text: string) => {
    // Split text into paragraphs and format
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      const trimmedParagraph = paragraph.trim();
      if (!trimmedParagraph) return null;

      // Check if it's a heading (starts with numbers, all caps, or specific patterns)
      const isHeading = /^(\d+\.|\d+\.\d+\.|\b[A-Z][A-Z\s]+\b:|\b(ARTICLE|SECTION|CLAUSE)\b)/i.test(trimmedParagraph);
      const isSubHeading = /^[a-z]\)|\([a-z]\)|\d+\.\d+/i.test(trimmedParagraph);
      const isBulletPoint = /^[-•*]\s/.test(trimmedParagraph);
      const isNumberedList = /^\d+\.\s/.test(trimmedParagraph);

      if (isHeading) {
        return (
          <h3 key={index} className="text-lg font-bold text-gray-900 mt-6 mb-3 border-b border-gray-200 pb-2">
            {trimmedParagraph}
          </h3>
        );
      }

      if (isSubHeading) {
        return (
          <h4 key={index} className="text-md font-semibold text-gray-800 mt-4 mb-2">
            {trimmedParagraph}
          </h4>
        );
      }

      if (isBulletPoint || isNumberedList) {
        return (
          <div key={index} className="ml-4 mb-2">
            <p className="text-gray-700 leading-relaxed">{trimmedParagraph}</p>
          </div>
        );
      }

      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4 text-justify">
          {trimmedParagraph}
        </p>
      );
    }).filter(Boolean);
  };

  const renderSOPClaimAsText = () => {
    return `Sample 2: Payment claim

Payment claim reference number: ________________    Payment claim date: (DD/MM/YY) ________________

To: (Respondent's name or registered company / organisation name)
Service address:                                    Tel:
                                                   Fax:
                                                   Email:

Person-in-charge (Respondent): (Name of authorised representative, designation, contact details)

From: (Claimant's name or registered company / organisation name)
Service address:                                    Tel:
                                                   Fax:
                                                   Email:

Person-in-charge (Claimant): (Name of authorised representative, designation, contact details)

Particulars of Contract
Project title:

*Contract identification:                           Reference period of this claim:
(e.g. contract title, contract number / Invoice     From (DD/MM/YY) to (DD/MM/YY)
number, date contract made)

Payment Claim Details
[THIS IS TABLE: Payment claim details with columns for Description of Item/Variation reference no., Total value of Item/variation ($), Quantity/Quantum (e.g. % Completed/Delivered), and Amount claimed for item ($)]

Total amount claimed                                                               $
Less amount previously paid                                                        $
*Payment claim amount                                                             $

Name of claimant / authorised
representative:                          _________________________________

Authorised signature &
Organisation stamp (if applicable):      _________________________________

Date:                                   _________________ (DD/MM/YY)

* Inputs are mandatory under the Building and Construction Industry Security of Payment Act.`;
  };

  const renderSOPClaimForm = () => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="space-y-6 font-mono text-sm">
          <div className="text-lg font-bold mb-4">Sample 2: Payment claim</div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>Payment claim reference number: ________________</div>
            <div>Payment claim date: (DD/MM/YY) ________________</div>
          </div>

          <div className="border border-gray-400 p-4 space-y-2">
            <div className="font-semibold">To: (Respondent's name or registered company / organisation name)</div>
            <div className="grid grid-cols-2 gap-4">
              <div>Service address:</div>
              <div className="space-y-1">
                <div>Tel:</div>
                <div>Fax:</div>
                <div>Email:</div>
              </div>
            </div>
            <div>Person-in-charge (Respondent): (Name of authorised representative, designation, contact details)</div>
          </div>

          <div className="border border-gray-400 p-4 space-y-2">
            <div className="font-semibold">From: (Claimant's name or registered company / organisation name)</div>
            <div className="grid grid-cols-2 gap-4">
              <div>Service address:</div>
              <div className="space-y-1">
                <div>Tel:</div>
                <div>Fax:</div>
                <div>Email:</div>
              </div>
            </div>
            <div>Person-in-charge (Claimant): (Name of authorised representative, designation, contact details)</div>
          </div>

          <div className="border border-gray-400 p-4 space-y-2">
            <div className="font-bold">Particulars of Contract</div>
            <div>Project title:</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div>*Contract identification:</div>
                <div className="text-xs italic">(e.g. contract title, contract number / Invoice number, date contract made)</div>
              </div>
              <div>
                <div>Reference period of this claim:</div>
                <div>From (DD/MM/YY) to (DD/MM/YY)</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold">Payment Claim Details</div>
            <div className="border border-gray-400">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="border-r border-gray-400 p-2 text-left">*Description of Item / Variation reference no.</th>
                    <th className="border-r border-gray-400 p-2 text-left">Total value of Item / variation ($)</th>
                    <th className="border-r border-gray-400 p-2 text-left">*Quantity / Quantum (e.g. % Completed / Delivered)</th>
                    <th className="p-2 text-left">*Amount claimed for item ($) (Supported with relevant calculations* and attachments, if any)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-r border-gray-400 p-2 h-20"></td>
                    <td className="border-r border-gray-400 p-2"></td>
                    <td className="border-r border-gray-400 p-2"></td>
                    <td className="p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="border border-gray-400">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="p-2 font-semibold">Total amount claimed</td>
                    <td className="p-2 text-right">$</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="p-2 font-semibold">Less amount previously paid</td>
                    <td className="p-2 text-right">$</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">*Payment claim amount</td>
                    <td className="p-2 text-right font-bold">$</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div>Name of claimant / authorised representative: _________________________________</div>
            <div>Authorised signature & Organisation stamp (if applicable): _________________________________</div>
            <div>Date: _________________ (DD/MM/YY)</div>
          </div>

          <div className="text-xs italic">
            * Inputs are mandatory under the Building and Construction Industry Security of Payment Act.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            AI Contract Generator
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
              onClick={handleGenerateContract} 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "Generating..." : "Generate Contract"}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearAll}
              disabled={isLoading}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generated Contract
            </div>
            <div className="flex items-center gap-2">
              {generatedContract && (
                <>
                  <div className="flex gap-1">
                    <Button 
                      variant={displayFormat === "contract" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDisplayFormat("contract")}
                    >
                      Contract
                    </Button>
                    <Button 
                      variant={displayFormat === "sop-claim" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDisplayFormat("sop-claim")}
                      className="gap-1"
                    >
                      <FileCheck className="h-3 w-3" />
                      SOP Form
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDownloadContract}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {generatedContract ? (
            displayFormat === "contract" ? (
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="prose prose-sm max-w-none overflow-auto max-h-[500px]">
                  {formatContractText(generatedContract)}
                </div>
              </div>
            ) : (
              <div className="overflow-auto max-h-[500px]">
                {renderSOPClaimForm()}
              </div>
            )
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Generated contract will appear here</p>
              <p className="text-sm mt-1">Enter a description and click "Generate Contract" to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TextToContractModule;
