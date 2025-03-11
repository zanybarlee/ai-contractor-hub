
import { ComplianceRequirement, ComplianceStats } from "@/types/compliance";

export const requirements: ComplianceRequirement[] = [
  {
    id: "cr1",
    title: "Building Code Update 2023-B4",
    category: "building",
    status: "at-risk",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    description: "New energy efficiency requirements for HVAC systems in commercial buildings",
    aiRecommendation: "Schedule inspection with licensed HVAC contractor to evaluate current systems against new requirements"
  },
  {
    id: "cr2",
    title: "Workplace Safety Regulation 29 CFR 1926",
    category: "safety",
    status: "compliant",
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Fall protection standards for workers at heights above 6 feet",
  },
  {
    id: "cr3",
    title: "Environmental Impact Assessment",
    category: "environmental",
    status: "non-compliant",
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Required environmental assessment for projects near protected wetlands",
    aiRecommendation: "Urgent: Submit expedited assessment application and prepare mitigation plan to minimize penalties"
  },
  {
    id: "cr4",
    title: "Labor Wage Requirements",
    category: "labor",
    status: "compliant",
    dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Prevailing wage requirements for government-funded projects",
  },
];

export const complianceStats: ComplianceStats = {
  overall: 82,
  building: 75,
  safety: 95,
  environmental: 60,
  labor: 98,
};
