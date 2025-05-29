
import { FileText, Download, FileCheck, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SOPFormData } from "../types/contractTypes";
import { formatContractText } from "../utils/contractFormatter";
import SOPClaimRenderer from "./SOPClaimRenderer";

interface ContractOutputSectionProps {
  generatedContract: string;
  displayFormat: "contract" | "sop-claim";
  setDisplayFormat: (format: "contract" | "sop-claim") => void;
  sopFormData: SOPFormData | null;
  onDownload: () => void;
  onClear: () => void;
}

const ContractOutputSection: React.FC<ContractOutputSectionProps> = ({
  generatedContract,
  displayFormat,
  setDisplayFormat,
  sopFormData,
  onDownload,
  onClear
}) => {
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

  return (
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
                  onClick={onDownload}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onClear}
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
              <SOPClaimRenderer sopFormData={sopFormData} />
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
  );
};

export default ContractOutputSection;
