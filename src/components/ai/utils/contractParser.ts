
import { SOPFormData } from "../types/contractTypes";

export const parseContractToSOPForm = (contractText: string): SOPFormData | null => {
  try {
    const formData: SOPFormData = {
      paymentClaimReferenceNumber: extractValue(contractText, /Payment Claim Reference Number[:\s]*([^\n]+)/i) || '',
      paymentClaimDate: extractValue(contractText, /Payment Claim Date[:\s]*([^\n]+)/i) || '',
      respondentName: extractValue(contractText, /To[:\s]*\*?\*?([^*\n]+)/i) || '',
      respondentAddress: extractValue(contractText, /Service Address[:\s]*([^\n]+)/i) || '',
      respondentPhone: extractValue(contractText, /Tel[:\s]*([^\n|]+)/i) || '',
      respondentFax: extractValue(contractText, /Fax[:\s]*([^\n|]+)/i) || '',
      respondentEmail: extractValue(contractText, /Email[:\s]*([^\n]+)/i) || '',
      respondentPersonInCharge: extractValue(contractText, /Person-in-charge[:\s]*([^\n]+)/i) || '',
      claimantName: extractValue(contractText, /From[:\s]*\*?\*?([^*\n]+)/i) || '',
      claimantAddress: extractAfterKeyword(contractText, 'From', 'Service Address') || '',
      claimantPhone: extractAfterKeyword(contractText, 'From', 'Tel') || '',
      claimantFax: extractAfterKeyword(contractText, 'From', 'Fax') || '',
      claimantEmail: extractAfterKeyword(contractText, 'From', 'Email') || '',
      claimantPersonInCharge: extractAfterKeyword(contractText, 'From', 'Person-in-charge') || '',
      projectTitle: extractValue(contractText, /Project Title[:\s]*([^\n]+)/i) || '',
      contractIdentification: extractValue(contractText, /Contract Title[\/\s]*Description[:\s]*([^\n]+)/i) || '',
      contractNumber: extractValue(contractText, /Contract Number[:\s]*([^\n]+)/i) || '',
      contractDate: extractValue(contractText, /Date Contract Made[:\s]*([^\n]+)/i) || '',
      referencePeriodFrom: extractValue(contractText, /From[:\s]*(\d{2}\/\d{2}\/\d{4})/i) || '',
      referencePeriodTo: extractValue(contractText, /to[:\s]*(\d{2}\/\d{2}\/\d{4})/i) || '',
      workCarriedOut: extractCurrencyAmount(contractText, /Work carried out by Contractor[:\s]*\$?([0-9,]+\.?\d*)/i) || '',
      unfixedGoods: extractCurrencyAmount(contractText, /Unfixed goods & materials[:\s]*\$?([0-9,]+\.?\d*)/i) || '',
      nominatedSubcontractor: extractCurrencyAmount(contractText, /Nominated sub-contractor[:\s]*\$?([0-9,]+\.?\d*)/i) || '-',
      unfixedGoodsNominated: extractCurrencyAmount(contractText, /Unfixed goods & materials of nominated[:\s]*\$?([0-9,]+\.?\d*)/i) || '-',
      totalAmount: extractCurrencyAmount(contractText, /Total[:\s]*\$?([0-9,]+\.?\d*)/i) || '',
      lessAmountPaid: extractCurrencyAmount(contractText, /Less amounts previously paid[:\s]*\$?([0-9,]+\.?\d*)/i) || '',
      claimAmount: extractCurrencyAmount(contractText, /CLAIM AMOUNT[:\s]*\*?\*?\$?([0-9,]+\.?\d*)/i) || '',
      claimAmountWords: extractValue(contractText, /Claim Amount in Words[:\s]*([^\n]+)/i) || ''
    };

    // If specific amounts aren't found, try to extract from contract value or price
    if (!formData.workCarriedOut && !formData.totalAmount) {
      const contractValue = extractCurrencyAmount(contractText, /contract (?:value|price|sum)[:\s]*\$?([0-9,]+\.?\d*)/i) ||
                           extractCurrencyAmount(contractText, /total contract amount[:\s]*\$?([0-9,]+\.?\d*)/i) ||
                           extractCurrencyAmount(contractText, /contract amount[:\s]*\$?([0-9,]+\.?\d*)/i);
      
      if (contractValue) {
        formData.workCarriedOut = contractValue;
        formData.totalAmount = contractValue;
        formData.claimAmount = contractValue;
      }
    }

    // Try to extract payment amounts from payment terms or milestone sections
    if (!formData.claimAmount && !formData.totalAmount) {
      const paymentAmount = extractCurrencyAmount(contractText, /payment[:\s]*\$?([0-9,]+\.?\d*)/i) ||
                           extractCurrencyAmount(contractText, /amount[:\s]*\$?([0-9,]+\.?\d*)/i) ||
                           extractCurrencyAmount(contractText, /\$([0-9,]+\.?\d*)/);
      
      if (paymentAmount) {
        formData.claimAmount = paymentAmount;
        formData.totalAmount = paymentAmount;
      }
    }

    return formData;
  } catch (error) {
    console.error('Error parsing contract to SOP form:', error);
    return null;
  }
};

const extractValue = (text: string, regex: RegExp): string | null => {
  const match = text.match(regex);
  return match ? match[1].trim().replace(/\*/g, '') : null;
};

const extractCurrencyAmount = (text: string, regex: RegExp): string => {
  const match = text.match(regex);
  if (!match) return '';
  
  let amount = match[1].trim().replace(/\*/g, '');
  
  // Remove any currency symbols and clean up
  amount = amount.replace(/[$,]/g, '');
  
  // Parse as number and format with commas
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) return '';
  
  return numericAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const extractAfterKeyword = (text: string, startKeyword: string, targetKeyword: string): string => {
  const startIndex = text.indexOf(startKeyword);
  if (startIndex === -1) return '';
  
  const fromSection = text.substring(startIndex);
  const match = fromSection.match(new RegExp(`${targetKeyword}[:\\s]*([^\\n|]+)`, 'i'));
  return match ? match[1].trim() : '';
};
