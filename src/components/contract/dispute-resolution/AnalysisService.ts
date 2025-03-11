
import { 
  mockDisputeTypes, 
  mockClauses, 
  mockPrecedents, 
  mockResolutions,
  AnalysisResult
} from "./MockData";

export const analyzeDispute = (): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a random dispute type from our mock data
      const randomDisputeType = mockDisputeTypes[Math.floor(Math.random() * mockDisputeTypes.length)];
      
      // Select 2-3 random clauses
      const shuffledClauses = [...mockClauses].sort(() => 0.5 - Math.random());
      const selectedClauses = shuffledClauses.slice(0, Math.floor(Math.random() * 2) + 2);
      
      // Select 2-3 random precedents
      const shuffledPrecedents = [...mockPrecedents].sort(() => 0.5 - Math.random());
      const selectedPrecedents = shuffledPrecedents.slice(0, Math.floor(Math.random() * 2) + 2);
      
      // Select 3-4 random resolutions
      const shuffledResolutions = [...mockResolutions].sort(() => 0.5 - Math.random());
      const selectedResolutions = shuffledResolutions.slice(0, Math.floor(Math.random() * 2) + 3);
      
      // Generate analysis result with our randomized mock data
      const result: AnalysisResult = {
        type: randomDisputeType,
        relevantClauses: selectedClauses,
        legalPrecedents: selectedPrecedents,
        resolutionOptions: selectedResolutions,
      };
      
      resolve(result);
    }, 2000);
  });
};
