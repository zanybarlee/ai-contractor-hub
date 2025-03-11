
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Refactored components
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

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
    
    if (!role) {
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
        ? `You have successfully signed in as ${role}` 
        : `Your account has been created with role: ${role}`,
    });
    
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <LandingHeader isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
        
        <HeroSection 
          isSignIn={isSignIn}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole}
          handleAuth={handleAuth}
          setIsSignIn={setIsSignIn}
        />
      </header>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection onSignUp={() => setIsSignIn(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
