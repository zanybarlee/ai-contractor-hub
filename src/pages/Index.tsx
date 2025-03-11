
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <DashboardLayout />
      </main>
    </div>
  );
};

export default Dashboard;
