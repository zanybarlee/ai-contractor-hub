
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForensicSearch from "@/components/forensics/ForensicSearch";
import TimelineGenerator from "@/components/forensics/TimelineGenerator";
import CauseEffectAnalysis from "@/components/forensics/CauseEffectAnalysis";
import CaseBuilder from "@/components/forensics/CaseBuilder";

const Forensics = () => {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Forensics Module</h1>
          <p className="text-gray-500 mb-6">Advanced document analysis for claims, disputes, and investigations</p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="search">Advanced Search</TabsTrigger>
              <TabsTrigger value="timeline">Timeline Generator</TabsTrigger>
              <TabsTrigger value="cause-effect">Cause-Effect Analysis</TabsTrigger>
              <TabsTrigger value="case-builder">Case Builder</TabsTrigger>
            </TabsList>

            <TabsContent value="search">
              <ForensicSearch />
            </TabsContent>

            <TabsContent value="timeline">
              <TimelineGenerator />
            </TabsContent>

            <TabsContent value="cause-effect">
              <CauseEffectAnalysis />
            </TabsContent>

            <TabsContent value="case-builder">
              <CaseBuilder />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Forensics;
