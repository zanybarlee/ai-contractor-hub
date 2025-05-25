
import { CheckCircle, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CustomizeAndGenerateProps {
  isSOPContract: boolean;
}

const CustomizeAndGenerate: React.FC<CustomizeAndGenerateProps> = ({ isSOPContract }) => {
  return (
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
  );
};

export default CustomizeAndGenerate;
