
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface SOPResponseParticularsProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const SOPResponseParticulars: React.FC<SOPResponseParticularsProps> = ({ data, onChange }) => {
  const addParticular = () => {
    const newParticular = {
      id: Date.now(),
      description: "",
      allocationContractSum: 0,
      allocationPaymentClaim: 0,
      allocationPaymentResponse: 0,
      reasonsAndCalculations: ""
    };
    const currentParticulars = data.particulars || [];
    onChange('particulars', [...currentParticulars, newParticular]);
  };

  const removeParticular = (id: number) => {
    const currentParticulars = data.particulars || [];
    const updatedParticulars = currentParticulars.filter((item: any) => item.id !== id);
    onChange('particulars', updatedParticulars);
  };

  const updateParticular = (id: number, field: string, value: any) => {
    const currentParticulars = data.particulars || [];
    const updatedParticulars = currentParticulars.map((item: any) => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange('particulars', updatedParticulars);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Payment Response Particulars</CardTitle>
          <CardDescription>
            Detailed breakdown of each work item with allocations and response amounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Particulars Items</h3>
              <Button type="button" onClick={addParticular} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Particular
              </Button>
            </div>
            
            {data.particulars?.map((item: any, index: number) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeParticular(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="e.g., General conditions & preliminaries"
                      value={item.description}
                      onChange={(e) => updateParticular(item.id, 'description', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Allocation in Contract Sum ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={item.allocationContractSum}
                        onChange={(e) => updateParticular(item.id, 'allocationContractSum', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Allocation in Payment Claim ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={item.allocationPaymentClaim}
                        onChange={(e) => updateParticular(item.id, 'allocationPaymentClaim', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Allocation in Payment Response ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={item.allocationPaymentResponse}
                        onChange={(e) => updateParticular(item.id, 'allocationPaymentResponse', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Reasons and Calculations</Label>
                    <Textarea
                      placeholder="Detailed reasons for differences and supporting calculations"
                      value={item.reasonsAndCalculations}
                      onChange={(e) => updateParticular(item.id, 'reasonsAndCalculations', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {(!data.particulars || data.particulars.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <p>No particulars added yet. Click "Add Particular" to start.</p>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Supporting Documentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supportingDocuments">Supporting Documents</Label>
                <Textarea
                  id="supportingDocuments"
                  placeholder="List of supporting documents, calculations, and attachments"
                  value={data.supportingDocuments}
                  onChange={(e) => onChange('supportingDocuments', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="numberOfPages">Number of Pages</Label>
                <Input
                  id="numberOfPages"
                  placeholder="e.g., 15"
                  value={data.numberOfPages}
                  onChange={(e) => onChange('numberOfPages', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPResponseParticulars;
