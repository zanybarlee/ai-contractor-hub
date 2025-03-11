
/**
 * Generate risk monitoring data for a contract
 */
export const generateRiskMonitoringData = (contractId: string) => {
  return {
    contractId,
    riskScore: 75,
    complianceScore: 85,
    alerts: [
      {
        id: '1',
        type: 'risk' as const,
        severity: 'high' as const,
        message: 'Liquidated damages clause exceeds industry standard by 25%. High risk of dispute.',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        type: 'compliance' as const,
        severity: 'medium' as const,
        message: 'Recent updates to local building codes affect Section 3.2. Review required.',
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        type: 'dispute' as const,
        severity: 'low' as const,
        message: 'AI analysis predicts 15% chance of payment dispute based on similar projects.',
        timestamp: new Date().toISOString(),
      },
    ],
  };
};
