
import { Button } from "@/components/ui/button";
import { Diff, LayoutPanelLeft, PanelRight } from "lucide-react";

interface ViewModeSelectorProps {
  viewMode: "summary" | "sideBySide";
  setViewMode: (mode: "summary" | "sideBySide") => void;
}

const ViewModeSelector = ({ viewMode, setViewMode }: ViewModeSelectorProps) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-medium">View Mode:</h3>
      <div className="flex space-x-2">
        <Button 
          variant={viewMode === "summary" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setViewMode("summary")}
          className="flex items-center gap-1"
        >
          <Diff className="h-4 w-4" /> Summary
        </Button>
        <Button 
          variant={viewMode === "sideBySide" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setViewMode("sideBySide")}
          className="flex items-center gap-1"
        >
          <LayoutPanelLeft className="h-4 w-4" /> Side by Side
        </Button>
      </div>
    </div>
  );
};

export default ViewModeSelector;
