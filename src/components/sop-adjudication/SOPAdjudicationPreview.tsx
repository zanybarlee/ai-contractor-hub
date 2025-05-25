
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SOPAdjudicationPreviewProps {
  data: any;
}

const SOPAdjudicationPreview: React.FC<SOPAdjudicationPreviewProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Preview: Notice of Intention to Apply for Adjudication
            <Badge variant="outline">Page 1 of 2</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">SAMPLE 4: NOTICE OF INTENTION TO APPLY FOR ADJUDICATION</h2>
            <p className="text-sm"><strong>Date of notice:</strong> {formatDate(data.noticeDate)}</p>
          </div>

          <div className="border border-gray-300 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">To: <span className="font-normal">{data.respondentName}</span></p>
                <div className="mt-2">
                  <p className="text-sm font-medium">Service address:</p>
                  <p className="text-sm">{data.respondentAddress}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Tel:</strong> {data.respondentPhone}</p>
                <p><strong>Fax:</strong> {data.respondentFax}</p>
                <p><strong>Email:</strong> {data.respondentEmail}</p>
              </div>
            </div>
            <p className="text-sm">
              <strong>Person-in-charge (Respondent):</strong> {data.respondentPersonInCharge}
            </p>
          </div>

          <div className="border border-gray-300 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">From: <span className="font-normal">{data.claimantName}</span></p>
                <div className="mt-2">
                  <p className="text-sm font-medium">Service address:</p>
                  <p className="text-sm">{data.claimantAddress}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Tel:</strong> {data.claimantPhone}</p>
                <p><strong>Fax:</strong> {data.claimantFax}</p>
                <p><strong>Email:</strong> {data.claimantEmail}</p>
              </div>
            </div>
            <p className="text-sm">
              <strong>Person-in-charge (Claimant):</strong> {data.claimantPersonInCharge}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">Particulars of Contract</h3>
            <div className="space-y-2">
              <div className="border border-gray-300 p-2">
                <p className="text-sm">Project title or reference (or a brief description of the project):</p>
                <p className="font-medium">{data.projectTitle}</p>
              </div>
              <div className="border border-gray-300 p-2">
                <p className="text-sm">Contract number (or a brief description of the contract):</p>
                <p className="font-medium">{data.contractNumber}</p>
              </div>
              <div className="border border-gray-300 p-2">
                <p className="text-sm">Date contract made: {formatDate(data.contractDate)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">Payment Claim and Payment Response</h3>
            <div className="space-y-2">
              <div className="border border-gray-300 p-2">
                <p className="text-sm">Payment claim reference number:</p>
                <p className="font-medium">{data.paymentClaimReference}</p>
              </div>
              <div className="border border-gray-300 p-2 flex items-center">
                <p className="text-sm">Payment claim amount:</p>
                <span className="ml-auto font-medium">{formatCurrency(data.paymentClaimAmount)}</span>
              </div>
              <div className="border border-gray-300 p-2">
                <p className="text-sm">Payment response reference number:</p>
                <p className="font-medium">{data.paymentResponseReference}</p>
              </div>
              <div className="border border-gray-300 p-2 flex items-center">
                <p className="text-sm">Payment response amount:</p>
                <span className="ml-auto font-medium">{formatCurrency(data.paymentResponseAmount)}</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p>Name of claimant / authorised representative: {data.claimantAuthorisedRepresentative}</p>
              <p>Authorised signature &</p>
              <p>Organisation stamp (if applicable): {data.organisationStamp}</p>
              <p>Date: {formatDate(data.signatureDate)}</p>
            </div>
          </div>

          <div className="text-xs text-center italic">
            * Inputs are mandatory under the Building and Construction Industry Security of Payment Act.
          </div>

          <div className="text-center text-sm">
            <p>Notice of intention: Page 1 of 2</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Dispute Details
            <Badge variant="outline">Page 2 of 2</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold">Dispute Details</h3>
            <div className="border border-gray-300 p-4">
              <p className="font-medium mb-3">Dispute: <span className="text-sm">(Tick where appropriate ✓)</span></p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">{data.disputeType === "Payment response disputed" ? "✓" : "•"}</span>
                  <span>Payment response disputed (applicable to construction contracts only)</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{data.disputeType === "No payment response" ? "✓" : "•"}</span>
                  <span>No payment response (applicable to construction contracts only)</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{data.disputeType === "Paid amount disputed" ? "✓" : "•"}</span>
                  <span>Paid amount disputed (including nil payment by the payment due date)</span>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-300 p-4">
              <p className="text-sm font-medium mb-2">Brief description of dispute:</p>
              <div className="min-h-[200px] p-2 bg-gray-50 border border-gray-200 rounded">
                <p className="text-sm whitespace-pre-wrap">{data.disputeDescription}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              The claimant hereby intends to apply for adjudication on the reference payment claim under the Building and Construction Industry Security of Payment Act.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p>Name of claimant / authorised representative: {data.claimantAuthorisedRepresentative}</p>
              <p>Authorised signature &</p>
              <p>Organisation stamp (if applicable): {data.organisationStamp}</p>
              <p>Date: {formatDate(data.signatureDate)}</p>
            </div>
          </div>

          <div className="text-xs text-center italic">
            * Inputs are mandatory under the Building and Construction Industry Security of Payment Act.
          </div>

          <div className="text-center text-sm">
            <p>Notice of intention: Page 2 of 2</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPAdjudicationPreview;
