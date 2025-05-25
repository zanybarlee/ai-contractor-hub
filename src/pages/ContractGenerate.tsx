import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { contractTemplates } from "@/lib/contracts";
import { cn } from "@/lib/utils";
import SOPContractForm from "@/components/contractors/SOPContractForm";

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

          <div className="mb-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                      step === i 
                        ? "bg-blue-600 text-white" 
                        : step > i 
                          ? "bg-green-100 text-green-600 border border-green-600" 
                          : "bg-gray-100 text-gray-400"
                    )}
                  >
                    {step > i ? <CheckCircle className="h-5 w-5" /> : i}
                  </div>
                  <span className={cn(
                    "text-sm mt-2",
                    step === i ? "text-blue-600 font-medium" : "text-gray-500"
                  )}>
                    {i === 1 ? "Select Template" : i === 2 ? "Project Details" : "Customize & Generate"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contractTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={cn(
                    "cursor-pointer hover:shadow-md transition-shadow border-2",
                    selectedTemplate === template.id 
                      ? "border-blue-600" 
                      : "border-transparent"
                  )}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={cn(
                        "px-2 py-1 text-xs rounded-full",
                        template.type === 'SOP' 
                          ? "bg-green-50 text-green-700" 
                          : "bg-blue-50 text-blue-700"
                      )}>
                        {template.type}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {template.complexity} Complexity
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-1">INDUSTRY SECTORS</p>
                      <div className="flex flex-wrap gap-1">
                        {template.sectors.map((sector) => (
                          <span key={sector} className="text-xs text-gray-600">
                            {sector}{template.sectors.indexOf(sector) < template.sectors.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {step === 2 && (
            <>
              {isSOPContract ? (
                <SOPContractForm 
                  formData={sopFormData}
                  onFormChange={handleSOPFormChange}
                />
              ) : (
                <Card className="max-w-3xl mx-auto">
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription>
                      Enter the basic information about your construction project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Contract Title</Label>
                        <Input 
                          id="title" 
                          name="title"
                          placeholder="e.g., Commercial Office Building Construction"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="clientName">Client Name</Label>
                          <Input 
                            id="clientName" 
                            name="clientName"
                            placeholder="Client/Owner Name"
                            value={formData.clientName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contractorName">Contractor Name</Label>
                          <Input 
                            id="contractorName" 
                            name="contractorName"
                            placeholder="Contractor Company Name"
                            value={formData.contractorName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="value">Contract Value</Label>
                          <Input 
                            id="value" 
                            name="value"
                            type="number"
                            placeholder="e.g., 1000000"
                            value={formData.value}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Select 
                            value={formData.currency} 
                            onValueChange={(value) => handleSelectChange("currency", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD - US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">GBP - British Pound</SelectItem>
                              <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                              <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Project Description</Label>
                        <Textarea 
                          id="description" 
                          name="description"
                          placeholder="Brief description of the project scope and objectives"
                          rows={4}
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {step === 3 && (
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Customize & Generate</CardTitle>
                <CardDescription>
                  {isSOPContract 
                    ? "Generate your SOP Act compliant contract with the provided details"
                    : "Customize the AI parameters for your contract generation"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isSOPContract ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg space-y-3">
                      <div className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-900">SOP Act Compliance</p>
                          <p className="text-sm text-green-700">This contract will be automatically generated with all required SOP Act payment terms and procedures.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <FileText className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-900">Payment Claim Procedures</p>
                          <p className="text-sm text-green-700">Includes proper payment claim forms and response timeframes as mandated by the Act.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <FileText className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-900">Dispute Resolution</p>
                          <p className="text-sm text-green-700">Built-in adjudication procedures for rapid dispute resolution as per SOP Act requirements.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-700">Risk Profile</h3>
                      <RadioGroup defaultValue="balanced" className="flex flex-col md:flex-row gap-4">
                        <div className="flex items-center space-x-2 border rounded-lg p-4 flex-1 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="conservative" id="conservative" />
                          <Label htmlFor="conservative" className="cursor-pointer">
                            <div className="font-medium">Conservative</div>
                            <div className="text-sm text-gray-500">Minimize risk with more protective clauses</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-4 flex-1 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="balanced" id="balanced" />
                          <Label htmlFor="balanced" className="cursor-pointer">
                            <div className="font-medium">Balanced</div>
                            <div className="text-sm text-gray-500">Industry standard terms with balanced risk allocation</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-4 flex-1 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="aggressive" id="aggressive" />
                          <Label htmlFor="aggressive" className="cursor-pointer">
                            <div className="font-medium">Aggressive</div>
                            <div className="text-sm text-gray-500">Prioritize favorable terms for your position</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-700">Contract Complexity</h3>
                      <RadioGroup defaultValue="standard" className="flex flex-col md:flex-row gap-4">
                        <div className="flex items-center space-x-2 border rounded-lg p-4 flex-1 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="simplified" id="simplified" />
                          <Label htmlFor="simplified" className="cursor-pointer">
                            <div className="font-medium">Simplified</div>
                            <div className="text-sm text-gray-500">Streamlined contract with essential clauses only</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-4 flex-1 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="cursor-pointer">
                            <div className="font-medium">Standard</div>
                            <div className="text-sm text-gray-500">Comprehensive coverage of standard provisions</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-4 flex-1 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="detailed" id="detailed" />
                          <Label htmlFor="detailed" className="cursor-pointer">
                            <div className="font-medium">Detailed</div>
                            <div className="text-sm text-gray-500">Extensive provisions covering all contingencies</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-700">AI Suggestions</h3>
                      <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                        <div className="flex gap-2">
                          <FileText className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">Consider payment milestone structure</p>
                            <p className="text-sm text-blue-700">For projects of this value, a milestone-based payment structure typically reduces financial risk.</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <FileText className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">Add specific completion criteria</p>
                            <p className="text-sm text-blue-700">Clear completion criteria will prevent disputes during project handover.</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <FileText className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">Include weather considerations</p>
                            <p className="text-sm text-blue-700">Based on project location, specific weather clauses may be advisable.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
