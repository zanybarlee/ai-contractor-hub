
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import ChangeOrderManagement from "@/components/ChangeOrderManagement";

const ChangeOrders = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Change Orders & Variations</h1>
          
          <ChangeOrderManagement />
        </div>
      </main>
    </div>
  );
};

export default ChangeOrders;
