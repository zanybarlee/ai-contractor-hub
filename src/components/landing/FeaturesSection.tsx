
import React from "react";
import { 
  Building2, 
  Users, 
  Building, 
  Scale, 
  FileText, 
  ShoppingCart, 
  ClipboardCheck,
  CheckCircle
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection: React.FC = () => {
  return (
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
  );
};

export default FeaturesSection;
