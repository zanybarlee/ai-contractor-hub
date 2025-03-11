
import { useState } from "react";
import { Check, AlertTriangle, ShieldCheck, CalendarClock, Building, Gauge, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ComplianceRequirement {
  id: string;
  title: string;
  category: "building" | "safety" | "environmental" | "labor";
  status: "compliant" | "at-risk" | "non-compliant";
  dueDate: string;
  description: string;
  aiRecommendation?: string;
}

const ComplianceMonitoring = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const requirements: ComplianceRequirement[] = [
    {
      id: "cr1",
      title: "Building Code Update 2023-B4",
      category: "building",
      status: "at-risk",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      description: "New energy efficiency requirements for HVAC systems in commercial buildings",
      aiRecommendation: "Schedule inspection with licensed HVAC contractor to evaluate current systems against new requirements"
    },
    {
      id: "cr2",
      title: "Workplace Safety Regulation 29 CFR 1926",
      category: "safety",
      status: "compliant",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Fall protection standards for workers at heights above 6 feet",
    },
    {
      id: "cr3",
      title: "Environmental Impact Assessment",
      category: "environmental",
      status: "non-compliant",
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Required environmental assessment for projects near protected wetlands",
      aiRecommendation: "Urgent: Submit expedited assessment application and prepare mitigation plan to minimize penalties"
    },
    {
      id: "cr4",
      title: "Labor Wage Requirements",
      category: "labor",
      status: "compliant",
      dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Prevailing wage requirements for government-funded projects",
    },
  ];

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

  const complianceStats = {
    overall: 82,
    building: 75,
    safety: 95,
    environmental: 60,
    labor: 98,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>AI-powered real-time compliance tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Overall Compliance</span>
                  <span className="text-sm font-medium">{complianceStats.overall}%</span>
                </div>
                <Progress value={complianceStats.overall} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Building Codes</span>
                  <span className="text-sm font-medium">{complianceStats.building}%</span>
                </div>
                <Progress value={complianceStats.building} className="bg-blue-100" indicatorClassName="bg-blue-600" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Safety Regulations</span>
                  <span className="text-sm font-medium">{complianceStats.safety}%</span>
                </div>
                <Progress value={complianceStats.safety} className="bg-green-100" indicatorClassName="bg-green-600" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Environmental</span>
                  <span className="text-sm font-medium">{complianceStats.environmental}%</span>
                </div>
                <Progress value={complianceStats.environmental} className="bg-yellow-100" indicatorClassName="bg-yellow-600" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Labor Laws</span>
                  <span className="text-sm font-medium">{complianceStats.labor}%</span>
                </div>
                <Progress value={complianceStats.labor} className="bg-purple-100" indicatorClassName="bg-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Alerts</CardTitle>
            <CardDescription>AI-driven notifications of regulatory changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg border bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Building Code Update</h4>
                  <p className="text-sm text-gray-600">Local building code updates affecting 3 active contracts. New energy efficiency standards take effect in 14 days.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border bg-red-50 border-red-200">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Environmental Assessment Overdue</h4>
                  <p className="text-sm text-gray-600">Environmental impact assessment for the Riverside project is 5 days overdue. Potential penalties of up to $1,000/day.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border bg-blue-50 border-blue-200">
                <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">New Safety Training Required</h4>
                  <p className="text-sm text-gray-600">Updated safety regulations require all site personnel to complete new training module within 30 days.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
};

export default ComplianceMonitoring;
