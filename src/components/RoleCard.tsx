
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Role } from "@/components/RoleSelectionModal";

interface RoleCardProps {
  role: Role;
  isSelected: boolean;
  onSelect: (value: string) => void;
  onSignIn?: (role: string) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ 
  role, 
  isSelected, 
  onSelect, 
  onSignIn 
}) => {
  const handleCardClick = () => {
    onSelect(role.value);
    if (onSignIn) {
      onSignIn(role.value);
    }
  };

  return (
    <div className="flex items-start space-x-2">
      <RadioGroupItem 
        value={role.value} 
        id={role.value}
        className="mt-3"
      />
      <Label 
        htmlFor={role.value} 
        className="flex-1 cursor-pointer"
        onClick={handleCardClick}
      >
        <Card 
          className={`hover:border-primary transition-colors ${
            isSelected ? "border-primary" : ""
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
  );
};

export default RoleCard;
