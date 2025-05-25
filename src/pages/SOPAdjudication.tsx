
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import StepIndicator from "@/components/contract-generate/StepIndicator";
import SOPAdjudicationBasicInfo from "@/components/sop-adjudication/SOPAdjudicationBasicInfo";
import SOPAdjudicationParties from "@/components/sop-adjudication/SOPAdjudicationParties";
import SOPAdjudicationContract from "@/components/sop-adjudication/SOPAdjudicationContract";
import SOPAdjudicationDispute from "@/components/sop-adjudication/SOPAdjudicationDispute";
import SOPAdjudicationPreview from "@/components/sop-adjudication/SOPAdjudicationPreview";

const SOPAdjudication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  const [adjudicationData, setAdjudicationData] = useState({
    // Basic info
    noticeDate: "",
    
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
    
    // Contract details
    projectTitle: "",
    contractNumber: "",
    contractDate: "",
    
    // Payment claim and response
    paymentClaimReference: "",
    paymentClaimAmount: 0,
    paymentResponseReference: "",
    paymentResponseAmount: 0,
    
    // Dispute details
    disputeType: "",
    disputeDescription: "",
    
    // Signature
    claimantAuthorisedRepresentative: "",
    organisationStamp: "",
    signatureDate: ""
  });

  const steps = [
    { number: 1, label: "Basic Information" },
    { number: 2, label: "Parties Details" },
    { number: 3, label: "Contract Details" },
    { number: 4, label: "Dispute Details" },
    { number: 5, label: "Preview & Generate" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setAdjudicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Generate the adjudication notice
      toast({
        title: "Adjudication Notice Generated",
        description: "Your SOP Act compliant Notice of Intention to Apply for Adjudication has been created successfully.",
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
          <SOPAdjudicationBasicInfo
            data={adjudicationData}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <SOPAdjudicationParties
            data={adjudicationData}
            onChange={handleInputChange}
          />
        );
      case 3:
        return (
          <SOPAdjudicationContract
            data={adjudicationData}
            onChange={handleInputChange}
          />
        );
      case 4:
        return (
          <SOPAdjudicationDispute
            data={adjudicationData}
            onChange={handleInputChange}
          />
        );
      case 5:
        return (
          <SOPAdjudicationPreview
            data={adjudicationData}
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
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">SOP Adjudication Notice Generation</h2>
            <p className="text-gray-600 mt-1">Create a Notice of Intention to Apply for Adjudication under the Building and Construction Industry Security of Payment Act</p>
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
              {step < 5 ? "Continue" : "Generate Adjudication Notice"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SOPAdjudication;
