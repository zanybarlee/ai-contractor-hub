
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useDocumentForm } from "./useDocumentForm";
import FileUploadField from "./FileUploadField";
import DocumentMetadataFields from "./DocumentMetadataFields";
import TagsField from "./TagsField";

const DocumentUploadForm = () => {
  const {
    formData,
    isLoading,
    handleChange,
    handleSelectChange,
    handleFileChange,
    handleSubmit,
    handleTagInput,
    removeTag
  } = useDocumentForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <FileUploadField onFileChange={handleFileChange} />

        <DocumentMetadataFields
          title={formData.title || ""}
          contractId={formData.contractId || ""}
          type={formData.type as string}
          status={formData.status as string}
          onInputChange={handleChange}
          onSelectChange={handleSelectChange}
        />

        <TagsField 
          tags={formData.tags || []}
          onTagInput={handleTagInput}
          onRemoveTag={removeTag}
        />
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
