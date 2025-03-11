
import { Percent } from "lucide-react";

interface SimilarityScoreIndicatorProps {
  similarity: number;
}

const SimilarityScoreIndicator = ({ similarity }: SimilarityScoreIndicatorProps) => {
  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 0.8) return "text-green-600";
    if (similarity >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
      <div className="flex items-center gap-2">
        <Percent className="h-5 w-5" />
        <span className="font-medium">Similarity Score:</span>
      </div>
      <span className={`text-lg font-bold ${getSimilarityColor(similarity)}`}>
        {Math.round(similarity * 100)}%
      </span>
    </div>
  );
};

export default SimilarityScoreIndicator;
