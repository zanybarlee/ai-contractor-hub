
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Link as LinkIcon, FilePlus2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DocumentLibrary } from "../pmo/DocumentLibrary";

interface Document {
  id: string;
  name: string;
  category: "design" | "submittal" | "drawing";
  version: string;
  status: "approved" | "pending" | "rejected" | "superseded";
  linkedDocs: string[];
  lastModified: string;
}

export const DesignBuildDocFlow = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  const documents: Document[] = [
    {
      id: "doc1",
      name: "Foundation Design Specification v2.1",
      category: "design",
      version: "2.1",
      status: "approved",
      linkedDocs: ["doc4", "doc6"],
      lastModified: "2023-07-15",
    },
    {
      id: "doc2",
      name: "Electrical System Layout",
      category: "design",
      version: "1.3",
      status: "pending",
      linkedDocs: ["doc5"],
      lastModified: "2023-08-01",
    },
    {
      id: "doc3",
      name: "MEP Services Submittal",
      category: "submittal",
      version: "1.0",
      status: "rejected",
      linkedDocs: [],
      lastModified: "2023-07-28",
    },
    {
      id: "doc4",
      name: "Foundation Construction Drawing",
      category: "drawing",
      version: "1.2",
      status: "approved",
      linkedDocs: ["doc1"],
      lastModified: "2023-08-05",
    },
    {
      id: "doc5",
      name: "Electrical Systems Contractor Submittal",
      category: "submittal",
      version: "2.0",
      status: "approved",
      linkedDocs: ["doc2"],
      lastModified: "2023-07-30",
    },
    {
      id: "doc6",
      name: "Structural Column As-Built Drawing",
      category: "drawing",
      version: "1.0",
      status: "pending",
      linkedDocs: ["doc1"],
      lastModified: "2023-08-10",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "superseded": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Design-Build Document Flow</CardTitle>
          <CardDescription>
            Automatic linking between design documents, contractor submittals, and final drawings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Input 
                type="text" 
                placeholder="Search documents..." 
                className="pl-10" 
              />
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button className="gap-2">
              <FilePlus2 className="h-4 w-4" />
              Upload Document
            </Button>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="design">Design Documents</TabsTrigger>
              <TabsTrigger value="submittal">Submittals</TabsTrigger>
              <TabsTrigger value="drawing">Drawings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {documents.map(doc => (
                <Card key={doc.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedDocument(doc)}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{doc.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline">{doc.category}</Badge>
                            <Badge variant="outline">v{doc.version}</Badge>
                            <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                            {doc.linkedDocs.length > 0 && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <LinkIcon className="h-3 w-3" /> 
                                {doc.linkedDocs.length} linked
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Last modified: {doc.lastModified}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="design" className="space-y-4">
              {documents.filter(doc => doc.category === "design").map(doc => (
                <Card key={doc.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedDocument(doc)}>
                  <CardContent className="p-4">
                    {/* ... similar content as above */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{doc.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline">{doc.category}</Badge>
                            <Badge variant="outline">v{doc.version}</Badge>
                            <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                            {doc.linkedDocs.length > 0 && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <LinkIcon className="h-3 w-3" /> 
                                {doc.linkedDocs.length} linked
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Last modified: {doc.lastModified}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            {/* Similar content for other tabs */}
            <TabsContent value="submittal" className="space-y-4">
              {documents.filter(doc => doc.category === "submittal").map(doc => (
                <Card key={doc.id} className="cursor-pointer hover:bg-gray-50">
                  {/* Content similar to above */}
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{doc.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline">{doc.category}</Badge>
                            <Badge variant="outline">v{doc.version}</Badge>
                            <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                            {doc.linkedDocs.length > 0 && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <LinkIcon className="h-3 w-3" /> 
                                {doc.linkedDocs.length} linked
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Last modified: {doc.lastModified}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="drawing" className="space-y-4">
              {documents.filter(doc => doc.category === "drawing").map(doc => (
                <Card key={doc.id} className="cursor-pointer hover:bg-gray-50">
                  {/* Content similar to above */}
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{doc.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline">{doc.category}</Badge>
                            <Badge variant="outline">v{doc.version}</Badge>
                            <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                            {doc.linkedDocs.length > 0 && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <LinkIcon className="h-3 w-3" /> 
                                {doc.linkedDocs.length} linked
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Last modified: {doc.lastModified}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
