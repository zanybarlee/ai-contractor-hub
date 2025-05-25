
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: { number: number; label: string }[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((stepItem) => (
          <div key={stepItem.number} className="flex flex-col items-center">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                currentStep === stepItem.number 
                  ? "bg-blue-600 text-white" 
                  : currentStep > stepItem.number 
                    ? "bg-green-100 text-green-600 border border-green-600" 
                    : "bg-gray-100 text-gray-400"
              )}
            >
              {currentStep > stepItem.number ? <CheckCircle className="h-5 w-5" /> : stepItem.number}
            </div>
            <span className={cn(
              "text-sm mt-2",
              currentStep === stepItem.number ? "text-blue-600 font-medium" : "text-gray-500"
            )}>
              {stepItem.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
