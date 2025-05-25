
import { FileText, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SOPClaimPreviewProps {
  data: any;
}

const SOPClaimPreview: React.FC<SOPClaimPreviewProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Payment Claim Preview
          </CardTitle>
          <CardDescription>
            Review your SOP Act compliant payment claim before generating
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header Section */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold mb-2">Sample 2: Payment claim</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Payment claim reference number:</strong> {data.claimReferenceNumber}
              </div>
              <div>
                <strong>Payment claim date:</strong> {formatDate(data.claimDate)}
              </div>
            </div>
          </div>

          {/* Parties Section */}
          <div className="space-y-4">
            <div className="border rounded p-4">
              <div className="font-medium mb-2">To: {data.respondentName}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div><strong>Service address:</strong></div>
                  <div>{data.respondentAddress}</div>
                </div>
                <div>
                  <div><strong>Tel:</strong> {data.respondentPhone}</div>
                  <div><strong>Fax:</strong> {data.respondentFax}</div>
                  <div><strong>Email:</strong> {data.respondentEmail}</div>
                </div>
              </div>
              <div className="mt-2">
                <strong>Person-in-charge (Respondent):</strong> {data.respondentPersonInCharge}
              </div>
            </div>

            <div className="border rounded p-4">
              <div className="font-medium mb-2">From: {data.claimantName}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div><strong>Service address:</strong></div>
                  <div>{data.claimantAddress}</div>
                </div>
                <div>
                  <div><strong>Tel:</strong> {data.claimantPhone}</div>
                  <div><strong>Fax:</strong> {data.claimantFax}</div>
                  <div><strong>Email:</strong> {data.claimantEmail}</div>
                </div>
              </div>
              <div className="mt-2">
                <strong>Person-in-charge (Claimant):</strong> {data.claimantPersonInCharge}
              </div>
            </div>
          </div>

          {/* Contract Particulars */}
          <div className="border rounded p-4">
            <h3 className="font-bold mb-2">Particulars of Contract</h3>
            <div><strong>Project title:</strong> {data.projectTitle}</div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div><strong>Contract identification:</strong> {data.contractIdentification}</div>
              <div><strong>Reference period of this claim:</strong> From {formatDate(data.referencePeriodFrom)} to {formatDate(data.referencePeriodTo)}</div>
            </div>
          </div>

          {/* Work Items */}
          {data.workItems && data.workItems.length > 0 && (
            <div>
              <h3 className="font-bold mb-4">Payment Claim Details</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description of Item / Variation reference no.</TableHead>
                    <TableHead>Total value of Item / variation ($)</TableHead>
                    <TableHead>Quantity / Quantum (e.g. % Completed / Delivered)</TableHead>
                    <TableHead>Amount claimed for item ($)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.workItems.map((item: any, index: number) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{formatCurrency(item.contractAmount)}</TableCell>
                      <TableCell>{item.workDonePercentage}%</TableCell>
                      <TableCell>{formatCurrency(item.amountClaimed)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Variations */}
          {data.variations && data.variations.length > 0 && (
            <div>
              <h3 className="font-bold mb-4">Particulars of Variations</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description of variation (including location)</TableHead>
                    <TableHead>Instruction reference no.</TableHead>
                    <TableHead>Total value of variation ($)</TableHead>
                    <TableHead>Variation completed (%)</TableHead>
                    <TableHead>Value = Total value x % ($)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.variations.map((variation: any, index: number) => (
                    <TableRow key={variation.id}>
                      <TableCell>{index + 1}. {variation.description}</TableCell>
                      <TableCell>{variation.instructionReference}</TableCell>
                      <TableCell>{formatCurrency(variation.totalValue)}</TableCell>
                      <TableCell>{variation.completedPercentage}%</TableCell>
                      <TableCell>{formatCurrency(variation.claimedValue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Summary */}
          <div className="border rounded p-4 bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total amount claimed</span>
                <span>{formatCurrency(data.totalAmountClaimed || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Less amount previously paid</span>
                <span>{formatCurrency(data.lessAmountPreviouslyPaid || 0)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>*Payment claim amount</span>
                <span>{formatCurrency(data.paymentClaimAmount || 0)}</span>
              </div>
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="text-sm text-gray-600">
            <div><strong>Supporting documents annexed:</strong> {data.supportingDocuments}</div>
            <div><strong>No. of pages of claim particulars:</strong> {data.numberOfPages}</div>
          </div>

          {/* Signature Section */}
          <div className="border rounded p-4 space-y-4">
            <div>Name of claimant / authorised representative: _______________________________</div>
            <div>Authorised signature & Organisation stamp (if applicable): _______________________________</div>
            <div>Date: _______________________________ (DD/MM/YY)</div>
          </div>

          <div className="text-xs text-gray-500 italic">
            * Inputs are mandatory under the Building and Construction Industry Security of Payment Act.
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline">
              Save as Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPClaimPreview;
