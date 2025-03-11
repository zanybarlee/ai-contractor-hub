
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContractDisputeResolutionTab from "@/components/contract/tabs/ContractDisputeResolutionTab";
import ContractDocumentComparison from "@/components/ai/ContractDocumentComparison";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DisputeResolution = () => {
  const [activeTab, setActiveTab] = useState("analysis");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">AI-Powered Dispute Resolution</h1>
          
          <Tabs defaultValue="analysis" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="analysis">Dispute Analysis</TabsTrigger>
              <TabsTrigger value="document-comparison">Document Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analysis">
              <Card>
                <CardHeader>
                  <CardTitle>Contract Dispute Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Our AI-powered dispute resolution system analyzes contracts, identifies relevant clauses, 
                    finds legal precedents, and suggests optimal resolution strategies to minimize risks and costs.
                  </p>
                  
                  <ContractDisputeResolutionTab />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="document-comparison">
              <ContractDocumentComparison />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DisputeResolution;
