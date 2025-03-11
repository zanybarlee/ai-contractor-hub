
import { Bell, Menu, Search, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { roles } from "@/components/RoleSelectionModal";

const AppHeader = () => {
  // For demo purposes, get role from localStorage. In a real app, this would come from auth state
  const userRole = localStorage.getItem('userRole') || '';
  const roleData = roles.find(r => r.value === userRole);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Library className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              ACCMS
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contracts..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
              />
            </div>
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
          </div>
          
          {/* User Profile Section */}
          <div className="flex items-center gap-3">
            {roleData && (
              <Badge variant="outline" className={`${roleData.color} border-none`}>
                {roleData.label}
              </Badge>
            )}
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {userRole ? userRole.substring(0, 2).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
