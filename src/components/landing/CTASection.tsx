
import React from "react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onSignUp: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onSignUp }) => {
  return (
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
          onClick={onSignUp}
        >
          Get Started Today
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
