
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import StepIndicator from "@/components/contract-generate/StepIndicator";
import SOPResponseBasicInfo from "@/components/sop-response/SOPResponseBasicInfo";
import SOPResponseParties from "@/components/sop-response/SOPResponseParties";
import SOPResponseDetails from "@/components/sop-response/SOPResponseDetails";
import SOPResponseParticulars from "@/components/sop-response/SOPResponseParticulars";
import SOPResponsePreview from "@/components/sop-response/SOPResponsePreview";

const SOPPaymentResponse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  const [responseData, setResponseData] = useState({
    // Basic response info
    responseReferenceNumber: "",
    responseDate: "",
    projectTitle: "",
    contractIdentification: "",
    contractNumber: "",
    contractDate: "",
    referencePeriodFrom: "",
    referencePeriodTo: "",
    
    // Parties
    claimantName: "",
    claimantAddress: "",
    claimantPhone: "",
    claimantFax: "",
    claimantEmail: "",
    claimantPersonInCharge: "",
    
    respondentName: "",
    respondentAddress: "",
    respondentPhone: "",
    respondentFax: "",
    respondentEmail: "",
    respondentPersonInCharge: "",
    
    // Payment claim identification
    paymentClaimReference: "",
    paymentClaimDate: "",
    claimAmount: 0,
    
    // Response details
    responseItems: [],
    subtotalResponseAmount: 0,
    amountWithheld: 0,
    reasonsForWithholding: "",
    subtotalAmountWithheld: 0,
    lessAmountPreviouslyPaid: 0,
    totalResponseAmount: 0,
    
    // Particulars
    particulars: [],
    
    // Supporting docs
    supportingDocuments: "",
    numberOfPages: ""
  });

  const steps = [
    { number: 1, label: "Basic Information" },
    { number: 2, label: "Parties Details" },
    { number: 3, label: "Response Details" },
    { number: 4, label: "Response Particulars" },
    { number: 5, label: "Preview & Generate" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setResponseData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Generate the payment response
      toast({
        title: "Payment Response Generated",
        description: "Your SOP Act compliant payment response has been created successfully.",
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
          <SOPResponseBasicInfo
            data={responseData}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <SOPResponseParties
            data={responseData}
            onChange={handleInputChange}
          />
        );
      case 3:
        return (
          <SOPResponseDetails
            data={responseData}
            onChange={handleInputChange}
          />
        );
      case 4:
        return (
          <SOPResponseParticulars
            data={responseData}
            onChange={handleInputChange}
          />
        );
      case 5:
        return (
          <SOPResponsePreview
            data={responseData}
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
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">SOP Payment Response Generation</h2>
            <p className="text-gray-600 mt-1">Create a Building and Construction Industry Security of Payment Act compliant payment response</p>
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
              {step < 5 ? "Continue" : "Generate Payment Response"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SOPPaymentResponse;
