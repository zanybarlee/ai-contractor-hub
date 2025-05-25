
import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContractAIChatbot from "@/components/ai/ContractAIChatbot";
import ContractMilestoneTracker from "@/components/ai/ContractMilestoneTracker";
import ContractDocumentComparison from "@/components/ai/ContractDocumentComparison";

const ContractIntelligence = () => {
  const [activeTab, setActiveTab] = useState("chatbot");

  useEffect(() => {
    if (activeTab === "ai-fullpage-chatbot") {
      // Clear any existing chatbot
      const existingChatbot = document.querySelector('flowise-fullchatbot');
      if (existingChatbot) {
        existingChatbot.innerHTML = '';
      }

      // Create and inject the script
      const script = document.createElement('script');
      script.type = 'module';
      script.innerHTML = `
        import Chatbot from "https://www.cens.com.sg/akira/dist/web.js"
        Chatbot.initFull({
          chatflowid: "b9fd309f-1f06-4c8f-a9f0-9d34f9fd3040",
          apiHost: "http://127.0.0.1:3001",
        })
      `;
      
      document.head.appendChild(script);

      // Cleanup function
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Contract Intelligence</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
              <TabsTrigger value="milestones">Milestone Tracking</TabsTrigger>
              <TabsTrigger value="document-comparison">Document Analysis</TabsTrigger>
              <TabsTrigger value="ai-fullpage-chatbot">AI FullPage Chatbot</TabsTrigger>
            </TabsList>

            <TabsContent value="chatbot">
              <div className="h-[600px]">
                <ContractAIChatbot initialMessage="Hello! I'm your Contract Intelligence Assistant. I can help you analyze contracts, track milestones, and provide legal insights. What would you like to know?" />
              </div>
            </TabsContent>

            <TabsContent value="milestones">
              <ContractMilestoneTracker contractId="c001" />
            </TabsContent>

            <TabsContent value="document-comparison">
              <ContractDocumentComparison />
            </TabsContent>

            <TabsContent value="ai-fullpage-chatbot">
              <div className="h-[600px] w-full">
                <flowise-fullchatbot></flowise-fullchatbot>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ContractIntelligence;
