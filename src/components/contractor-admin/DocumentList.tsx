
import { useState } from "react";
import { Document } from "@/lib/contractorAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import DocumentUploadForm from "./DocumentUploadForm";

interface DocumentListProps {
  documents: Document[];
  onSelectDocument: (document: Document) => void;
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Draft': return "bg-gray-100 text-gray-800";
    case 'Submitted': return "bg-blue-100 text-blue-800";
    case 'Approved': return "bg-green-100 text-green-800";
    case 'Rejected': return "bg-red-100 text-red-800";
    case 'Pending': return "bg-yellow-100 text-yellow-800";
    case 'Expired': return "bg-purple-100 text-purple-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const DocumentList = ({ documents, onSelectDocument }: DocumentListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === "") {
      setFilteredDocuments(documents);
    } else {
      const filtered = documents.filter(
        doc => 
          doc.title.toLowerCase().includes(term) ||
          doc.type.toLowerCase().includes(term) ||
          doc.tags.some(tag => tag.toLowerCase().includes(term))
      );
      setFilteredDocuments(filtered);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Documents</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <DocumentUploadForm />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search documents by title, type, or tags..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <Card 
              key={doc.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectDocument(doc)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-semibold">{doc.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{doc.type}</Badge>
                      {doc.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary">{tag}</Badge>
                      ))}
                      {doc.tags.length > 3 && (
                        <Badge variant="secondary">+{doc.tags.length - 3}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 md:text-right">
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(doc.dateModified).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {doc.summary && (
                  <p className="text-sm text-gray-600 mt-3 line-clamp-2">{doc.summary}</p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No documents found matching your search criteria.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DocumentList;
