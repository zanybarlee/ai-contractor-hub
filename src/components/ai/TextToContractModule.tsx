
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { queryTextToContract } from "./textToContractService";
import { SOPFormData } from "./types/contractTypes";
import { parseContractToSOPForm } from "./utils/contractParser";
import ContractInputSection from "./components/ContractInputSection";
import ContractOutputSection from "./components/ContractOutputSection";

const STORAGE_KEY = 'ai-generated-contract';

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
      const parsedData = parseContractToSOPForm(savedContract);
      setSOPFormData(parsedData);
    }
  }, []);

  // Save contract to localStorage whenever it changes
  useEffect(() => {
    if (generatedContract) {
      localStorage.setItem(STORAGE_KEY, generatedContract);
      const parsedData = parseContractToSOPForm(generatedContract);
      setSOPFormData(parsedData);
    }
  }, [generatedContract]);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ContractInputSection
        inputText={inputText}
        setInputText={setInputText}
        onGenerate={handleGenerateContract}
        onClearAll={handleClearAll}
        isLoading={isLoading}
      />

      <ContractOutputSection
        generatedContract={generatedContract}
        displayFormat={displayFormat}
        setDisplayFormat={setDisplayFormat}
        sopFormData={sopFormData}
        onDownload={handleDownloadContract}
        onClear={handleClearContract}
      />
    </div>
  );
};

export default TextToContractModule;
