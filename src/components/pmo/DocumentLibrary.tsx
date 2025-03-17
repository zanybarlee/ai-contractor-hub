
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Eye, File, FilePlus2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Document {
  id: string;
  name: string;
  type: string;
  project: string;
  lastModified: string;
  tags: string[];
}

export const DocumentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");

  // Mock data for documents
  const documents: Document[] = [
    {
      id: "doc1",
      name: "Master Services Agreement - Project A",
      type: "Contract",
      project: "Project A",
      lastModified: "2023-06-15",
      tags: ["MSA", "Legal", "Approved"]
    },
    {
      id: "doc2",
      name: "Change Order #3 - Project B",
      type: "Change Order",
      project: "Project B",
      lastModified: "2023-07-22",
      tags: ["Change Order", "Pending"]
    },
    {
      id: "doc3",
      name: "Site Assessment Report - Project C",
      type: "Report",
      project: "Project C",
      lastModified: "2023-08-01",
      tags: ["Technical", "Environmental"]
    },
    {
      id: "doc4",
      name: "Payment Certificate #5 - Project D",
      type: "Financial",
      project: "Project D",
      lastModified: "2023-08-10",
      tags: ["Payment", "Approved"]
    },
    {
      id: "doc5",
      name: "Risk Assessment Matrix - Project B",
      type: "Risk",
      project: "Project B",
      lastModified: "2023-07-30",
      tags: ["Risk", "High Priority"]
    },
  ];

  // Filter documents based on search term and type
  const filteredDocuments = documents.filter(doc => 
    (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doc.project.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedType === "" || doc.type === selectedType)
  );

  // Get unique document types for filter
  const documentTypes = Array.from(new Set(documents.map(doc => doc.type)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold">Document Library</h2>
        <Button className="gap-2">
          <FilePlus2 className="h-4 w-4" />
          Upload Document
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search documents by name or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-[200px]">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              {documentTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredDocuments.map(doc => (
          <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2 rounded">
                    <File className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{doc.type}</Badge>
                      <Badge variant="secondary">Project: {doc.project}</Badge>
                      {doc.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-gray-100">{tag}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Last modified: {doc.lastModified}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 md:mt-0">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
