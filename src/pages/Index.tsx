
import { useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, Clock, Users, BarChart, TrendingUp, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const stats = [
    {
      name: "Active Contracts",
      value: "24",
      icon: FileText,
      trend: "+3 this month",
      trendType: "positive",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      name: "Risk Alerts",
      value: "7",
      icon: AlertTriangle,
      trend: "-2 from last week",
      trendType: "positive",
      color: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      name: "Pending Reviews",
      value: "12",
      icon: Clock,
      trend: "4 urgent",
      trendType: "negative",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      name: "Team Members",
      value: "34",
      icon: Users,
      trend: "+2 new members",
      trendType: "positive",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  useEffect(() => {
    // Animate cards on page load
    const timer = setTimeout(() => {
      document.querySelectorAll('.animate-on-load').forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-4');
        }, i * 100);
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your contracts today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={stat.name} 
                className="overflow-hidden shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out"
              >
                <div className={`h-1 ${
                  index === 0 ? "bg-blue-500" : 
                  index === 1 ? "bg-yellow-500" : 
                  index === 2 ? "bg-purple-500" : 
                  "bg-green-500"
                }`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                      <div className="flex items-baseline space-x-1">
                        <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                        <Badge variant="outline" className={`
                          ${stat.trendType === "positive" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}
                        `}>
                          {stat.trend}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.color}`}>
                      <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <Card className="lg:col-span-2 shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Contract Performance</CardTitle>
                <Badge variant="outline" className="text-blue-600 bg-blue-50">Last 30 days</Badge>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center px-8 py-12 space-y-4">
                    <BarChart className="h-12 w-12 text-blue-600 mx-auto" />
                    <h3 className="text-lg font-medium">Performance Analytics</h3>
                    <p className="text-gray-500 max-w-md">
                      Track the performance of your contracts with detailed analytics 
                      and visualization tools.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Compliance Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Overall</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Documentation</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2 [&>div]:bg-green-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Regulatory</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2 [&>div]:bg-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Contract #C-123 updated</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New contract approved</p>
                        <p className="text-xs text-gray-500">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card className="shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-blue-50">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">City Center Tower Project</h4>
                          <p className="text-sm text-gray-600">Last updated 2h ago</p>
                        </div>
                      </div>
                      <Badge variant={i === 1 ? "default" : i === 2 ? "outline" : "secondary"}>
                        {i === 1 ? "Active" : i === 2 ? "Draft" : "Review"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          i === 1 ? "bg-red-50" : 
                          i === 2 ? "bg-yellow-50" : 
                          "bg-green-50"
                        }`}>
                          <AlertTriangle className={`h-5 w-5 ${
                            i === 1 ? "text-red-600" : 
                            i === 2 ? "text-yellow-600" : 
                            "text-green-600"
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {i === 1 ? "High Risk Alert" : i === 2 ? "Medium Risk Alert" : "Low Risk Alert"}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {i === 1 ? "Urgent action required" : i === 2 ? "Review recommended" : "Monitoring only"}
                          </p>
                        </div>
                      </div>
                      <Badge className={`${
                        i === 1 ? "bg-red-100 text-red-800 hover:bg-red-200" : 
                        i === 2 ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" : 
                        "bg-green-100 text-green-800 hover:bg-green-200"
                      } border-none`}>
                        {i === 1 ? "High" : i === 2 ? "Medium" : "Low"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
