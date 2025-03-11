
export interface ComplianceRequirement {
  id: string;
  title: string;
  category: "building" | "safety" | "environmental" | "labor";
  status: "compliant" | "at-risk" | "non-compliant";
  dueDate: string;
  description: string;
  aiRecommendation?: string;
}

export interface ComplianceStats {
  overall: number;
  building: number;
  safety: number;
  environmental: number;
  labor: number;
}
