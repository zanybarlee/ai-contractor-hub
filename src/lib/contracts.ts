
export type ContractTemplate = {
  id: string;
  name: string;
  type: 'FIDIC' | 'NEC' | 'AIA' | 'Bespoke';
  description: string;
  sectors: string[];
  complexity: 'Low' | 'Medium' | 'High';
};

export type ContractClause = {
  id: string;
  title: string;
  content: string;
  riskScore: number; // 0-100
  recommendations?: string[];
  alternatives?: string[];
};

export type Contract = {
  id: string;
  title: string;
  status: 'Draft' | 'Under Review' | 'Negotiating' | 'Signed' | 'Expired';
  templateId: string;
  parties: {
    clientName: string;
    contractorName: string;
  };
  value: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  clauses: ContractClause[];
  versions: {
    id: string;
    createdAt: string;
    createdBy: string;
    changes: string;
  }[];
};

// Placeholder contract templates
export const contractTemplates: ContractTemplate[] = [
  {
    id: 'fidic-red-2017',
    name: 'FIDIC Red Book',
    type: 'FIDIC',
    description: 'For building and engineering works designed by the employer',
    sectors: ['Infrastructure', 'Civil Engineering'],
    complexity: 'High',
  },
  {
    id: 'nec4-ecc',
    name: 'NEC4 Engineering & Construction Contract',
    type: 'NEC',
    description: 'Flexible contract with 6 main payment options',
    sectors: ['Construction', 'Engineering'],
    complexity: 'Medium',
  },
  {
    id: 'aia-a101',
    name: 'AIA A101-2017',
    type: 'AIA',
    description: 'Standard form of agreement between owner and contractor',
    sectors: ['Building', 'Architecture'],
    complexity: 'Medium',
  },
  {
    id: 'bespoke-general',
    name: 'General Construction Agreement',
    type: 'Bespoke',
    description: 'Customizable construction contract for small to medium projects',
    sectors: ['General Construction', 'Renovation'],
    complexity: 'Low',
  },
];

// Placeholder contracts for the demo
export const sampleContracts: Contract[] = [
  {
    id: 'c001',
    title: 'City Center Commercial Tower',
    status: 'Under Review',
    templateId: 'fidic-red-2017',
    parties: {
      clientName: 'Metropolis Developments Ltd',
      contractorName: 'Summit Construction Group',
    },
    value: 24500000,
    currency: 'USD',
    createdAt: '2023-10-15T09:30:00Z',
    updatedAt: '2023-11-02T14:45:00Z',
    clauses: [
      {
        id: 'cl001',
        title: 'Payment Terms',
        content: 'Payment shall be made within 30 days of invoice date...',
        riskScore: 25,
        recommendations: ['Consider reducing payment terms to 14 days'],
      },
      {
        id: 'cl002',
        title: 'Liquidated Damages',
        content: 'Liquidated damages of $5,000 per day for delays...',
        riskScore: 75,
        recommendations: ['High risk clause. Consider capping the total liquidated damages'],
        alternatives: ['Alternative: $3,000 per day with a cap of 5% of contract value'],
      },
    ],
    versions: [
      {
        id: 'v001',
        createdAt: '2023-10-15T09:30:00Z',
        createdBy: 'John Smith',
        changes: 'Initial draft created',
      },
      {
        id: 'v002',
        createdAt: '2023-10-28T11:15:00Z',
        createdBy: 'Jane Doe',
        changes: 'Updated payment terms and added liquidated damages clause',
      },
    ],
  },
  {
    id: 'c002',
    title: 'Highland Bridge Repair Project',
    status: 'Negotiating',
    templateId: 'nec4-ecc',
    parties: {
      clientName: 'State Transport Authority',
      contractorName: 'Bridge Builders Inc',
    },
    value: 8750000,
    currency: 'USD',
    createdAt: '2023-09-05T10:00:00Z',
    updatedAt: '2023-10-22T16:30:00Z',
    clauses: [
      {
        id: 'cl003',
        title: 'Scope of Work',
        content: 'The contractor shall perform all necessary repairs...',
        riskScore: 30,
      },
      {
        id: 'cl004',
        title: 'Weather Events',
        content: 'Weather events exceeding historical averages shall be considered...',
        riskScore: 60,
        recommendations: ['Define specific weather parameters more clearly'],
      },
    ],
    versions: [
      {
        id: 'v003',
        createdAt: '2023-09-05T10:00:00Z',
        createdBy: 'Robert Johnson',
        changes: 'Initial draft created',
      },
      {
        id: 'v004',
        createdAt: '2023-10-10T14:20:00Z',
        createdBy: 'Maria Garcia',
        changes: 'Revised scope of work and added weather events clause',
      },
    ],
  },
];
