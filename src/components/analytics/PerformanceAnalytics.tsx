
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";

// Mock data for performance analytics
const monthlyData = [
  { month: "Jan", revenue: 28000, expenses: 22000, contracts: 5 },
  { month: "Feb", revenue: 32000, expenses: 24000, contracts: 7 },
  { month: "Mar", revenue: 30000, expenses: 23000, contracts: 6 },
  { month: "Apr", revenue: 35000, expenses: 25000, contracts: 8 },
  { month: "May", revenue: 38000, expenses: 26000, contracts: 10 },
  { month: "Jun", revenue: 42000, expenses: 28000, contracts: 12 },
  { month: "Jul", revenue: 48000, expenses: 30000, contracts: 13 },
  { month: "Aug", revenue: 52000, expenses: 32000, contracts: 15 },
];

const contractTypeData = [
  { name: "Construction", value: 35 },
  { name: "Software", value: 25 },
  { name: "Consulting", value: 20 },
  { name: "Maintenance", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PerformanceAnalytics = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  
  return (
    <Card className="shadow-sm border-none animate-on-load opacity-0 translate-y-4 transition-all duration-300 ease-out">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Performance Analytics</CardTitle>
        <Tabs defaultValue="monthly" onValueChange={setTimeframe} className="w-[250px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">Revenue & Expenses</h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => `$${value.toLocaleString()}`}
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #eee" }}
                  />
                  <Bar dataKey="revenue" fill="#2563eb" name="Revenue" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#64748b" name="Expenses" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">Contracts by Type</h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contractTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {contractTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-2 lg:col-span-2">
            <h4 className="text-sm font-medium text-gray-500">Contract Growth</h4>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="contracts" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { title: "Average Contract Value", value: "$45,250", change: "+12%", positive: true },
            { title: "Contract Completion Rate", value: "87%", change: "+5%", positive: true },
            { title: "Dispute Rate", value: "3.2%", change: "-1.5%", positive: true }
          ].map((stat, i) => (
            <Card key={i} className="border border-gray-100">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xl font-bold mr-2">{stat.value}</span>
                  <Badge variant="outline" className={`${stat.positive ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}>
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceAnalytics;
