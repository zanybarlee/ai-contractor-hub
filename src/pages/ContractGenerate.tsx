
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { contractTemplates } from "@/lib/contracts";
import SOPContractForm from "@/components/contractors/SOPContractForm";
import StepIndicator from "@/components/contract-generate/StepIndicator";
import TemplateSelection from "@/components/contract-generate/TemplateSelection";
import ProjectDetailsForm from "@/components/contract-generate/ProjectDetailsForm";
import CustomizeAndGenerate from "@/components/contract-generate/CustomizeAndGenerate";

const ContractGenerate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    contractorName: "",
    value: "",
    currency: "USD",
    description: "",
  });

  const [sopFormData, setSOPFormData] = useState({});

  const steps = [
    { number: 1, label: "Select Template" },
    { number: 2, label: "Project Details" },
    { number: 3, label: "Customize & Generate" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSOPFormChange = (field: string, value: string) => {
    setSOPFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const selectedTemplateData = contractTemplates.find(t => t.id === selectedTemplate);
  const isSOPContract = selectedTemplateData?.type === 'SOP';

  const handleNextStep = () => {
    if (step === 1 && !selectedTemplate) {
      toast({
        title: "Template Required",
        description: "Please select a contract template to continue.",
        variant: "destructive",
      });
      return;
    }

    if (step === 2) {
      // Validate form
      if (!isSOPContract) {
        if (!formData.title || !formData.clientName || !formData.contractorName || !formData.value) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields to continue.",
            variant: "destructive",
          });
          return;
        }
      }
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final step: generate the contract
      toast({
        title: "Contract Generated",
        description: `Your ${isSOPContract ? 'SOP Act compliant' : ''} contract has been created successfully.`,
      });
      navigate("/contracts/c001"); // Redirect to the first sample contract for demo
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
          <TemplateSelection
            templates={contractTemplates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
          />
        );
      case 2:
        return isSOPContract ? (
          <SOPContractForm 
            formData={sopFormData}
            onFormChange={handleSOPFormChange}
          />
        ) : (
          <ProjectDetailsForm
            formData={formData}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
        );
      case 3:
        return <CustomizeAndGenerate isSOPContract={isSOPContract} />;
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
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">AI Contract Generation</h2>
            <p className="text-gray-600 mt-1">Create a new contract using AI-assisted templates</p>
          </div>

          <StepIndicator currentStep={step} steps={steps} />

          {renderStepContent()}

          <div className="mt-8 flex justify-between max-w-3xl mx-auto">
            <Button 
              variant="outline" 
              onClick={handlePrevStep}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            <Button onClick={handleNextStep}>
              {step < 3 ? "Continue" : `Generate ${isSOPContract ? 'SOP ' : ''}Contract`}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContractGenerate;
