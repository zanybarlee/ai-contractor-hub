
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Document } from "@/lib/contractorAdmin";
import { format } from 'date-fns';

const DocumentUploadForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState<Partial<Document>>({
    title: "",
    type: "Contract",
    tags: [],
    contractId: "",
    status: "Draft",
    author: "Current User", // In a real app, this would come from auth context
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      
      // Auto-fill title with filename (without extension)
      const filename = e.target.files[0].name;
      const titleFromFilename = filename.substring(0, filename.lastIndexOf('.')) || filename;
      
      setFormData(prev => ({
        ...prev,
        title: prev.title || titleFromFilename,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    // In a real app, you would upload the file and create a document
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      // Reset form
      setSelectedFile(null);
      setFormData({
        title: "",
        type: "Contract",
        tags: [],
        contractId: "",
        status: "Draft",
        author: "Current User",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value;
      if (!formData.tags?.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...(prev.tags || []), newTag]
        }));
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="file">Document File</Label>
          <Input 
            id="file" 
            type="file" 
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
          />
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: PDF, Word, Text (max 10MB)
          </p>
        </div>

        <div>
          <Label htmlFor="title">Document Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Document Type</Label>
            <Select 
              onValueChange={(value) => handleSelectChange("type", value)}
              defaultValue={formData.type as string}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Amendment">Amendment</SelectItem>
                <SelectItem value="Notice">Notice</SelectItem>
                <SelectItem value="Claim">Claim</SelectItem>
                <SelectItem value="Letter">Letter</SelectItem>
                <SelectItem value="Correspondence">Correspondence</SelectItem>
                <SelectItem value="Instruction">Instruction</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="contractId">Related Contract ID (optional)</Label>
            <Input
              id="contractId"
              name="contractId"
              value={formData.contractId}
              onChange={handleChange}
              placeholder="e.g., c001"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tags">Tags (press Enter to add)</Label>
          <Input
            id="tags"
            placeholder="Add tags..."
            onKeyDown={handleTagInput}
          />
          {formData.tags && formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, i) => (
                <Badge 
                  key={i} 
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-300"
                  onClick={() => removeTag(tag)}
                >
                  {tag} ✕
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select 
            onValueChange={(value) => handleSelectChange("status", value)}
            defaultValue={formData.status as string}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload Document"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default DocumentUploadForm;
