
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface WorkItem {
  id: string;
  description: string;
  contractAmount: number;
  workDonePercentage: number;
  amountClaimed: number;
}

interface SOPClaimDetailsProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const SOPClaimDetails: React.FC<SOPClaimDetailsProps> = ({ data, onChange }) => {
  const [workItems, setWorkItems] = useState<WorkItem[]>(data.workItems || []);

  const addWorkItem = () => {
    const newItem: WorkItem = {
      id: `item-${Date.now()}`,
      description: "",
      contractAmount: 0,
      workDonePercentage: 0,
      amountClaimed: 0
    };
    const updatedItems = [...workItems, newItem];
    setWorkItems(updatedItems);
    onChange('workItems', updatedItems);
  };

  const updateWorkItem = (id: string, field: keyof WorkItem, value: string | number) => {
    const updatedItems = workItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Auto-calculate amount claimed if contract amount or percentage changes
        if (field === 'contractAmount' || field === 'workDonePercentage') {
          updatedItem.amountClaimed = (updatedItem.contractAmount * updatedItem.workDonePercentage) / 100;
        }
        return updatedItem;
      }
      return item;
    });
    setWorkItems(updatedItems);
    onChange('workItems', updatedItems);
    
    // Update totals
    const totalClaimed = updatedItems.reduce((sum, item) => sum + item.amountClaimed, 0);
    onChange('totalAmountClaimed', totalClaimed);
    onChange('paymentClaimAmount', totalClaimed - (data.lessAmountPreviouslyPaid || 0));
  };

  const removeWorkItem = (id: string) => {
    const updatedItems = workItems.filter(item => item.id !== id);
    setWorkItems(updatedItems);
    onChange('workItems', updatedItems);
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field.includes('Amount') ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(field, value);
    
    if (field === 'lessAmountPreviouslyPaid') {
      onChange('paymentClaimAmount', (data.totalAmountClaimed || 0) - (value as number));
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Payment Claim Details</CardTitle>
          <CardDescription>
            Enter the work items and amounts for your payment claim
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Work Carried Out by Contractor</h3>
            <Button onClick={addWorkItem} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Work Item
            </Button>
          </div>
          
          {workItems.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Contract Amount ($)</TableHead>
                    <TableHead>Work Done / Completed (%)</TableHead>
                    <TableHead>Amount Claimed ($)</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          value={item.description}
                          onChange={(e) => updateWorkItem(item.id, 'description', e.target.value)}
                          placeholder="e.g., General conditions & preliminaries"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.contractAmount}
                          onChange={(e) => updateWorkItem(item.id, 'contractAmount', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          max="100"
                          value={item.workDonePercentage}
                          onChange={(e) => updateWorkItem(item.id, 'workDonePercentage', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.amountClaimed.toFixed(2)}
                          readOnly
                          className="bg-gray-50"
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeWorkItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalAmountClaimed">Total Amount Claimed</Label>
                <Input
                  id="totalAmountClaimed"
                  type="number"
                  value={data.totalAmountClaimed || 0}
                  readOnly
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lessAmountPreviouslyPaid">Less Amount Previously Paid</Label>
                <Input
                  id="lessAmountPreviouslyPaid"
                  type="number"
                  value={data.lessAmountPreviouslyPaid || 0}
                  onChange={handleInputChange('lessAmountPreviouslyPaid')}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentClaimAmount">Payment Claim Amount</Label>
                <Input
                  id="paymentClaimAmount"
                  type="number"
                  value={data.paymentClaimAmount || 0}
                  readOnly
                  className="bg-white font-bold"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supportingDocuments">Supporting Documents Annexed</Label>
              <Input
                id="supportingDocuments"
                value={data.supportingDocuments}
                onChange={handleInputChange('supportingDocuments')}
                placeholder="List of supporting documents"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfPages">No. of Pages of Claim Particulars</Label>
              <Input
                id="numberOfPages"
                value={data.numberOfPages}
                onChange={handleInputChange('numberOfPages')}
                placeholder="e.g., 3"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPClaimDetails;
