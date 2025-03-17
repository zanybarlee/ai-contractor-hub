
import { format } from 'date-fns';

// Types
export interface Document {
  id: string;
  title: string;
  type: 'Contract' | 'Amendment' | 'Notice' | 'Claim' | 'Letter' | 'Correspondence' | 'Instruction' | 'Other';
  content: string;
  summary?: string;
  contractId?: string;
  dateCreated: string;
  dateModified: string;
  tags: string[];
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'Pending' | 'Expired';
  author: string;
  relatedDocuments?: string[];
  deadlines?: Deadline[];
}

export interface Deadline {
  id: string;
  title: string;
  documentId: string;
  dueDate: string;
  status: 'Upcoming' | 'Overdue' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  notificationType: 'Email' | 'System' | 'Both';
  description: string;
}

export interface Draft {
  id: string;
  title: string;
  type: 'Notice' | 'Claim' | 'Extension' | 'Correspondence' | 'Other';
  content: string;
  contractId?: string;
  dateCreated: string;
  status: 'Draft' | 'Sent' | 'Approved' | 'Rejected';
}

// Mock data
export const mockDocuments: Document[] = [
  {
    id: 'doc1',
    title: 'Main Contract Agreement',
    type: 'Contract',
    content: 'This agreement is made between Party A and Party B...',
    summary: 'Standard construction contract for the City Center project with key milestones for foundation work and structural elements.',
    contractId: 'c001',
    dateCreated: '2023-05-15T10:30:00Z',
    dateModified: '2023-05-15T10:30:00Z',
    tags: ['Main Contract', 'Signed', 'Commercial'],
    status: 'Approved',
    author: 'John Smith',
    deadlines: [
      {
        id: 'dl1',
        title: 'Notice of Commencement',
        documentId: 'doc1',
        dueDate: format(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        status: 'Upcoming',
        priority: 'High',
        notificationType: 'Both',
        description: 'Submit formal notice of project commencement to the client.'
      }
    ]
  },
  {
    id: 'doc2',
    title: 'Site Instruction #42',
    type: 'Instruction',
    content: 'Following the site meeting on [date], the contractor is instructed to...',
    summary: 'Instructions for revised foundation depth following geotechnical survey results.',
    contractId: 'c001',
    dateCreated: '2023-07-22T14:15:00Z',
    dateModified: '2023-07-22T16:20:00Z',
    tags: ['Site Instruction', 'Foundation', 'Technical'],
    status: 'Approved',
    author: 'Emily Johnson',
    deadlines: [
      {
        id: 'dl2',
        title: 'Response to Site Instruction',
        documentId: 'doc2',
        dueDate: format(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        status: 'Overdue',
        priority: 'High',
        notificationType: 'Email',
        description: 'Formal response to site instruction regarding foundation depths.'
      }
    ]
  },
  {
    id: 'doc3',
    title: 'Variation Order #7',
    type: 'Amendment',
    content: 'This variation order authorizes changes to the scope of work...',
    contractId: 'c001',
    dateCreated: '2023-09-05T09:45:00Z',
    dateModified: '2023-09-07T11:30:00Z',
    tags: ['Variation', 'Scope Change', 'Commercial'],
    status: 'Pending',
    author: 'Robert Chen',
  },
  {
    id: 'doc4',
    title: 'Delay Notification Letter',
    type: 'Correspondence',
    content: 'We regret to inform you that due to unforeseen circumstances...',
    summary: 'Formal notification of 14-day delay due to unexpected underground utilities discovery.',
    contractId: 'c002',
    dateCreated: '2023-10-18T08:20:00Z',
    dateModified: '2023-10-18T15:40:00Z',
    tags: ['Delay', 'Notification', 'Time Extension'],
    status: 'Submitted',
    author: 'Sarah Williams',
    deadlines: [
      {
        id: 'dl3',
        title: 'Client Response Deadline',
        documentId: 'doc4',
        dueDate: format(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        status: 'Upcoming',
        priority: 'Medium',
        notificationType: 'System',
        description: 'Expected response deadline from client regarding delay notification.'
      }
    ]
  },
];

export const mockCorrespondenceDrafts: Draft[] = [
  {
    id: 'draft1',
    title: 'EOT Request for Weather Delays',
    type: 'Extension',
    content: `Dear [Client Name],

We are writing to formally request an extension of time (EOT) pursuant to Clause 8.4 of the Contract Agreement dated January 15, 2023.

Due to exceptionally adverse weather conditions experienced between March 10-17, 2023, which exceeded historical weather patterns for this region and time of year, we have experienced unavoidable delays to the critical path activities.

Specifically:
1. Concrete pouring for foundations was delayed by 5 working days
2. Site access was restricted for heavy machinery for 3 additional working days

Weather records from the National Weather Service confirm rainfall exceeded historical averages by 175% during this period, meeting the criteria for "exceptionally adverse weather conditions" as defined in the Contract.

Based on our analysis of the program impact, we hereby request an extension of time of 8 working days, with a revised completion date of September 23, 2023.

We have attached the following supporting documentation:
- Weather data reports
- Site daily logs
- Updated program showing impact

We look forward to your review and approval of this EOT request within 14 days as specified in the Contract.

Sincerely,
[Contractor Representative]`,
    contractId: 'c001',
    dateCreated: format(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    status: 'Draft'
  },
  {
    id: 'draft2',
    title: 'Response to Site Instruction #42',
    type: 'Correspondence',
    content: `Dear [Client Representative],

We acknowledge receipt of Site Instruction #42 dated July 22, 2023, regarding the revised foundation depths following the geotechnical survey results.

After careful review of the instruction and consultation with our structural engineers, we confirm that we will implement the changes as instructed, with the following considerations:

1. The revised foundation depths from 1.2m to 1.8m will require additional excavation and concrete quantities
2. This change will impact the foundation work scheduled for Area B and C of the project
3. We anticipate a delay of approximately 7 working days to the completion of the foundation works

In accordance with Clause 13.3 of the Contract Agreement, we hereby provide notice that this instruction constitutes a variation to the works which will result in additional costs estimated at $47,500, broken down as follows:

- Additional excavation work: $12,000
- Additional concrete and reinforcement: $28,500
- Extended equipment hire: $7,000

We will submit a detailed cost variation within 14 days as required by the Contract.

Please confirm your acknowledgment of this response.

Regards,
[Contractor Administrator]`,
    contractId: 'c001',
    dateCreated: format(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    status: 'Draft'
  }
];

// Service functions
export const getDocuments = (): Promise<Document[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDocuments);
    }, 500);
  });
};

