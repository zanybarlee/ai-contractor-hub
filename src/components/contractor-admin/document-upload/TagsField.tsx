
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface TagsFieldProps {
  tags: string[];
  onTagInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTag: (tag: string) => void;
}

const TagsField = ({ tags, onTagInput, onRemoveTag }: TagsFieldProps) => {
  return (
    <div>
      <Label htmlFor="tags">Tags (press Enter to add)</Label>
      <Input
        id="tags"
        placeholder="Add tags..."
        onKeyDown={onTagInput}
      />
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, i) => (
            <Badge 
              key={i} 
              variant="secondary"
              className="cursor-pointer hover:bg-gray-300"
              onClick={() => onRemoveTag(tag)}
            >
              {tag} ✕
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsField;
