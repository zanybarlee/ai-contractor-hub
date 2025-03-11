
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  Building, 
  Scale, 
  FileText,
  ShoppingCart,
  ClipboardCheck
} from "lucide-react";
import RoleCard from "@/components/RoleCard";

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
  isSignInMode?: boolean;
  onSignIn?: (role: string) => void;
}

const RoleSelectionModal = ({
  open,
  onOpenChange,
  selectedRole,
  onRoleSelect,
  onConfirm,
  isSignInMode = false,
  onSignIn,
}: RoleSelectionModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isSignInMode ? "Sign In to Your Account" : "Select Your Role"}
          </DialogTitle>
          <DialogDescription>
            {isSignInMode 
              ? "Choose your role to sign in to the construction management system" 
              : "Choose the role that best describes your position in the construction industry"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup value={selectedRole} onValueChange={onRoleSelect} className="grid gap-4">
            {roles.map((role) => (
              <RoleCard 
                key={role.value}
                role={role}
                isSelected={selectedRole === role.value}
                onSelect={onRoleSelect}
                onSignIn={isSignInMode ? onSignIn : undefined}
              />
            ))}
          </RadioGroup>
        </div>
        
        {!isSignInMode && (
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionModal;
