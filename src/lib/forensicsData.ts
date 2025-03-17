
// Mock data for the Forensics module components

// Mock search results for ForensicSearch component
export const mockSearchResults = [
  {
    id: "doc-1",
    title: "Site Instruction #37 - Foundation Redesign",
    excerpt: "Due to unexpected soil conditions, the foundation design must be modified as outlined in Drawing Rev.C-103. This change impacts the critical path by approximately 14 days.",
    type: "siteInstruction",
    date: "2023-03-15",
    tags: ["design-change", "critical-path", "foundation"]
  },
  {
    id: "doc-2",
    title: "Meeting Minutes - Design Coordination",
    excerpt: "The design team acknowledged delays in providing revised structural details. Project Manager requested expedited turnaround on all pending RFIs to mitigate schedule impacts.",
    type: "minutes",
    date: "2023-02-28",
    tags: ["design-delay", "structural", "RFI"]
  },
  {
    id: "doc-3",
    title: "Contract Clause 15.4 - Extensions of Time",
    excerpt: "Contractor shall be entitled to an extension of time for completion if and to the extent completion is or will be delayed by any of the following causes...",
    type: "contractClause",
    date: "2022-11-10",
    tags: ["EOT", "delay-provisions", "critical"]
  },
  {
    id: "doc-4",
    title: "Progress Report - March 2023",
    excerpt: "Mechanical installation is tracking 8 days behind schedule due to late delivery of HVAC equipment. Recovery plan being implemented with additional resources.",
    type: "correspondence",
    date: "2023-04-02",
    tags: ["delay", "mechanical", "recovery-plan"]
  },
  {
    id: "doc-5",
    title: "Payment Application #7 - Disputed Items",
    excerpt: "Client has rejected payment for excavation overruns, citing lack of prior approval. Contractor maintains this work was directed verbally at site meeting on January 12.",
    type: "correspondence",
    date: "2023-03-25",
    tags: ["payment-dispute", "excavation", "variation"]
  }
];

// Mock timeline events for TimelineGenerator component
export const mockTimelineEvents = [
  {
    id: "event-1",
    title: "Design Change Request #14",
    description: "Client requested significant modifications to the floor layout of levels 3-7.",
    date: "2023-01-10",
    category: "change",
    documentRef: "DCR-2023-014"
  },
  {
    id: "event-2",
    title: "RFI Response Delay",
    description: "14-day delay in receiving structural design clarification for column spacing.",
    date: "2023-01-28",
    category: "delay",
    documentRef: "RFI-087"
  },
  {
    id: "event-3",
    title: "Variation Order Approved",
    description: "Additional scope for enhanced fire protection system approved with 7-day extension.",
    date: "2023-02-15",
    category: "approval",
    documentRef: "VO-2023-005"
  },
  {
    id: "event-4",
    title: "Weather Delay - Excessive Rainfall",
    description: "Site operations halted for 3 days due to flooding conditions.",
    date: "2023-03-01",
    category: "delay",
    documentRef: "DRN-023"
  },
  {
    id: "event-5",
    title: "Design Coordination Meeting",
    description: "Resolution of MEP conflicts in ceiling plenum spaces for levels 2-5.",
    date: "2023-03-18",
    category: "coordination",
    documentRef: "MTG-042"
  }
];

// Mock data for CauseEffectAnalysis component
export const mockCauseEffectResults = {
  causes: [
    {
      title: "Late Design Information",
      description: "Structural details for core walls were delivered 14 days after the contractually required date.",
      documentRef: "DCR-2023-014"
    },
    {
      title: "Revised Authority Requirements",
      description: "Local building authority imposed additional fire rating requirements after design approval.",
      documentRef: "AUTH-NOT-2023-11"
    },
    {
      title: "Differing Site Condition",
      description: "Unexpected rock formation discovered at -3.5m elevation, not shown on geological survey.",
      documentRef: "SI-2023-019"
    }
  ],
  effects: [
    {
      title: "Critical Path Delay",
      description: "Foundation works delayed by 21 calendar days, directly impacting the structure commencement.",
      impact: "High"
    },
    {
      title: "Additional Design Costs",
      description: "Redesign of foundation system required additional engineering hours and revised drawings.",
      impact: "Medium"
    },
    {
      title: "Material Substitution",
      description: "Change in reinforcement specification required due to supply chain delays.",
      impact: "Low"
    }
  ],
  contractClauses: [
    {
      title: "Differing Site Conditions",
      text: "If Contractor encounters conditions at the Site that differ materially from those indicated in the Contract Documents, Contractor shall promptly notify Engineer in writing of such conditions.",
      reference: "General Conditions, Article 4.3.4"
    },
    {
      title: "Delays and Extensions of Time",
      text: "If Contractor is delayed at any time in the progress of the Work by changes ordered in the Work, or by labor disputes, fire, unusual delay in deliveries, unavoidable casualties, or other causes beyond the Contractor's control, then the Contract Time shall be extended.",
      reference: "General Conditions, Article 8.3.1"
    },
    {
      title: "Claims for Additional Cost",
      text: "If the Contractor wishes to make a claim for an increase in the Contract Sum, written notice as provided herein shall be given before proceeding to execute the Work.",
      reference: "General Conditions, Article 15.1.5"
    }
  ]
};

// Mock case files for CaseBuilder component
export const mockCaseFiles = [
  {
    id: "case-1",
    title: "Foundation Redesign Delay Claim",
    description: "Analysis of the 21-day delay resulting from unexpected soil conditions and subsequent foundation redesign requirements.",
    createdDate: "2023-04-10",
    status: "active",
    documentCount: 24,
    teamMembers: 3
  },
  {
    id: "case-2",
    title: "MEP Coordination Issues",
    description: "Investigation into recurring MEP conflicts and coordination issues affecting ceiling installation across multiple floors.",
    createdDate: "2023-03-22",
    status: "active",
    documentCount: 17,
    teamMembers: 2
  },
  {
    id: "case-3",
    title: "Payment Dispute - Variation Orders",
    description: "Documentation and analysis of rejected variation orders from payment applications #5-7.",
    createdDate: "2023-02-15",
    status: "closed",
    documentCount: 31,
    teamMembers: 4
  },
  {
    id: "case-4",
    title: "Weather Delay Assessment",
    description: "Forensic analysis of weather patterns and their impact on the critical path during Q1 2023.",
    createdDate: "2023-01-30",
    status: "active",
    documentCount: 12,
    teamMembers: 1
  }
];
