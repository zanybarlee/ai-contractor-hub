
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  Gavel,
  Ban,
  BarChart2
} from "lucide-react";
import { ProjectStatusCard } from "./ProjectStatusCard";
import { ProjectsTable } from "./ProjectsTable";

export const ProjectDashboard = () => {
  const [view, setView] = useState<'card' | 'table'>('card');
  const [searchTerm, setSearchTerm] = useState("");

  // Mock summary data
  const summaryData = {
    totalProjects: 24,
    activeProjects: 18,
    highRiskProjects: 5,
    upcomingDeadlines: 12,
    pendingClaims: 7
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Projects</p>
                <h3 className="text-2xl font-bold">{summaryData.totalProjects}</h3>
              </div>
              <div className="bg-blue-50 p-2 rounded-full">
                <FileText size={20} className="text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Projects</p>
                <h3 className="text-2xl font-bold">{summaryData.activeProjects}</h3>
              </div>
              <div className="bg-green-50 p-2 rounded-full">
                <BarChart2 size={20} className="text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">High Risk</p>
                <h3 className="text-2xl font-bold">{summaryData.highRiskProjects}</h3>
              </div>
              <div className="bg-red-50 p-2 rounded-full">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Deadlines</p>
                <h3 className="text-2xl font-bold">{summaryData.upcomingDeadlines}</h3>
              </div>
              <div className="bg-amber-50 p-2 rounded-full">
                <Clock size={20} className="text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Claims</p>
                <h3 className="text-2xl font-bold">{summaryData.pendingClaims}</h3>
              </div>
              <div className="bg-purple-50 p-2 rounded-full">
                <Gavel size={20} className="text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search projects by name, client, or contractor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 whitespace-nowrap">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <div className="flex gap-1 border rounded-md">
            <Button 
              variant={view === 'card' ? 'secondary' : 'ghost'} 
              size="sm"
              className="rounded-r-none"
              onClick={() => setView('card')}
            >
              Card
            </Button>
            <Button 
              variant={view === 'table' ? 'secondary' : 'ghost'} 
              size="sm"
              className="rounded-l-none"
              onClick={() => setView('table')}
            >
              Table
            </Button>
          </div>
        </div>
      </div>

      {/* Projects grid/table */}
      <div>
        {view === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectStatusCard key={i} id={`P${i+1000}`} />
            ))}
          </div>
        ) : (
          <ProjectsTable />
        )}
      </div>
    </div>
  );
};
