
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Variation {
  id: string;
  description: string;
  instructionReference: string;
  totalValue: number;
  completedPercentage: number;
  claimedValue: number;
}

interface SOPClaimVariationsProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const SOPClaimVariations: React.FC<SOPClaimVariationsProps> = ({ data, onChange }) => {
  const [variations, setVariations] = useState<Variation[]>(data.variations || []);

  const addVariation = () => {
    const newVariation: Variation = {
      id: `var-${Date.now()}`,
      description: "",
      instructionReference: "",
      totalValue: 0,
      completedPercentage: 0,
      claimedValue: 0
    };
    const updatedVariations = [...variations, newVariation];
    setVariations(updatedVariations);
    onChange('variations', updatedVariations);
  };

  const updateVariation = (id: string, field: keyof Variation, value: string | number) => {
    const updatedVariations = variations.map(variation => {
      if (variation.id === id) {
        const updatedVariation = { ...variation, [field]: value };
        // Auto-calculate claimed value if total value or percentage changes
        if (field === 'totalValue' || field === 'completedPercentage') {
          updatedVariation.claimedValue = (updatedVariation.totalValue * updatedVariation.completedPercentage) / 100;
        }
        return updatedVariation;
      }
      return variation;
    });
    setVariations(updatedVariations);
    onChange('variations', updatedVariations);
  };

  const removeVariation = (id: string) => {
    const updatedVariations = variations.filter(variation => variation.id !== id);
    setVariations(updatedVariations);
    onChange('variations', updatedVariations);
  };

  const totalVariationsClaimed = variations.reduce((sum, variation) => sum + variation.claimedValue, 0);

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Particulars of Variations</CardTitle>
        <CardDescription>
          Enter any contract variations included in this payment claim
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Contract Variations</h3>
          <Button onClick={addVariation} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Variation
          </Button>
        </div>
        
        {variations.length > 0 ? (
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description of Variation (including location)</TableHead>
                    <TableHead>Instruction Reference No.</TableHead>
                    <TableHead>Total Value of Variation ($)</TableHead>
                    <TableHead>Variation Completed (%)</TableHead>
                    <TableHead>Value = Total Value x % ($)</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {variations.map((variation, index) => (
                    <TableRow key={variation.id}>
                      <TableCell>
                        <Input
                          value={variation.description}
                          onChange={(e) => updateVariation(variation.id, 'description', e.target.value)}
                          placeholder={`${index + 1}. To provide additional equipment for 15 Resident Consultant Team (RCT) and removal upon completion`}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={variation.instructionReference}
                          onChange={(e) => updateVariation(variation.id, 'instructionReference', e.target.value)}
                          placeholder="Mc/Arch/002"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={variation.totalValue}
                          onChange={(e) => updateVariation(variation.id, 'totalValue', parseFloat(e.target.value) || 0)}
                          placeholder="400,000.00"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          max="100"
                          value={variation.completedPercentage}
                          onChange={(e) => updateVariation(variation.id, 'completedPercentage', parseFloat(e.target.value) || 0)}
                          placeholder="49.69"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={variation.claimedValue.toFixed(2)}
                          readOnly
                          className="bg-gray-50"
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeVariation(variation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Sub-total carried to summary:</span>
                <span className="font-bold text-lg">${totalVariationsClaimed.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No variations added yet. Click "Add Variation" to include contract variations in your payment claim.</p>
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Notes setting out the details of the variation are appended as supporting documentation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SOPClaimVariations;
