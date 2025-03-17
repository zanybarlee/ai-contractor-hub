
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const scheduleData = [
  { name: 'Week 1', baseline: 10, actual: 8 },
  { name: 'Week 2', baseline: 20, actual: 15 },
  { name: 'Week 3', baseline: 30, actual: 28 },
  { name: 'Week 4', baseline: 45, actual: 40 },
  { name: 'Week 5', baseline: 60, actual: 52 },
  { name: 'Week 6', baseline: 75, actual: 65 },
];

const SchedulingIntelligence: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Planning & Scheduling Intelligence</CardTitle>
          <CardDescription>
            Compare baseline schedules vs. actual progress to identify deviations and potential issues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="progress">
            <TabsList className="mb-4">
              <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
              <TabsTrigger value="schedule">Schedule Analysis</TabsTrigger>
              <TabsTrigger value="import">Import Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="progress" className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Schedule Progress vs. Baseline</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={scheduleData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="baseline" fill="#8884d8" name="Baseline Progress" />
                    <Bar dataKey="actual" fill="#82ca9d" name="Actual Progress" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Deviation Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 mb-2">Current deviation: <span className="text-amber-500 font-medium">-13.3%</span></p>
                    <p className="text-sm">The project is currently behind schedule by approximately 13.3%. Main delays observed in foundation work and electrical installations.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">AI Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Consider increasing workforce allocation by 15% for the next 2 weeks to catch up with baseline schedule.</p>
                    <p className="text-sm mt-2">Review material delivery schedule for potential bottlenecks.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
                <p className="text-gray-600">Schedule analysis tools will appear here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="import">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-6">
                <p className="text-gray-600 mb-4">Import schedule data from project management software</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="px-4 py-3 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
                    <span>Import from Microsoft Project</span>
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
                    <span>Import from Primavera P6</span>
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export { SchedulingIntelligence };
