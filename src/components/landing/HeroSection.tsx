
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import RoleSelectionModal, { roles } from "@/components/RoleSelectionModal";

interface HeroSectionProps {
  isSignIn: boolean;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  handleAuth: (e: React.FormEvent) => void;
  setIsSignIn: (value: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  isSignIn, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  role, 
  setRole, 
  handleAuth, 
  setIsSignIn 
}) => {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  
  const openRoleModal = () => {
    setIsRoleModalOpen(true);
  };

  const handleRoleSelect = (value: string) => {
    setRole(value);
  };

  const handleRoleConfirm = () => {
    setIsRoleModalOpen(false);
  };

  // Find the selected role object
  const selectedRole = roles.find(r => r.value === role);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Role Selection Modal */}
      <RoleSelectionModal
        open={isRoleModalOpen}
        onOpenChange={setIsRoleModalOpen}
        selectedRole={role}
        onRoleSelect={handleRoleSelect}
        onConfirm={handleRoleConfirm}
      />
      
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Advanced Construction Contract Management System
        </h2>
        <p className="text-lg md:text-xl opacity-90">
          Streamline your construction contracts with AI-powered insights, 
          risk management, and collaborative tools.
        </p>
        <div className="pt-4 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-300" />
            <span>Intelligent contract analysis and generation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-300" />
            <span>Proactive risk identification and mitigation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-300" />
            <span>Simplified change order management</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-300" />
            <span>Collaborative tools for all stakeholders</span>
          </div>
        </div>
      </div>
      
      <div className="md:w-1/2 w-full max-w-md">
        <Card className="w-full shadow-lg bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-xl">{isSignIn ? "Sign In" : "Create an Account"}</CardTitle>
            <CardDescription className="text-white/80">
              {isSignIn 
                ? "Access your construction contract management dashboard" 
                : "Join thousands of construction professionals"
              }
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleAuth}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="email@company.com" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">Role</Label>
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full bg-white/10 border-white/20 text-white justify-between font-normal"
                  onClick={openRoleModal}
                >
                  <span className="flex items-center gap-2">
                    {selectedRole ? (
                      <>
                        <div className={`p-1 rounded-full ${selectedRole.color}`}>
                          {selectedRole.icon}
                        </div>
                        <span>{selectedRole.label}</span>
                      </>
                    ) : (
                      "Select your role"
                    )}
                  </span>
                  <span>▼</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-white text-blue-700 hover:bg-white/90">
                {isSignIn ? "Sign In" : "Sign Up"}
              </Button>
            </CardFooter>
          </form>
          
          <div className="px-6 pb-6 text-center">
            <button 
              className="text-sm text-white/80 hover:text-white underline"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;
