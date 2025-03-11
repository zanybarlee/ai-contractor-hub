
// Mock data for dispute resolution

export const mockDisputeTypes = [
  "Delay Claim",
  "Change Order Dispute",
  "Payment Dispute",
  "Quality Defect Claim",
  "Scope Change Dispute"
];

export const mockClauses = [
  {
    id: "cl002",
    title: "Liquidated Damages",
    content: "Liquidated damages of $5,000 per day for delays beyond the agreed completion date shall apply, unless such delays are approved by the client in writing."
  },
  {
    id: "cl008",
    title: "Force Majeure",
    content: "Neither party shall be liable for failure to perform obligations due to causes beyond its reasonable control, including but not limited to acts of God, fire, flood, earthquake, or other natural disasters."
  },
  {
    id: "cl012",
    title: "Change Orders",
    content: "Any modifications to the contracted work must be approved in writing with associated costs and schedule impacts before implementation."
  },
  {
    id: "cl015",
    title: "Dispute Resolution",
    content: "All disputes shall first undergo mediation before proceeding to binding arbitration under the rules of the American Arbitration Association."
  }
];

export const mockPrecedents = [
  {
    case: "Smith Construction v. Metro Development (2021)",
    relevance: "Similar weather-related delay claim with force majeure clause",
    outcome: "Court ruled in favor of contractor due to unprecedented weather events"
  },
  {
    case: "Urban Builders v. City Council (2020)",
    relevance: "Dispute over liquidated damages calculation method",
    outcome: "Partial reduction of liquidated damages based on actual losses"
  },
  {
    case: "Highland Construction v. Valley Properties (2022)",
    relevance: "Material shortage delays during supply chain disruption",
    outcome: "Court upheld force majeure defense for the contractor"
  }
];

export const mockResolutions = [
  {
    title: "Invoke Force Majeure",
    description: "Weather events qualify under the force majeure clause, potentially releasing contractor from liquidated damages",
    probability: 75
  },
  {
    title: "Negotiate Reduced Damages",
    description: "Propose prorating liquidated damages based on partial completion and mitigating factors",
    probability: 60
  },
  {
    title: "Mediation",
    description: "Suggest third-party mediation based on contract Section 8.3 before pursuing arbitration",
    probability: 90
  },
  {
    title: "Schedule Recovery Plan",
    description: "Propose an accelerated completion plan with adjusted milestones to mitigate further delays",
    probability: 65
  }
];

export interface AnalysisResult {
  type: string;
  relevantClauses: { id: string; title: string; content: string }[];
  legalPrecedents: { case: string; relevance: string; outcome: string }[];
  resolutionOptions: { title: string; description: string; probability: number }[];
}
