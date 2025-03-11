
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>
          
          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Manage your account information, profile, and subscription details.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <span className="text-sm font-medium">Name:</span>
                      <span className="col-span-2">John Smith</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <span className="text-sm font-medium">Email:</span>
                      <span className="col-span-2">john.smith@example.com</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <span className="text-sm font-medium">Company:</span>
                      <span className="col-span-2">Smith Construction LLC</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <span className="text-sm font-medium">Subscription Plan:</span>
                      <span className="col-span-2">Enterprise</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Customize your experience with display, language, and other settings.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Control how and when you receive alerts about your contracts and team activity.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Manage your password, two-factor authentication, and other security features.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
