
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from '@/components/Sidebar';
import DocumentList from '@/components/contractor-admin/DocumentList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import DocumentUploadForm from '@/components/contractor-admin/DocumentUploadForm';
import { Plus } from 'lucide-react';

const ContractorAdministrator = () => {
  const { toast } = useToast();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-6">
          <h1 className="text-2xl font-bold text-gray-800">Contractor Administrator</h1>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Document Management</h2>
              <p className="text-gray-600 mt-1">
                Manage contract documents, correspondences, and notices
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload New Document</DialogTitle>
                </DialogHeader>
                <DocumentUploadForm />
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="drafts">Draft Correspondence</TabsTrigger>
              <TabsTrigger value="notices">Notices</TabsTrigger>
              <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Contract Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentList />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="drafts" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Draft Correspondence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">View and manage draft correspondence documents.</p>
                  {/* Draft correspondence component would go here */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notices" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Contract Notices</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">View and manage contract notices and alerts.</p>
                  {/* Notices component would go here */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deadlines" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Track important contract deadlines and milestones.</p>
                  {/* Deadlines component would go here */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ContractorAdministrator;
