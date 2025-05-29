
export const formatContractText = (text: string) => {
  const paragraphs = text.split('\n\n');
  
  return paragraphs.map((paragraph, index) => {
    const trimmedParagraph = paragraph.trim();
    if (!trimmedParagraph) return null;

    const isHeading = /^(\d+\.|\d+\.\d+\.|\b[A-Z][A-Z\s]+\b:|\b(ARTICLE|SECTION|CLAUSE)\b)/i.test(trimmedParagraph);
    const isSubHeading = /^[a-z]\)|\([a-z]\)|\d+\.\d+/i.test(trimmedParagraph);
    const isBulletPoint = /^[-•*]\s/.test(trimmedParagraph);
    const isNumberedList = /^\d+\.\s/.test(trimmedParagraph);

    if (isHeading) {
      return (
        <h3 key={index} className="text-lg font-bold text-gray-900 mt-6 mb-3 border-b border-gray-200 pb-2">
          {trimmedParagraph}
        </h3>
      );
    }

    if (isSubHeading) {
      return (
        <h4 key={index} className="text-md font-semibold text-gray-800 mt-4 mb-2">
          {trimmedParagraph}
        </h4>
      );
    }

    if (isBulletPoint || isNumberedList) {
      return (
        <div key={index} className="ml-4 mb-2">
          <p className="text-gray-700 leading-relaxed">{trimmedParagraph}</p>
        </div>
      );
    }

    return (
      <p key={index} className="text-gray-700 leading-relaxed mb-4 text-justify">
        {trimmedParagraph}
      </p>
    );
  }).filter(Boolean);
};
