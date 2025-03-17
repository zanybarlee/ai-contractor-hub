
import { Home, FileText, AlertTriangle, Users, Settings, GitBranch, Brain, Scale, LogOut, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const navigation = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Contracts", icon: FileText, href: "/contracts" },
  { name: "Contract Intelligence", icon: Brain, href: "/contract-intelligence" },
  { name: "Contractor Administrator", icon: ClipboardCheck, href: "/contractor-administrator" },
  { name: "Dispute Resolution", icon: Scale, href: "/dispute-resolution" },
  { name: "Risk Management", icon: AlertTriangle, href: "/risk-management" },
  { name: "Change Orders", icon: GitBranch, href: "/change-orders" },
  { name: "Collaboration", icon: Users, href: "/collaboration" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignOut = () => {
    // In a real app, we would clear auth tokens/state here
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };
  
  return (
    <aside className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 bg-white border-r border-gray-200">
      <div className="h-16" /> {/* Spacer for header */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg",
              "hover:bg-gray-50 transition-colors duration-200",
              (location.pathname === item.href || 
               (item.href !== '/dashboard' && location.pathname.startsWith(item.href)))
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
      
      {/* Sign Out Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
