
import React from "react";
import { Button } from "@/components/ui/button";

interface LandingHeaderProps {
  isSignIn: boolean;
  setIsSignIn: (value: boolean) => void;
  openRoleModal: () => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ 
  isSignIn, 
  setIsSignIn, 
  openRoleModal 
}) => {
  const handleSignIn = () => {
    setIsSignIn(true);
    openRoleModal();
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">ACCMS</h1>
      <div className="space-x-4">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-blue-700" 
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Button 
          variant="outline" 
          className="text-white hover:bg-blue-700 border-white" 
          onClick={() => setIsSignIn(false)}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default LandingHeader;
