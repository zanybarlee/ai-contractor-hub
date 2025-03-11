
import { Home, FileText, AlertTriangle, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Contracts", icon: FileText, href: "/contracts" },
  { name: "Risk Management", icon: AlertTriangle, href: "/risk-management" },
  { name: "Collaboration", icon: Users, href: "/collaboration" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 bg-white border-r border-gray-200">
      <div className="h-16" /> {/* Spacer for header */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg",
              "hover:bg-gray-50 transition-colors duration-200",
              item.href === window.location.pathname
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
