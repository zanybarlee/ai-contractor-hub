
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  Users, 
  Building, 
  Scale, 
  FileText,
  ShoppingCart,
  ClipboardCheck
} from "lucide-react";

export interface Role {
  value: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

export const roles: Role[] = [
  {
    value: "general_contractor",
    label: "General Contractor",
    icon: <Building2 size={32} />,
    description: "Manages overall construction projects",
    color: "bg-blue-100 text-blue-600",
  },
  {
    value: "subcontractor",
    label: "Subcontractor",
    icon: <Users size={32} />,
    description: "Specializes in specific construction tasks",
    color: "bg-green-100 text-green-600",
  },
  {
    value: "project_owner",
    label: "Project Owner",
    icon: <Building size={32} />,
    description: "Initiates and finances construction projects",
    color: "bg-purple-100 text-purple-600",
  },
  {
    value: "legal_team",
    label: "Construction Legal Team",
    icon: <Scale size={32} />,
    description: "Handles legal aspects of construction",
    color: "bg-red-100 text-red-600",
  },
  {
    value: "contract_admin",
    label: "Contract Administrator",
    icon: <FileText size={32} />,
    description: "Manages contract documentation and compliance",
    color: "bg-orange-100 text-orange-600",
  },
  {
    value: "procurement",
    label: "Procurement Officer",
    icon: <ShoppingCart size={32} />,
    description: "Handles purchasing and vendor relationships",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    value: "government",
    label: "Government & Regulatory",
    icon: <ClipboardCheck size={32} />,
    description: "Oversees compliance with regulations",
    color: "bg-indigo-100 text-indigo-600",
  },
];

interface RoleSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRole: string;
  onRoleSelect: (role: string) => void;
  onConfirm: () => void;
}

const RoleSelectionModal = ({
  open,
  onOpenChange,
  selectedRole,
  onRoleSelect,
  onConfirm,
}: RoleSelectionModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Select Your Role</DialogTitle>
          <DialogDescription>
            Choose the role that best describes your position in the construction industry
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup value={selectedRole} onValueChange={onRoleSelect} className="grid gap-4">
            {roles.map((role) => (
              <div key={role.value} className="flex items-start space-x-2">
                <RadioGroupItem 
                  value={role.value} 
                  id={role.value}
                  className="mt-3"
                />
                <Label 
                  htmlFor={role.value} 
                  className="flex-1 cursor-pointer"
                >
                  <Card 
                    className={`hover:border-primary transition-colors ${
                      selectedRole === role.value ? "border-primary" : ""
                    }`}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`p-3 rounded-full ${role.color}`}>
                        {role.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{role.label}</h3>
                        <p className="text-sm text-gray-500">{role.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="flex justify-end gap-3 mt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={!selectedRole}
          >
            Confirm Selection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionModal;
