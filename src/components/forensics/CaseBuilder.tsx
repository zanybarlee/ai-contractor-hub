
import { useState } from "react";
import { Briefcase, Users, Plus, FileText, Search, Image, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockCaseFiles } from "@/lib/forensicsData";

const CaseBuilder = () => {
  const [caseFiles, setCaseFiles] = useState(mockCaseFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCaseName, setNewCaseName] = useState("");
  const [newCaseDescription, setNewCaseDescription] = useState("");
  
  const filteredCases = caseFiles.filter(caseFile => 
    caseFile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseFile.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateCase = () => {
    if (!newCaseName.trim()) return;
    
    const newCase = {
      id: `case-${Date.now()}`,
      title: newCaseName,
      description: newCaseDescription,
      createdDate: new Date().toLocaleDateString(),
      status: "active",
      documentCount: 0,
      teamMembers: 1
    };
    
    setCaseFiles([newCase, ...caseFiles]);
    setIsDialogOpen(false);
    setNewCaseName("");
    setNewCaseDescription("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Case-Building Workspace</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Case
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Forensic Case</DialogTitle>
                <DialogDescription>
                  Enter the details for your new forensic case file.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="case-name" className="text-sm font-medium">Case Name</label>
                  <Input 
                    id="case-name" 
                    placeholder="Enter case name"
                    value={newCaseName}
                    onChange={(e) => setNewCaseName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="case-description" className="text-sm font-medium">Description</label>
                  <Textarea 
                    id="case-description" 
                    placeholder="Enter case description"
                    value={newCaseDescription}
                    onChange={(e) => setNewCaseDescription(e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateCase}>Create Case</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Create secure workspaces to organize relevant documents and build forensic claims.
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Case Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((caseFile) => (
          <Card key={caseFile.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-base">{caseFile.title}</CardTitle>
                </div>
                <Badge variant={caseFile.status === "active" ? "default" : "secondary"}>
                  {caseFile.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 line-clamp-2">{caseFile.description}</p>
              
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>{caseFile.documentCount} docs</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{caseFile.teamMembers} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{caseFile.createdDate}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-2">
              <Button variant="outline" size="sm" className="w-full">Open Case</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CaseBuilder;
