
import { SOPFormData } from "../types/contractTypes";

interface SOPClaimRendererProps {
  sopFormData: SOPFormData | null;
}

const SOPClaimRenderer: React.FC<SOPClaimRendererProps> = ({ sopFormData }) => {
  if (!sopFormData) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="text-center py-8 text-gray-500">
          <p>No contract data available to populate SOP form.</p>
          <p className="text-sm mt-1">Generate a contract first to see the mapped SOP form.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="space-y-6 font-mono text-sm">
        <div className="text-lg font-bold mb-4">Payment Claim</div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>Payment claim reference number: {sopFormData.paymentClaimReferenceNumber || '________________'}</div>
          <div>Payment claim date: {sopFormData.paymentClaimDate || '________________'}</div>
        </div>

        <div className="border border-gray-400 p-4 space-y-2">
          <div className="font-semibold">To: {sopFormData.respondentName || '(Respondent\'s name or registered company / organisation name)'}</div>
          <div className="grid grid-cols-2 gap-4">
            <div>Service address: {sopFormData.respondentAddress}</div>
            <div className="space-y-1">
              <div>Tel: {sopFormData.respondentPhone}</div>
              <div>Fax: {sopFormData.respondentFax}</div>
              <div>Email: {sopFormData.respondentEmail}</div>
            </div>
          </div>
          <div>Person-in-charge (Respondent): {sopFormData.respondentPersonInCharge || '(Name of authorised representative, designation, contact details)'}</div>
        </div>

        <div className="border border-gray-400 p-4 space-y-2">
          <div className="font-semibold">From: {sopFormData.claimantName || '(Claimant\'s name or registered company / organisation name)'}</div>
          <div className="grid grid-cols-2 gap-4">
            <div>Service address: {sopFormData.claimantAddress}</div>
            <div className="space-y-1">
              <div>Tel: {sopFormData.claimantPhone}</div>
              <div>Fax: {sopFormData.claimantFax}</div>
              <div>Email: {sopFormData.claimantEmail}</div>
            </div>
          </div>
          <div>Person-in-charge (Claimant): {sopFormData.claimantPersonInCharge || '(Name of authorised representative, designation, contact details)'}</div>
        </div>

        <div className="border border-gray-400 p-4 space-y-2">
          <div className="font-bold">Particulars of Contract</div>
          <div>Project title: {sopFormData.projectTitle}</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div>Contract identification:</div>
              <div className="text-xs">{sopFormData.contractIdentification}</div>
              <div className="text-xs">Contract number: {sopFormData.contractNumber}</div>
              <div className="text-xs">Date contract made: {sopFormData.contractDate}</div>
            </div>
            <div>
              <div>Reference period of this claim:</div>
              <div>From {sopFormData.referencePeriodFrom} to {sopFormData.referencePeriodTo}</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-bold">Amount of Payment Claim</div>
          <div className="border border-gray-400">
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b border-gray-400">
                  <td className="p-2">Work carried out by Contractor</td>
                  <td className="p-2 text-right">${sopFormData.workCarriedOut}</td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="p-2">Unfixed goods & materials</td>
                  <td className="p-2 text-right">${sopFormData.unfixedGoods}</td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="p-2">Nominated sub-contractor, suppliers or designated PC work</td>
                  <td className="p-2 text-right">{sopFormData.nominatedSubcontractor}</td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="p-2">Unfixed goods & materials of nominated sub-contractor, suppliers</td>
                  <td className="p-2 text-right">{sopFormData.unfixedGoodsNominated}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="border border-gray-400">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-400">
                  <td className="p-2 font-semibold">Total amount claimed</td>
                  <td className="p-2 text-right">${sopFormData.totalAmount}</td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="p-2 font-semibold">Less amount previously paid</td>
                  <td className="p-2 text-right">${sopFormData.lessAmountPaid}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">Payment claim amount</td>
                  <td className="p-2 text-right font-bold">${sopFormData.claimAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div>Claim amount in words: {sopFormData.claimAmountWords}</div>
          <div>Name of claimant / authorised representative: _________________________________</div>
          <div>Authorised signature & Organisation stamp (if applicable): _________________________________</div>
          <div>Date: _________________ (DD/MM/YY)</div>
        </div>

        <div className="text-xs italic">
          * Inputs are mandatory under the Building and Construction Industry Security of Payment Act.
        </div>
      </div>
    </div>
  );
};

export default SOPClaimRenderer;
