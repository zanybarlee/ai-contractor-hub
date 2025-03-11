
/**
 * AI Agent service for contract intelligence
 */

export interface ContractQuery {
  query: string;
  contractId?: string;
}

export interface ContractQueryResponse {
  answer: string;
  confidence: number;
  sources?: {
    clauseId: string;
    title: string;
    excerpt: string;
    relevance: number;
  }[];
  relatedQueries?: string[];
}

export interface MilestoneAlert {
  id: string;
  contractId: string;
  title: string;
  dueDate: string;
  description: string;
  status: 'upcoming' | 'overdue' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface DocumentComparisonResult {
  similarity: number;
  differences: {
    sectionTitle: string;
    originalText?: string;
    newText?: string;
    significance: 'minor' | 'moderate' | 'major';
  }[];
}

/**
 * Query the AI agent with a contract-related question
 */
export const queryContractAI = async (
  queryData: ContractQuery
): Promise<ContractQueryResponse> => {
  // Simulated API call to an AI service
  console.log("Querying AI with:", queryData);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock response
  return {
    answer: getSimulatedAnswer(queryData.query),
    confidence: 0.87,
    sources: [
      {
        clauseId: "cl002",
        title: "Liquidated Damages",
        excerpt: "Liquidated damages of $5,000 per day for delays...",
        relevance: 0.95,
      },
      {
        clauseId: "cl008",
        title: "Force Majeure",
        excerpt: "Neither party shall be liable for failure to perform... due to causes beyond its reasonable control...",
        relevance: 0.82,
      },
    ],
    relatedQueries: [
      "What is the dispute resolution process?",
      "How are payment terms structured?",
      "Can force majeure cover supply chain disruptions?",
    ],
  };
};

/**
 * Get contractual milestones and alerts
 */
export const getContractMilestones = (
  contractId: string
): MilestoneAlert[] => {
  // Mock data for milestones
  return [
    {
      id: "m1",
      contractId,
      title: "Project Commencement",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      description: "Official start date for the project. All preparatory work should be completed.",
      status: "upcoming",
      priority: "high",
    },
    {
      id: "m2",
      contractId,
      title: "First Payment Milestone",
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      description: "25% of the project value to be paid upon completion of foundation work.",
      status: "overdue",
      priority: "high",
    },
    {
      id: "m3",
      contractId,
      title: "Regulatory Compliance Audit",
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
      description: "Internal compliance audit to ensure all regulatory requirements are being met.",
      status: "upcoming",
      priority: "medium",
    },
    {
      id: "m4",
      contractId,
      title: "Midterm Project Review",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      description: "Comprehensive review of project progress, quality and timeline.",
      status: "upcoming",
      priority: "medium",
    },
  ];
};

/**
 * Compare contract documents/clauses for similarity and differences
 */
export const compareContractDocuments = (
  originalDocId: string,
  comparisonDocId: string
): DocumentComparisonResult => {
  // Mock document comparison result
  return {
    similarity: 0.72,
    differences: [
      {
        sectionTitle: "Payment Terms",
        originalText: "Payment shall be made within 30 days of invoice date.",
        newText: "Payment shall be made within 14 days of invoice date.",
        significance: "major",
      },
      {
        sectionTitle: "Liquidated Damages",
        originalText: "Liquidated damages of $5,000 per day for delays.",
        newText: "Liquidated damages of $3,500 per day for delays, capped at 5% of total contract value.",
        significance: "major",
      },
      {
        sectionTitle: "Warranty Period",
        originalText: "12-month warranty period from the date of completion.",
        newText: "24-month warranty period from the date of completion.",
        significance: "moderate",
      },
    ],
  };
};

// Helper function to generate responses based on the query
function getSimulatedAnswer(query: string): string {
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes("liquidated damages")) {
    return "This contract includes liquidated damages of $5,000 per day for delays. This is higher than the industry average of $3,000-$4,000 for similar projects. The clause does not include a cap on total damages, which presents a significant risk. Consider negotiating a cap of 5-10% of the contract value to limit exposure.";
  }
  
  if (lowercaseQuery.includes("force majeure") || lowercaseQuery.includes("weather")) {
    return "The force majeure clause in this contract covers 'acts of God, including severe weather events significantly deviating from historical patterns.' Recent legal precedents suggest that this would likely cover the severe weather delays you're experiencing, provided you can document that the conditions were abnormal for the season and location. You should submit a formal notice within 7 days as required by Section 8.3 of the contract.";
  }

  if (lowercaseQuery.includes("payment") || lowercaseQuery.includes("invoice")) {
    return "Payment terms are net-30 from invoice date. You can submit invoices monthly based on completed work. There's a 5% retention that will be released 60 days after substantial completion, subject to satisfactory resolution of any defect notifications.";
  }

  return "Based on my analysis of the contract, this question relates to multiple sections. The most relevant passages are highlighted in the sources below. In summary, the contract provides flexibility on this matter with certain conditions that must be met, including written notification and documentation requirements.";
}
