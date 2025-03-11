
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  CheckCircle, 
  Building2, 
  Users, 
  ClipboardCheck, 
  Scale, 
  FileText, 
  ShoppingCart, 
  Building 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LandingPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (!isSignIn && !role) {
      toast({
        title: "Error",
        description: "Please select your role",
        variant: "destructive",
      });
      return;
    }
    
    // Emulate authentication
    toast({
      title: isSignIn ? "Welcome back!" : "Account created",
      description: isSignIn 
        ? "You have successfully signed in" 
        : `Your account has been created with role: ${role}`,
    });
    
    // Navigate to dashboard
    navigate("/contracts");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ACCMS</h1>
          <div className="space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-blue-700" 
              onClick={() => setIsSignIn(true)}
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
        
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
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
                  
                  {!isSignIn && (
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-white">Role</Label>
                      <Select onValueChange={setRole}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general_contractor">General Contractor</SelectItem>
                          <SelectItem value="subcontractor">Subcontractor</SelectItem>
                          <SelectItem value="project_owner">Project Owner</SelectItem>
                          <SelectItem value="legal_team">Construction Legal Team</SelectItem>
                          <SelectItem value="contract_admin">Contract Administrator</SelectItem>
                          <SelectItem value="procurement">Procurement Officer</SelectItem>
                          <SelectItem value="government">Government & Regulatory</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
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
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Designed for Construction Industry Professionals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Building2 className="h-10 w-10 text-blue-600" />}
              title="General Contractors"
              description="Streamline contract management across multiple projects and subcontractors."
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-blue-600" />}
              title="Subcontractors"
              description="Simplify agreement tracking and ensure compliance with project requirements."
            />
            <FeatureCard 
              icon={<Building className="h-10 w-10 text-blue-600" />}
              title="Project Owners"
              description="Maintain oversight of all contract activities and reduce project risks."
            />
            <FeatureCard 
              icon={<Scale className="h-10 w-10 text-blue-600" />}
              title="Legal Teams"
              description="Review and approve contracts efficiently with AI-assisted clause analysis."
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-blue-600" />}
              title="Contract Administrators"
              description="Automate routine tasks and focus on high-value contract management."
            />
            <FeatureCard 
              icon={<ShoppingCart className="h-10 w-10 text-blue-600" />}
              title="Procurement Officers"
              description="Standardize contract creation and vendor management processes."
            />
            <FeatureCard 
              icon={<ClipboardCheck className="h-10 w-10 text-blue-600" />}
              title="Government & Regulatory"
              description="Ensure compliance with regulations and maintain detailed audit trails."
            />
            <FeatureCard 
              icon={<CheckCircle className="h-10 w-10 text-blue-600" />}
              title="All Stakeholders"
              description="Collaborate seamlessly with real-time updates and unified communication."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Contract Management?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of construction professionals who are saving time, 
            reducing risks, and improving collaboration with ACCMS.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsSignIn(false)}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ACCMS</h3>
              <p className="text-gray-400">
                Advanced Construction Contract Management System
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contract Generation</li>
                <li>Risk Management</li>
                <li>Change Orders</li>
                <li>Collaboration Tools</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Blog</li>
                <li>Support</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Security</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Advanced Construction Contract Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <Card className="border border-gray-100 hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default LandingPage;
