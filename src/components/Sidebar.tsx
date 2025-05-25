
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  Users,
  MessageSquare,
  Settings,
  Building2,
  Shield,
  TrendingUp,
  Gavel,
  Search,
  UserCheck,
  ClipboardList,
  Receipt,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const [contractsOpen, setContractsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Contracts",
      icon: FileText,
      submenu: [
        { title: "All Contracts", href: "/contracts" },
        { title: "Generate Contract", href: "/contracts/generate" },
        { title: "SOP Payment Claim", href: "/sop-payment-claim" },
      ],
    },
    {
      title: "Contract Intelligence",
      href: "/contract-intelligence",
      icon: Search,
    },
    {
      title: "Dispute Resolution",
      href: "/dispute-resolution",
      icon: Gavel,
    },
    {
      title: "Risk Management",
      href: "/risk-management",
      icon: AlertTriangle,
    },
    {
      title: "Change Orders",
      href: "/change-orders",
      icon: ClipboardList,
    },
    {
      title: "Collaboration",
      href: "/collaboration",
      icon: MessageSquare,
    },
    {
      title: "Contractor Admin",
      href: "/contractor-administrator",
      icon: UserCheck,
    },
    {
      title: "Contractors",
      href: "/contractors",
      icon: Building2,
    },
    {
      title: "Contracts PMO",
      href: "/contracts-pmo",
      icon: TrendingUp,
    },
    {
      title: "Forensics",
      href: "/forensics",
      icon: Shield,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto z-30">
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          if (item.submenu) {
            const hasActiveSubmenu = item.submenu.some(subItem => isActive(subItem.href));
            
            return (
              <div key={item.title}>
                <button
                  onClick={() => setContractsOpen(!contractsOpen)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors",
                    hasActiveSubmenu ? "bg-blue-50 text-blue-700" : "text-gray-700"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.title}
                  </div>
                  {contractsOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {contractsOpen && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-md transition-colors",
                          isActive(subItem.href)
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(item.href)
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
