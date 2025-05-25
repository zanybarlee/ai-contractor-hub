
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface SOPResponseDetailsProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const SOPResponseDetails: React.FC<SOPResponseDetailsProps> = ({ data, onChange }) => {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field, e.target.value);
  };

  const addResponseItem = () => {
    const newItem = {
      id: Date.now(),
      description: "",
      claimedAmount: 0,
      responseAmount: 0,
      reasonsForDifference: ""
    };
    const currentItems = data.responseItems || [];
    onChange('responseItems', [...currentItems, newItem]);
  };

  const removeResponseItem = (id: number) => {
    const currentItems = data.responseItems || [];
    const updatedItems = currentItems.filter((item: any) => item.id !== id);
    onChange('responseItems', updatedItems);
  };

  const updateResponseItem = (id: number, field: string, value: any) => {
    const currentItems = data.responseItems || [];
    const updatedItems = currentItems.map((item: any) => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange('responseItems', updatedItems);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Payment Response Details</CardTitle>
          <CardDescription>
            Enter the details of your response to each claimed item
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Response Items</h3>
              <Button type="button" onClick={addResponseItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            
            {data.responseItems?.map((item: any, index: number) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeResponseItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>Description of Item / Variation Reference No.</Label>
                    <Textarea
                      placeholder="e.g., General conditions & preliminaries"
                      value={item.description}
                      onChange={(e) => updateResponseItem(item.id, 'description', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Amount Claimed for Item ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={item.claimedAmount}
                        onChange={(e) => updateResponseItem(item.id, 'claimedAmount', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Response Amount for Item ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={item.responseAmount}
                        onChange={(e) => updateResponseItem(item.id, 'responseAmount', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Reasons for Difference</Label>
                    <Textarea
                      placeholder="Supported with relevant calculations and attachments, if any"
                      value={item.reasonsForDifference}
                      onChange={(e) => updateResponseItem(item.id, 'reasonsForDifference', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {(!data.responseItems || data.responseItems.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <p>No response items added yet. Click "Add Item" to start.</p>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Response Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subtotalResponseAmount">Subtotal for Response Amount ($)</Label>
                <Input
                  id="subtotalResponseAmount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={data.subtotalResponseAmount}
                  onChange={handleInputChange('subtotalResponseAmount')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amountWithheld">Amount Withheld ($)</Label>
                <Input
                  id="amountWithheld"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={data.amountWithheld}
                  onChange={handleInputChange('amountWithheld')}
                />
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="reasonsForWithholding">Reasons for Withholding</Label>
              <Textarea
                id="reasonsForWithholding"
                placeholder="e.g., set-offs, counter-claims - Supported with relevant calculations and attachments, if any"
                value={data.reasonsForWithholding}
                onChange={handleInputChange('reasonsForWithholding')}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="subtotalAmountWithheld">Subtotal for Amount Withheld ($)</Label>
                <Input
                  id="subtotalAmountWithheld"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={data.subtotalAmountWithheld}
                  onChange={handleInputChange('subtotalAmountWithheld')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lessAmountPreviouslyPaid">Less Amount Previously Paid ($)</Label>
                <Input
                  id="lessAmountPreviouslyPaid"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={data.lessAmountPreviouslyPaid}
                  onChange={handleInputChange('lessAmountPreviouslyPaid')}
                />
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="totalResponseAmount">Total Response Amount (payable) ($)</Label>
              <Input
                id="totalResponseAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={data.totalResponseAmount}
                onChange={handleInputChange('totalResponseAmount')}
                className="font-bold text-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPResponseDetails;
