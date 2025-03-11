
import { useState } from "react";
import { Building, ShieldCheck, Gauge, Check, AlertTriangle, CalendarClock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplianceRequirement } from "@/types/compliance";

interface ComplianceRequirementsProps {
  requirements: ComplianceRequirement[];
}

const ComplianceRequirements = ({ requirements }: ComplianceRequirementsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredRequirements = selectedCategory === "all" 
    ? requirements 
    : requirements.filter(req => req.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-green-100 text-green-800";
      case "at-risk": return "bg-yellow-100 text-yellow-800";
      case "non-compliant": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "building": return <Building className="h-4 w-4" />;
      case "safety": return <ShieldCheck className="h-4 w-4" />;
      case "environmental": return <Gauge className="h-4 w-4" />;
      case "labor": return <Check className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Compliance Requirements</CardTitle>
        <CardDescription>Track regulatory requirements and their status</CardDescription>
        <TabsList className="mt-2">
          <TabsTrigger 
            value="all" 
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-primary text-primary-foreground" : ""}
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="building" 
            onClick={() => setSelectedCategory("building")}
            className={selectedCategory === "building" ? "bg-primary text-primary-foreground" : ""}
          >
            Building Codes
          </TabsTrigger>
          <TabsTrigger 
            value="safety" 
            onClick={() => setSelectedCategory("safety")}
            className={selectedCategory === "safety" ? "bg-primary text-primary-foreground" : ""}
          >
            Safety
          </TabsTrigger>
          <TabsTrigger 
            value="environmental" 
            onClick={() => setSelectedCategory("environmental")}
            className={selectedCategory === "environmental" ? "bg-primary text-primary-foreground" : ""}
          >
            Environmental
          </TabsTrigger>
          <TabsTrigger 
            value="labor" 
            onClick={() => setSelectedCategory("labor")}
            className={selectedCategory === "labor" ? "bg-primary text-primary-foreground" : ""}
          >
            Labor
          </TabsTrigger>
        </TabsList>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredRequirements.map((req) => (
            <div key={req.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border">
              <div className="flex items-start gap-3 flex-1">
                {getCategoryIcon(req.category)}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{req.title}</h4>
                    <Badge className={getStatusColor(req.status)}>
                      {req.status === "compliant" ? "Compliant" : req.status === "at-risk" ? "At Risk" : "Non-Compliant"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{req.description}</p>
                  {req.aiRecommendation && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded text-sm">
                      <strong>AI Recommendation:</strong> {req.aiRecommendation}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4 mt-2 md:mt-0">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <CalendarClock className="h-4 w-4" />
                  <span>Due: {new Date(req.dueDate).toLocaleDateString()}</span>
                </div>
                <Button variant="outline" size="sm">Action Required</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceRequirements;
