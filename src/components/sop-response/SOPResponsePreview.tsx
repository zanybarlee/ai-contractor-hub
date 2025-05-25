
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SOPResponsePreviewProps {
  data: any;
}

const SOPResponsePreview: React.FC<SOPResponsePreviewProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SG', { 
      style: 'currency', 
      currency: 'SGD',
      minimumFractionDigits: 2 
    }).format(amount || 0);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Payment Response Preview</CardTitle>
          <CardDescription>
            Review your SOP Act payment response before generating the final document
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center border-b pb-4">
              <h1 className="text-2xl font-bold">PAYMENT RESPONSE</h1>
              <p className="text-sm text-gray-600 mt-2">
                Building and Construction Industry Security of Payment Act
              </p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <strong>Payment response reference number:</strong>
                <p>{data.responseReferenceNumber || 'Not specified'}</p>
              </div>
              <div>
                <strong>Payment response date:</strong>
                <p>{formatDate(data.responseDate)}</p>
              </div>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-8">
              <div className="border p-4">
                <h3 className="font-bold mb-2">To: (Claimant)</h3>
                <p><strong>{data.claimantName}</strong></p>
                <p className="text-sm mt-2">Service address:</p>
                <p className="text-sm">{data.claimantAddress}</p>
                <div className="grid grid-cols-3 gap-2 text-sm mt-2">
                  <div>Tel: {data.claimantPhone}</div>
                  <div>Fax: {data.claimantFax}</div>
                  <div>Email: {data.claimantEmail}</div>
                </div>
                <p className="text-sm mt-2">
                  <strong>Person-in-charge:</strong> {data.claimantPersonInCharge}
                </p>
              </div>

              <div className="border p-4">
                <h3 className="font-bold mb-2">From: (Respondent)</h3>
                <p><strong>{data.respondentName}</strong></p>
                <p className="text-sm mt-2">Service address:</p>
                <p className="text-sm">{data.respondentAddress}</p>
                <div className="grid grid-cols-3 gap-2 text-sm mt-2">
                  <div>Tel: {data.respondentPhone}</div>
                  <div>Fax: {data.respondentFax}</div>
                  <div>Email: {data.respondentEmail}</div>
                </div>
                <p className="text-sm mt-2">
                  <strong>Person-in-charge:</strong> {data.respondentPersonInCharge}
                </p>
              </div>
            </div>

            {/* Contract Details */}
            <div className="border p-4">
              <h3 className="font-bold mb-2">Particulars of Contract</h3>
              <p><strong>Project title:</strong> {data.projectTitle}</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p><strong>Contract identification:</strong></p>
                  <p className="text-sm">{data.contractIdentification}</p>
                </div>
                <div>
                  <p><strong>Reference period of claim:</strong></p>
                  <p className="text-sm">From {formatDate(data.referencePeriodFrom)} to {formatDate(data.referencePeriodTo)}</p>
                </div>
              </div>
            </div>

            {/* Payment Claim Identification */}
            <div className="border p-4">
              <h3 className="font-bold mb-2">Payment Claim Identification</h3>
              <p><strong>Payment claim reference number:</strong> {data.paymentClaimReference}</p>
              <p><strong>Payment claim date:</strong> {formatDate(data.paymentClaimDate)}</p>
              <p><strong>Claim amount:</strong> {formatCurrency(data.claimAmount)}</p>
            </div>

            {/* Response Summary */}
            <div className="border p-4">
              <h3 className="font-bold mb-4">Response Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal for response amount</span>
                  <span>{formatCurrency(data.subtotalResponseAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount withheld</span>
                  <span>{formatCurrency(data.amountWithheld)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal for amount withheld</span>
                  <span>{formatCurrency(data.subtotalAmountWithheld)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Less amount previously paid</span>
                  <span>{formatCurrency(data.lessAmountPreviouslyPaid)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold text-lg">
                  <span>Total response amount (payable)</span>
                  <span>{formatCurrency(data.totalResponseAmount)}</span>
                </div>
              </div>
            </div>

            {/* Response Items Count */}
            {data.responseItems && data.responseItems.length > 0 && (
              <div className="border p-4">
                <h3 className="font-bold mb-2">Response Items</h3>
                <p>{data.responseItems.length} item(s) detailed in the response</p>
              </div>
            )}

            {/* Particulars Count */}
            {data.particulars && data.particulars.length > 0 && (
              <div className="border p-4">
                <h3 className="font-bold mb-2">Response Particulars</h3>
                <p>{data.particulars.length} particular(s) with detailed allocations</p>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-sm text-gray-600 border-t pt-4">
              <p>* Inputs are mandatory under the Building and Construction Industry Security of Payment Act.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPResponsePreview;
