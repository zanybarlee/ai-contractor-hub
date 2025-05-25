
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractTemplate } from "@/lib/contracts";
import { cn } from "@/lib/utils";

interface TemplateSelectionProps {
  templates: ContractTemplate[];
  selectedTemplate: string | null;
  onTemplateSelect: (templateId: string) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  templates,
  selectedTemplate,
  onTemplateSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card 
          key={template.id}
          className={cn(
            "cursor-pointer hover:shadow-md transition-shadow border-2",
            selectedTemplate === template.id 
              ? "border-blue-600" 
              : "border-transparent"
          )}
          onClick={() => onTemplateSelect(template.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={cn(
                "px-2 py-1 text-xs rounded-full",
                template.type === 'SOP' 
                  ? "bg-green-50 text-green-700" 
                  : "bg-blue-50 text-blue-700"
              )}>
                {template.type}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {template.complexity} Complexity
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-1">INDUSTRY SECTORS</p>
              <div className="flex flex-wrap gap-1">
                {template.sectors.map((sector) => (
                  <span key={sector} className="text-xs text-gray-600">
                    {sector}{template.sectors.indexOf(sector) < template.sectors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TemplateSelection;
