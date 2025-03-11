
import ComplianceStats from "@/components/compliance/ComplianceStats";
import ComplianceAlerts from "@/components/compliance/ComplianceAlerts";
import ComplianceRequirements from "@/components/compliance/ComplianceRequirements";
import { requirements, complianceStats } from "@/data/complianceData";

const ComplianceMonitoring = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ComplianceStats stats={complianceStats} />
        <ComplianceAlerts />
      </div>
      <ComplianceRequirements requirements={requirements} />
    </div>
  );
};

export default ComplianceMonitoring;
