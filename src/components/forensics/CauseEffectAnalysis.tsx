
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { ArrowRight, FileText, Search, Brain } from "lucide-react";
import { mockCauseEffectResults } from "@/lib/forensicsData";

const CauseEffectAnalysis = () => {
  const [scenarioDescription, setScenarioDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [analysisResults, setAnalysisResults] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleAnalyze = () => {
    if (!scenarioDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysisResults(mockCauseEffectResults);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cause-Effect Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Map causes of disputes to resulting events using generative AI and contract context.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <Textarea
                placeholder="Describe the scenario or issue you want to analyze..."
                className="h-32"
                value={scenarioDescription}
                onChange={(e) => setScenarioDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-4">
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delay">Delay Event</SelectItem>
                  <SelectItem value="design">Design Change</SelectItem>
                  <SelectItem value="compliance">Compliance Issue</SelectItem>
                  <SelectItem value="payment">Payment Dispute</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                className="w-full gap-2"
                onClick={handleAnalyze} 
                disabled={!scenarioDescription.trim() || isAnalyzing}
              >
                <Brain className="h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Analysis Results */}
      {analysisResults && (
        <div className="space-y-6">
          {/* Cause-Effect Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cause-Effect Relationship</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Causes Section */}
                <div>
                  <h4 className="text-base font-medium mb-2">Root Causes</h4>
                  <div className="space-y-2">
                    {analysisResults.causes.map((cause: any, index: number) => (
                      <div key={index} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <div className="flex gap-2 items-start">
                          <div className="bg-amber-100 p-1 rounded">
                            <Search className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium text-amber-800">{cause.title}</p>
                            <p className="text-sm text-amber-700 mt-1">{cause.description}</p>
                            {cause.documentRef && (
                              <div className="mt-1 text-xs text-amber-600 flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                Reference: {cause.documentRef}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="p-2 border rounded-full">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Effects Section */}
                <div>
                  <h4 className="text-base font-medium mb-2">Resulting Effects</h4>
                  <div className="space-y-2">
                    {analysisResults.effects.map((effect: any, index: number) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex gap-2 items-start">
                          <div className="bg-blue-100 p-1 rounded">
                            <Search className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">{effect.title}</p>
                            <p className="text-sm text-blue-700 mt-1">{effect.description}</p>
                            {effect.impact && (
                              <div className="mt-1 text-xs flex items-center gap-1">
                                <span className={`px-1.5 py-0.5 rounded text-white ${
                                  effect.impact === 'High' ? 'bg-red-500' :
                                  effect.impact === 'Medium' ? 'bg-amber-500' :
                                  'bg-green-500'
                                }`}>
                                  {effect.impact} Impact
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Contract Context */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Relevant Contract Clauses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResults.contractClauses.map((clause: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium">{clause.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{clause.text}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      {clause.reference}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CauseEffectAnalysis;
