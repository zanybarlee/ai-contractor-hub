
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import StepIndicator from "@/components/contract-generate/StepIndicator";
import SOPClaimBasicInfo from "@/components/sop-claim/SOPClaimBasicInfo";
import SOPClaimParties from "@/components/sop-claim/SOPClaimParties";
import SOPClaimDetails from "@/components/sop-claim/SOPClaimDetails";
import SOPClaimVariations from "@/components/sop-claim/SOPClaimVariations";
import SOPClaimPreview from "@/components/sop-claim/SOPClaimPreview";

const SOPPaymentClaim = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  const [claimData, setClaimData] = useState({
    // Basic claim info
    claimReferenceNumber: "",
    claimDate: "",
    projectTitle: "",
    contractIdentification: "",
    contractNumber: "",
    contractDate: "",
    referencePeriodFrom: "",
    referencePeriodTo: "",
    
    // Parties
    respondentName: "",
    respondentAddress: "",
    respondentPhone: "",
    respondentFax: "",
    respondentEmail: "",
    respondentPersonInCharge: "",
    
    claimantName: "",
    claimantAddress: "",
    claimantPhone: "",
    claimantFax: "",
    claimantEmail: "",
    claimantPersonInCharge: "",
    
    // Claim details
    workItems: [],
    totalAmountClaimed: 0,
    lessAmountPreviouslyPaid: 0,
    paymentClaimAmount: 0,
    
    // Variations
    variations: [],
    
    // Supporting docs
    supportingDocuments: "",
    numberOfPages: ""
  });

  const steps = [
    { number: 1, label: "Basic Information" },
    { number: 2, label: "Parties Details" },
    { number: 3, label: "Claim Details" },
    { number: 4, label: "Variations" },
    { number: 5, label: "Preview & Generate" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setClaimData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Generate the payment claim
      toast({
        title: "Payment Claim Generated",
        description: "Your SOP Act compliant payment claim has been created successfully.",
      });
      // In a real app, this would generate and download the PDF
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/contracts");
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <SOPClaimBasicInfo
            data={claimData}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <SOPClaimParties
            data={claimData}
            onChange={handleInputChange}
          />
        );
      case 3:
        return (
          <SOPClaimDetails
            data={claimData}
            onChange={handleInputChange}
          />
        );
      case 4:
        return (
          <SOPClaimVariations
            data={claimData}
            onChange={handleInputChange}
          />
        );
      case 5:
        return (
          <SOPClaimPreview
            data={claimData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <div className="mb-8">
            <button 
              onClick={handlePrevStep}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">SOP Payment Claim Generation</h2>
            <p className="text-gray-600 mt-1">Create a Building and Construction Industry Security of Payment Act compliant payment claim</p>
          </div>

          <StepIndicator currentStep={step} steps={steps} />

          {renderStepContent()}

          <div className="mt-8 flex justify-between max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={handlePrevStep}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            <Button onClick={handleNextStep}>
              {step < 5 ? "Continue" : "Generate Payment Claim"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SOPPaymentClaim;
