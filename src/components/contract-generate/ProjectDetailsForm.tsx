
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectFormData {
  title: string;
  clientName: string;
  contractorName: string;
  value: string;
  currency: string;
  description: string;
}

interface ProjectDetailsFormProps {
  formData: ProjectFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const ProjectDetailsForm: React.FC<ProjectDetailsFormProps> = ({
  formData,
  onInputChange,
  onSelectChange,
}) => {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>
          Enter the basic information about your construction project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Contract Title</Label>
            <Input 
              id="title" 
              name="title"
              placeholder="e.g., Commercial Office Building Construction"
              value={formData.title}
              onChange={onInputChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input 
                id="clientName" 
                name="clientName"
                placeholder="Client/Owner Name"
                value={formData.clientName}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractorName">Contractor Name</Label>
              <Input 
                id="contractorName" 
                name="contractorName"
                placeholder="Contractor Company Name"
                value={formData.contractorName}
                onChange={onInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Contract Value</Label>
              <Input 
                id="value" 
                name="value"
                type="number"
                placeholder="e.g., 1000000"
                value={formData.value}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select 
                value={formData.currency} 
                onValueChange={(value) => onSelectChange("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea 
              id="description" 
              name="description"
              placeholder="Brief description of the project scope and objectives"
              rows={4}
              value={formData.description}
              onChange={onInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDetailsForm;
