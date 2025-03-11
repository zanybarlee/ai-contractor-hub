
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { FileText, AlertTriangle, Clock, Users } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      name: "Active Contracts",
      value: "24",
      icon: FileText,
      trend: "+3 this month",
    },
    {
      name: "Risk Alerts",
      value: "7",
      icon: AlertTriangle,
      trend: "-2 from last week",
    },
    {
      name: "Pending Reviews",
      value: "12",
      icon: Clock,
      trend: "4 urgent",
    },
    {
      name: "Team Members",
      value: "34",
      icon: Users,
      trend: "+2 new members",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
            <p className="text-gray-600 mt-1">Here's what's happening today</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.name} className="p-6 animate-fade-in">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-50">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <h3 className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</h3>
                    <p className="text-sm text-gray-500 mt-1">{stat.trend}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Contracts</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Contract #{i}</h4>
                      <p className="text-sm text-gray-600">Last updated 2h ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Risk Assessment</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h4 className="font-medium">Risk Alert #{i}</h4>
                      <p className="text-sm text-gray-600">Medium priority</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
