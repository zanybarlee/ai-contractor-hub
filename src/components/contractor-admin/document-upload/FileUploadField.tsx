
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadFieldProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadField = ({ onFileChange }: FileUploadFieldProps) => {
  return (
    <div>
      <Label htmlFor="file">Document File</Label>
      <Input 
        id="file" 
        type="file" 
        onChange={onFileChange}
        accept=".pdf,.doc,.docx,.txt"
      />
      <p className="text-xs text-gray-500 mt-1">
        Supported formats: PDF, Word, Text (max 10MB)
      </p>
    </div>
  );
};

export default FileUploadField;
