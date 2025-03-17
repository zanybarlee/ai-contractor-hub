
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Document } from "@/lib/contractorAdmin";

export const useDocumentForm = () => {
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

  return {
    formData,
    isLoading,
    selectedFile,
    handleChange,
    handleSelectChange,
    handleFileChange,
    handleSubmit,
    handleTagInput,
    removeTag
  };
};
