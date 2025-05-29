
import { useState, useEffect } from "react";
import { FileText, Wand2, Download, FileCheck, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { queryTextToContract } from "./textToContractService";

const STORAGE_KEY = 'ai-generated-contract';

interface SOPFormData {
  paymentClaimReferenceNumber: string;
  paymentClaimDate: string;
  respondentName: string;
  respondentAddress: string;
  respondentPhone: string;
  respondentFax: string;
  respondentEmail: string;
  respondentPersonInCharge: string;
  claimantName: string;
  claimantAddress: string;
  claimantPhone: string;
  claimantFax: string;
  claimantEmail: string;
  claimantPersonInCharge: string;
  projectTitle: string;
  contractIdentification: string;
  contractNumber: string;
  contractDate: string;
  referencePeriodFrom: string;
  referencePeriodTo: string;
  workCarriedOut: string;
  unfixedGoods: string;
  nominatedSubcontractor: string;
  unfixedGoodsNominated: string;
  totalAmount: string;
  lessAmountPaid: string;
  claimAmount: string;
  claimAmountWords: string;
}

const TextToContractModule = () => {
  const [inputText, setInputText] = useState("");
  const [generatedContract, setGeneratedContract] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayFormat, setDisplayFormat] = useState<"contract" | "sop-claim">("contract");
  const [sopFormData, setSOPFormData] = useState<SOPFormData | null>(null);
  const { toast } = useToast();

  // Load persisted contract on component mount
  useEffect(() => {
    const savedContract = localStorage.getItem(STORAGE_KEY);
    if (savedContract) {
      setGeneratedContract(savedContract);
      parseContractToSOPForm(savedContract);
    }
  }, []);

  // Save contract to localStorage whenever it changes
  useEffect(() => {
    if (generatedContract) {
      localStorage.setItem(STORAGE_KEY, generatedContract);
      parseContractToSOPForm(generatedContract);
    }
  }, [generatedContract]);

  const parseContractToSOPForm = (contractText: string) => {
    try {
      // Parse the generated contract text to extract SOP form data
      const lines = contractText.split('\n');
      const formData: SOPFormData = {
        paymentClaimReferenceNumber: extractValue(contractText, /Payment Claim Reference Number[:\s]*([^\n]+)/i) || '',
        paymentClaimDate: extractValue(contractText, /Payment Claim Date[:\s]*([^\n]+)/i) || '',
        respondentName: extractValue(contractText, /To[:\s]*\*?\*?([^*\n]+)/i) || '',
        respondentAddress: extractValue(contractText, /Service Address[:\s]*([^\n]+)/i) || '',
        respondentPhone: extractValue(contractText, /Tel[:\s]*([^\n|]+)/i) || '',
        respondentFax: extractValue(contractText, /Fax[:\s]*([^\n|]+)/i) || '',
        respondentEmail: extractValue(contractText, /Email[:\s]*([^\n]+)/i) || '',
        respondentPersonInCharge: extractValue(contractText, /Person-in-charge[:\s]*([^\n]+)/i) || '',
        claimantName: extractValue(contractText, /From[:\s]*\*?\*?([^*\n]+)/i) || '',
        claimantAddress: extractAfterKeyword(contractText, 'From', 'Service Address') || '',
        claimantPhone: extractAfterKeyword(contractText, 'From', 'Tel') || '',
        claimantFax: extractAfterKeyword(contractText, 'From', 'Fax') || '',
        claimantEmail: extractAfterKeyword(contractText, 'From', 'Email') || '',
        claimantPersonInCharge: extractAfterKeyword(contractText, 'From', 'Person-in-charge') || '',
        projectTitle: extractValue(contractText, /Project Title[:\s]*([^\n]+)/i) || '',
        contractIdentification: extractValue(contractText, /Contract Title[\/\s]*Description[:\s]*([^\n]+)/i) || '',
        contractNumber: extractValue(contractText, /Contract Number[:\s]*([^\n]+)/i) || '',
        contractDate: extractValue(contractText, /Date Contract Made[:\s]*([^\n]+)/i) || '',
        referencePeriodFrom: extractValue(contractText, /From[:\s]*(\d{2}\/\d{2}\/\d{4})/i) || '',
        referencePeriodTo: extractValue(contractText, /to[:\s]*(\d{2}\/\d{2}\/\d{4})/i) || '',
        workCarriedOut: extractValue(contractText, /Work carried out by Contractor[:\s]*\$?([0-9,]+\.?\d*)/i) || '',
        unfixedGoods: extractValue(contractText, /Unfixed goods & materials[:\s]*\$?([0-9,]+\.?\d*)/i) || '',
        nominatedSubcontractor: extractValue(contractText, /Nominated sub-contractor[:\s]*([^\n]+)/i) || '-',
        unfixedGoodsNominated: extractValue(contractText, /Unfixed goods & materials of nominated[:\s]*([^\n]+)/i) || '-',
        totalAmount: extractValue(contractText, /Total[:\s]*\$?([0-9,]+\.?\d*)/i) || '',
        lessAmountPaid: extractValue(contractText, /Less amounts previously paid[:\s]*\$?([0-9,]+\.?\d*)/i) || '',
        claimAmount: extractValue(contractText, /CLAIM AMOUNT[:\s]*\*?\*?\$?([0-9,]+\.?\d*)/i) || '',
        claimAmountWords: extractValue(contractText, /Claim Amount in Words[:\s]*([^\n]+)/i) || ''
      };

      setSOPFormData(formData);
    } catch (error) {
      console.error('Error parsing contract to SOP form:', error);
    }
  };

  const extractValue = (text: string, regex: RegExp): string | null => {
    const match = text.match(regex);
    return match ? match[1].trim().replace(/\*/g, '') : null;
  };

  const extractAfterKeyword = (text: string, startKeyword: string, targetKeyword: string): string => {
    const startIndex = text.indexOf(startKeyword);
    if (startIndex === -1) return '';
    
    const fromSection = text.substring(startIndex);
    const match = fromSection.match(new RegExp(`${targetKeyword}[:\\s]*([^\\n|]+)`, 'i'));
    return match ? match[1].trim() : '';
  };

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
        description: "Your contract has been successfully generated and saved.",
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

  const handleClearContract = () => {
    setGeneratedContract("");
    setSOPFormData(null);
    localStorage.removeItem(STORAGE_KEY);
    setDisplayFormat("contract");
    toast({
      title: "Contract Cleared",
      description: "The generated contract has been cleared.",
    });
  };

  const handleClearAll = () => {
    setInputText("");
    setGeneratedContract("");
    setSOPFormData(null);
    localStorage.removeItem(STORAGE_KEY);
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
    if (!sopFormData) {
      return `Sample Payment Claim Form - No contract data parsed yet.`;
    }

    return `Payment Claim

Payment claim reference number: ${sopFormData.paymentClaimReferenceNumber}    Payment claim date: ${sopFormData.paymentClaimDate}

To: ${sopFormData.respondentName}
Service address: ${sopFormData.respondentAddress}                    Tel: ${sopFormData.respondentPhone}
                                                   Fax: ${sopFormData.respondentFax}
                                                   Email: ${sopFormData.respondentEmail}

Person-in-charge (Respondent): ${sopFormData.respondentPersonInCharge}

From: ${sopFormData.claimantName}
Service address: ${sopFormData.claimantAddress}                    Tel: ${sopFormData.claimantPhone}
                                                   Fax: ${sopFormData.claimantFax}
                                                   Email: ${sopFormData.claimantEmail}

Person-in-charge (Claimant): ${sopFormData.claimantPersonInCharge}

Particulars of Contract
Project title: ${sopFormData.projectTitle}

Contract identification: ${sopFormData.contractIdentification}           Reference period of this claim:
Contract number: ${sopFormData.contractNumber}                          From ${sopFormData.referencePeriodFrom} to ${sopFormData.referencePeriodTo}
Date contract made: ${sopFormData.contractDate}

Amount of Payment Claim
Work carried out by Contractor                                           $${sopFormData.workCarriedOut}
Unfixed goods & materials                                               $${sopFormData.unfixedGoods}
Nominated sub-contractor, suppliers or designated PC work               ${sopFormData.nominatedSubcontractor}
Unfixed goods & materials of nominated sub-contractor, suppliers        ${sopFormData.unfixedGoodsNominated}

Total amount claimed                                                     $${sopFormData.totalAmount}
Less amount previously paid                                              $${sopFormData.lessAmountPaid}
Payment claim amount                                                     $${sopFormData.claimAmount}

Claim amount in words: ${sopFormData.claimAmountWords}

* Inputs are mandatory under the Building and Construction Industry Security of Payment Act.`;
  };

  const renderSOPClaimForm = () => {
    if (!sopFormData) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="text-center py-8 text-gray-500">
            <p>No contract data available to populate SOP form.</p>
            <p className="text-sm mt-1">Generate a contract first to see the mapped SOP form.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="space-y-6 font-mono text-sm">
          <div className="text-lg font-bold mb-4">Payment Claim</div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>Payment claim reference number: {sopFormData.paymentClaimReferenceNumber || '________________'}</div>
            <div>Payment claim date: {sopFormData.paymentClaimDate || '________________'}</div>
          </div>

          <div className="border border-gray-400 p-4 space-y-2">
            <div className="font-semibold">To: {sopFormData.respondentName || '(Respondent\'s name or registered company / organisation name)'}</div>
            <div className="grid grid-cols-2 gap-4">
              <div>Service address: {sopFormData.respondentAddress}</div>
              <div className="space-y-1">
                <div>Tel: {sopFormData.respondentPhone}</div>
                <div>Fax: {sopFormData.respondentFax}</div>
                <div>Email: {sopFormData.respondentEmail}</div>
              </div>
            </div>
            <div>Person-in-charge (Respondent): {sopFormData.respondentPersonInCharge || '(Name of authorised representative, designation, contact details)'}</div>
          </div>

          <div className="border border-gray-400 p-4 space-y-2">
            <div className="font-semibold">From: {sopFormData.claimantName || '(Claimant\'s name or registered company / organisation name)'}</div>
            <div className="grid grid-cols-2 gap-4">
              <div>Service address: {sopFormData.claimantAddress}</div>
              <div className="space-y-1">
                <div>Tel: {sopFormData.claimantPhone}</div>
                <div>Fax: {sopFormData.claimantFax}</div>
                <div>Email: {sopFormData.claimantEmail}</div>
              </div>
            </div>
            <div>Person-in-charge (Claimant): {sopFormData.claimantPersonInCharge || '(Name of authorised representative, designation, contact details)'}</div>
          </div>

          <div className="border border-gray-400 p-4 space-y-2">
            <div className="font-bold">Particulars of Contract</div>
            <div>Project title: {sopFormData.projectTitle}</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div>Contract identification:</div>
                <div className="text-xs">{sopFormData.contractIdentification}</div>
                <div className="text-xs">Contract number: {sopFormData.contractNumber}</div>
                <div className="text-xs">Date contract made: {sopFormData.contractDate}</div>
              </div>
              <div>
                <div>Reference period of this claim:</div>
                <div>From {sopFormData.referencePeriodFrom} to {sopFormData.referencePeriodTo}</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold">Amount of Payment Claim</div>
            <div className="border border-gray-400">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="p-2">Work carried out by Contractor</td>
                    <td className="p-2 text-right">${sopFormData.workCarriedOut}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="p-2">Unfixed goods & materials</td>
                    <td className="p-2 text-right">${sopFormData.unfixedGoods}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="p-2">Nominated sub-contractor, suppliers or designated PC work</td>
                    <td className="p-2 text-right">{sopFormData.nominatedSubcontractor}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="p-2">Unfixed goods & materials of nominated sub-contractor, suppliers</td>
                    <td className="p-2 text-right">{sopFormData.unfixedGoodsNominated}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="border border-gray-400">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="p-2 font-semibold">Total amount claimed</td>
                    <td className="p-2 text-right">${sopFormData.totalAmount}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="p-2 font-semibold">Less amount previously paid</td>
                    <td className="p-2 text-right">${sopFormData.lessAmountPaid}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">Payment claim amount</td>
                    <td className="p-2 text-right font-bold">${sopFormData.claimAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div>Claim amount in words: {sopFormData.claimAmountWords}</div>
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
            Text to Contract
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleClearContract}
                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
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
