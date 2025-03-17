
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Milestone {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  completedDate?: string;
  status: "completed" | "in-progress" | "at-risk" | "overdue";
  description: string;
  completion: number;
  dependencies: string[];
}

export const MilestoneTracker = () => {
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("timeline");

  // Mock milestone data
  const milestones: Milestone[] = [
    {
      id: "ms1",
      title: "Site Mobilization",
      project: "Project A",
      dueDate: "2023-08-15",
      completedDate: "2023-08-12",
      status: "completed",
      description: "Complete site preparation and mobilize construction team",
      completion: 100,
      dependencies: []
    },
    {
      id: "ms2",
      title: "Foundation Work",
      project: "Project A",
      dueDate: "2023-09-30",
      status: "in-progress",
      description: "Complete all foundation work including piling and concrete pouring",
      completion: 65,
      dependencies: ["ms1"]
    },
    {
      id: "ms3",
      title: "Environmental Assessment",
      project: "Project B",
      dueDate: "2023-08-20",
      status: "at-risk",
      description: "Complete environmental impact assessment and submit to regulatory body",
      completion: 50,
      dependencies: []
    },
    {
      id: "ms4",
      title: "Design Approval",
      project: "Project C",
      dueDate: "2023-07-30",
      status: "overdue",
      description: "Client approval of final design documents",
      completion: 85,
      dependencies: []
    },
    {
      id: "ms5",
      title: "Steel Structure Installation",
      project: "Project B",
      dueDate: "2023-10-15",
      status: "in-progress",
      description: "Erection of main steel framework",
      completion: 30,
      dependencies: []
    },
    {
      id: "ms6",
      title: "Electrical System Design",
      project: "Project D",
      dueDate: "2023-09-10",
      completedDate: "2023-09-08",
      status: "completed",
      description: "Complete electrical system design and documentation",
      completion: 100,
      dependencies: []
    },
  ];

  // Filter milestones by selected project
  const filteredMilestones = selectedProject === "all" 
    ? milestones 
    : milestones.filter(m => m.project === selectedProject);

  // Get all unique projects
  const projects = Array.from(new Set(milestones.map(m => m.project)));

  // Get status badge
  const getStatusBadge = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>;
      case "at-risk":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">At Risk</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Overdue</Badge>;
    }
  };

  // Get status icon
  const getStatusIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "at-risk":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  // Milestone counts
  const milestoneCounts = {
    total: filteredMilestones.length,
    completed: filteredMilestones.filter(m => m.status === "completed").length,
    inProgress: filteredMilestones.filter(m => m.status === "in-progress").length,
    atRisk: filteredMilestones.filter(m => m.status === "at-risk").length,
    overdue: filteredMilestones.filter(m => m.status === "overdue").length
  };

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Milestone Tracker</h2>
          <p className="text-gray-500 text-sm">Track project milestones across all contracts</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map(project => (
                <SelectItem key={project} value={project}>{project}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Milestone status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="py-4 flex flex-col items-center justify-center">
            <span className="text-gray-500 text-sm">Total</span>
            <span className="text-2xl font-bold">{milestoneCounts.total}</span>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-500">
          <CardContent className="py-4 flex flex-col items-center justify-center">
            <span className="text-gray-500 text-sm">Completed</span>
            <span className="text-2xl font-bold">{milestoneCounts.completed}</span>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-blue-500">
          <CardContent className="py-4 flex flex-col items-center justify-center">
            <span className="text-gray-500 text-sm">In Progress</span>
            <span className="text-2xl font-bold">{milestoneCounts.inProgress}</span>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-amber-500">
          <CardContent className="py-4 flex flex-col items-center justify-center">
            <span className="text-gray-500 text-sm">At Risk</span>
            <span className="text-2xl font-bold">{milestoneCounts.atRisk}</span>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-red-500">
          <CardContent className="py-4 flex flex-col items-center justify-center">
            <span className="text-gray-500 text-sm">Overdue</span>
            <span className="text-2xl font-bold">{milestoneCounts.overdue}</span>
          </CardContent>
        </Card>
      </div>

      {/* View options */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <div className="relative pl-6 border-l-2 border-gray-200 space-y-6">
            {filteredMilestones.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map((milestone, index) => (
              <div key={milestone.id} className="relative">
                <div className="absolute -left-[29px] bg-white p-1 rounded-full">
                  {getStatusIcon(milestone.status)}
                </div>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusBadge(milestone.status)}
                          <Badge variant="outline" className="bg-gray-50">{milestone.project}</Badge>
                        </div>
                        <h3 className="font-semibold">{milestone.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                        
                        <div className="flex gap-x-4 mt-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> Due: {milestone.dueDate}
                          </span>
                          {milestone.completedDate && (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" /> Completed: {milestone.completedDate}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3 md:mt-0 md:ml-6 min-w-[120px]">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{milestone.completion}%</span>
                        </div>
                        <Progress value={milestone.completion} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="space-y-2">
            {filteredMilestones.map((milestone) => (
              <Card key={milestone.id} className="overflow-hidden">
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div>{getStatusIcon(milestone.status)}</div>
                    <div>
                      <div className="flex gap-2 mb-1">
                        {getStatusBadge(milestone.status)}
                        <Badge variant="outline" className="bg-gray-50">{milestone.project}</Badge>
                      </div>
                      <h3 className="font-medium">{milestone.title}</h3>
                      <p className="text-sm text-gray-500">Due: {milestone.dueDate}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
