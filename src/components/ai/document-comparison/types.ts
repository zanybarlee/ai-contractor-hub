
export interface DocumentComparisonResult {
  similarity: number;
  differences: {
    sectionTitle: string;
    originalText?: string;
    newText?: string;
    significance: 'minor' | 'moderate' | 'major';
  }[];
}

export interface MockDocument {
  [key: string]: string;
}
