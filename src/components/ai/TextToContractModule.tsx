
import { useState } from "react";
import { FileText, Wand2, Download } from "lucide-react";
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

    const blob = new Blob([generatedContract], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-contract.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    setInputText("");
    setGeneratedContract("");
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
            {generatedContract && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDownloadContract}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {generatedContract ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm font-mono overflow-auto max-h-[400px]">
                {generatedContract}
              </pre>
            </div>
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
