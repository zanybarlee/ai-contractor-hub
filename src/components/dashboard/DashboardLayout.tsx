
import { useEffect } from "react";
import DashboardStats, { DashboardStat } from "./DashboardStats";
import ContractPerformance from "./ContractPerformance";
import ComplianceCard from "./ComplianceCard";
import ActivityCard from "./ActivityCard";
import RecentContracts from "./RecentContracts";
import RiskAssessment from "./RiskAssessment";
import PerformanceAnalytics from "@/components/analytics/PerformanceAnalytics";
import { FileText, AlertTriangle, Clock, Users } from "lucide-react";

const DashboardLayout = () => {
  const stats: DashboardStat[] = [
    {
      name: "Active Contracts",
      value: "24",
      icon: FileText,
      trend: "+3 this month",
      trendType: "positive",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      name: "Risk Alerts",
      value: "7",
      icon: AlertTriangle,
      trend: "-2 from last week",
      trendType: "positive",
      color: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      name: "Pending Reviews",
      value: "12",
      icon: Clock,
      trend: "4 urgent",
      trendType: "negative",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      name: "Team Members",
      value: "34",
      icon: Users,
      trend: "+2 new members",
      trendType: "positive",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  useEffect(() => {
    // Animate cards on page load
    const timer = setTimeout(() => {
      document.querySelectorAll('.animate-on-load').forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-4');
        }, i * 100);
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your contracts today
        </p>
      </div>

      <DashboardStats stats={stats} />

      <div className="mt-8">
        <PerformanceAnalytics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <ContractPerformance />

        <div className="space-y-6">
          <ComplianceCard />
          <ActivityCard />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RecentContracts />
        <RiskAssessment />
      </div>
    </div>
  );
};

export default DashboardLayout;
