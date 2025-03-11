
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Collaboration = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Team Collaboration</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Collaborative Contract Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Work together with your team to review, comment on, and approve contracts. 
                Track changes, assign tasks, and maintain clear communication throughout the contract lifecycle.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Team Communication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Secure messaging and discussion threads tied to specific contract sections and clauses.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Review Workflows</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Customizable approval processes with role-based permissions and audit trails.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Task Assignment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Delegate responsibilities and track progress with integrated task management.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Version Control</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Track all changes with comprehensive version history and compare different iterations.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Collaboration;
