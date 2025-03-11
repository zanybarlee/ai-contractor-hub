
import { useState } from "react";
import { MessageSquare, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ContractNegotiationTab = () => {
  const [negotiationComments, setNegotiationComments] = useState("");
  const { toast } = useToast();

  const handleNegotiationSend = () => {
    if (negotiationComments.trim() === "") return;
    
    toast({
      title: "Negotiation Comment Sent",
      description: "Your comment has been shared with the project team.",
    });
    setNegotiationComments("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Negotiation Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">AI Negotiation Assistant</p>
                <p className="text-sm text-blue-700 mt-1">
                  Based on the contract analysis, these are the key negotiation points:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-blue-700">
                  <li>The liquidated damages clause ($5,000/day) is above industry standard for this project size</li>
                  <li>Payment terms (30 days) could be negotiated to 14 days to improve cash flow</li>
                  <li>Consider adding a cap on total liquidated damages (typically 5-10% of contract value)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-900">Counter Proposal Detection</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Client proposed changes to Clause 2 (Liquidated Damages) could increase your financial exposure by approximately 3% of the contract value.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Negotiation Comments</h3>
            <Textarea
              placeholder="Add your negotiation notes or questions here..."
              className="min-h-[120px]"
              value={negotiationComments}
              onChange={(e) => setNegotiationComments(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button onClick={handleNegotiationSend}>
                Send Comment
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractNegotiationTab;