export const getDraftCorrespondence = (): Promise<Draft[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCorrespondenceDrafts);
    }, 500);
  });
};

export const getDocumentById = (id: string): Promise<Document | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDocuments.find(doc => doc.id === id));
    }, 300);
  });
};

export const generateDocumentSummary = (documentId: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const document = mockDocuments.find(doc => doc.id === documentId);
      if (document) {
        resolve(`AI-generated summary for ${document.title}: This document contains key terms related to ${document.tags.join(', ')}. The document is currently ${document.status.toLowerCase()} and was last modified on ${new Date(document.dateModified).toLocaleDateString()}. Key points include obligations for both parties, timelines for deliverables, and specific technical requirements related to construction standards.`);
      } else {
        resolve("Document not found. Unable to generate summary.");
      }
    }, 1500);
  });
};

export const generateCorrespondence = (type: string, contractId: string): Promise<Draft> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real application, this would call an AI service to generate a draft based on the contract
      const newDraft: Draft = {
        id: `draft${Math.floor(Math.random() * 1000)}`,
        title: `New ${type} Draft`,
        type: type as any,
        content: `This is an AI-generated ${type} draft for contract ${contractId}. 
        
Dear [Client Name],

We are writing regarding [purpose of correspondence] related to our contract agreement dated [contract date].

Based on the relevant contract clauses, specifically [relevant clause numbers], we would like to [state intention/request/notification].

The specific details are as follows:
1. [Key point 1]
2. [Key point 2]
3. [Key point 3]

We kindly request your response by [date] as specified in clause [number] of our agreement.

Sincerely,
[Contractor Representative]`,
        contractId: contractId,
        dateCreated: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        status: 'Draft'
      };
      
      resolve(newDraft);
    }, 2000);
  });
};

export const getUpcomingDeadlines = (): Promise<Deadline[]> => {
  const allDeadlines = mockDocuments
    .flatMap(doc => doc.deadlines || [])
    .filter(deadline => deadline.status !== 'Completed');

  return Promise.resolve(allDeadlines);
};

export const saveDocument = (document: Document): Promise<Document> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would save to a database
      resolve({
        ...document,
        dateModified: new Date().toISOString()
      });
    }, 500);
  });
};

export const saveDraft = (draft: Draft): Promise<Draft> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would save to a database
      resolve(draft);
    }, 500);
  });
};
