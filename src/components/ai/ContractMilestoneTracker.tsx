
import { CalendarClock, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getContractMilestones, type MilestoneAlert } from "@/lib/aiAgents";
import { useToast } from "@/components/ui/use-toast";

interface ContractMilestoneTrackerProps {
  contractId: string;
}

const ContractMilestoneTracker = ({ contractId }: ContractMilestoneTrackerProps) => {
  const { toast } = useToast();
  const milestones = getContractMilestones(contractId);

  const getStatusIcon = (status: MilestoneAlert["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "upcoming":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: MilestoneAlert["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
    }
  };

  const getPriorityColor = (priority: MilestoneAlert["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleMarkComplete = (milestoneId: string) => {
    toast({
      title: "Milestone Updated",
      description: "The milestone has been marked as completed.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarClock className="h-5 w-5" />
          Contract Milestones & Obligations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  {getStatusIcon(milestone.status)}
                  <div>
                    <h3 className="font-medium">{milestone.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                      </Badge>
                      <Badge className={getPriorityColor(milestone.priority)}>
                        {milestone.priority.charAt(0).toUpperCase() + milestone.priority.slice(1)} Priority
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Due: {formatDate(milestone.dueDate)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                {milestone.status !== "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkComplete(milestone.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractMilestoneTracker;
