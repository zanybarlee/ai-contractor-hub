
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface Clause {
  id: string;
  title: string;
  content: string;
  riskScore: number;
  recommendations?: string[];
  alternatives?: string[];
}

interface ContractClausesTabProps {
  clauses: Clause[];
}

const ContractClausesTab = ({ clauses }: ContractClausesTabProps) => {
  const { toast } = useToast();

  const getRiskClass = (score: number) => {
    if (score < 30) return "bg-green-100 text-green-800";
    if (score < 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const handleGenerateAlternative = (clauseId: string) => {
    toast({
      title: "Alternative Generated",
      description: "AI has generated an alternative clause for review.",
    });
  };

  return (
    <div className="space-y-6">
      {clauses.map((clause) => (
        <Card key={clause.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">{clause.title}</h3>
                <Badge className={cn("ml-2", getRiskClass(clause.riskScore))}>
                  {clause.riskScore < 30 ? "Low" : clause.riskScore < 70 ? "Medium" : "High"} Risk
                </Badge>
              </div>
              <div className="text-gray-700 mb-4">
                {clause.content}
              </div>
            </div>
            {(clause.recommendations || clause.alternatives) && (
              <div className="bg-gray-50 p-6 border-t">
                {clause.recommendations && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">AI Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {clause.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {clause.alternatives && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Alternative Clauses</h4>
                    <div className="space-y-2">
                      {clause.alternatives.map((alt, index) => (
                        <div key={index} className="p-3 bg-white border rounded-md text-sm text-gray-700">
                          {alt}
                          <div className="mt-2 flex justify-end">
                            <Button variant="outline" size="sm">Replace with This</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {!clause.alternatives && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleGenerateAlternative(clause.id)}
                    className="mt-2"
                  >
                    Generate Alternative
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContractClausesTab;
