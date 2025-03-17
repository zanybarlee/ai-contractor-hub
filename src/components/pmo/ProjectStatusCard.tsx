
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Clock, 
  CalendarClock, 
  CircleDollarSign, 
  Users,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type RiskLevel = "low" | "medium" | "high";
type ProjectStatus = "on-track" | "at-risk" | "delayed" | "completed";

interface ProjectStatusCardProps {
  id: string;
}

export const ProjectStatusCard = ({ id }: ProjectStatusCardProps) => {
  // Mock data - in a real app this would come from API
  const getRandomData = () => {
    const statuses: ProjectStatus[] = ["on-track", "at-risk", "delayed", "completed"];
    const risks: RiskLevel[] = ["low", "medium", "high"];
    
    return {
      title: `Project ${id}`,
      client: "ABC Corporation",
      contractor: "XYZ Builders",
      status: statuses[Math.floor(Math.random() * statuses.length)],
      riskLevel: risks[Math.floor(Math.random() * risks.length)],
      value: `$${(Math.random() * 10000000).toFixed(0)}`,
      upcomingMilestones: Math.floor(Math.random() * 10),
      completionPercentage: Math.floor(Math.random() * 100),
      claimsCount: Math.floor(Math.random() * 5),
    };
  };
  
  const project = getRandomData();

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Low Risk</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Medium Risk</Badge>;
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">High Risk</Badge>;
    }
  };

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "on-track":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">On Track</Badge>;
      case "at-risk":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">At Risk</Badge>;
      case "delayed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Delayed</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Completed</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div 
        className={`h-2 ${
          project.riskLevel === "low" ? "bg-green-500" : 
          project.riskLevel === "medium" ? "bg-amber-500" : 
          "bg-red-500"
        }`} 
      />
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{project.title}</h3>
            <p className="text-sm text-gray-500">{project.client}</p>
          </div>
          <div className="flex flex-col gap-1 items-end">
            {getRiskBadge(project.riskLevel)}
            {getStatusBadge(project.status)}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{project.value}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{project.contractor}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{project.upcomingMilestones} milestones</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{project.claimsCount} claims</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{project.completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                project.status === "on-track" ? "bg-green-500" : 
                project.status === "at-risk" ? "bg-amber-500" : 
                project.status === "completed" ? "bg-blue-500" : 
                "bg-red-500"
              }`} 
              style={{ width: `${project.completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-gray-50 flex justify-end">
        <Link to={`/contracts/${id}`}>
          <Button variant="outline" size="sm" className="gap-1">
            Details
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
