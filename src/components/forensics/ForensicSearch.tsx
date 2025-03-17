
import { useState } from "react";
import { Search, Filter, Tag, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { mockSearchResults } from "@/lib/forensicsData";

const ForensicSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simulating API call with setTimeout
    setTimeout(() => {
      setSearchResults(mockSearchResults
        .filter(item => 
          (documentType ? item.type === documentType : true) &&
          (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Advanced Semantic & Metadata Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Search across thousands of documents using natural language or specific metadata parameters.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search by keywords, clause references, or site instructions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>
            
            <div>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="correspondence">Correspondence</SelectItem>
                  <SelectItem value="siteInstruction">Site Instructions</SelectItem>
                  <SelectItem value="contractClause">Contract Clauses</SelectItem>
                  <SelectItem value="drawing">Drawings</SelectItem>
                  <SelectItem value="minutes">Meeting Minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" /> Advanced Filters
            </Button>
            <Button variant="outline" className="gap-1">
              <Tag className="h-4 w-4" /> Custom Tags
            </Button>
            <Button variant="outline" className="gap-1">
              <Calendar className="h-4 w-4" /> Date Range
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Search Results ({searchResults.length})</h3>
          
          {searchResults.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-3 items-start">
                  <div className="bg-blue-50 p-2 rounded">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-blue-600">{result.title}</h4>
                      <span className="text-sm text-gray-500">{result.date}</span>
                    </div>
                    
                    <p className="text-sm mt-1">
                      {result.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{result.type}</Badge>
                      {result.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForensicSearch;
