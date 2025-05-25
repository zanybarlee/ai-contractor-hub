
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SOPFormData {
  // Basic contract details
  contractDate: string;
  projectTitle: string;
  siteLocation: string;
  contractPrice: string;
  completionDate: string;
  
  // Contracting parties
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientFax: string;
  clientEmail: string;
  
  contractorName: string;
  contractorAddress: string;
  contractorPhone: string;
  contractorFax: string;
  contractorEmail: string;
  
  // Payment terms
  paymentClaimFrequency: string;
  paymentResponseDays: string;
  paymentDays: string;
  
  // Additional terms
  additionalTerms: string;
}

interface SOPContractFormProps {
  formData: Partial<SOPFormData>;
  onFormChange: (field: keyof SOPFormData, value: string) => void;
}

const SOPContractForm: React.FC<SOPContractFormProps> = ({ formData, onFormChange }) => {
  const handleInputChange = (field: keyof SOPFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onFormChange(field, e.target.value);
  };

  const handleSelectChange = (field: keyof SOPFormData) => (value: string) => {
    onFormChange(field, value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Contract Information</CardTitle>
          <CardDescription>
            Essential details for the SOP Act compliant contract
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contractDate">Date of Contract</Label>
              <Input
                id="contractDate"
                type="date"
                value={formData.contractDate || ''}
                onChange={handleInputChange('contractDate')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="completionDate">Date for Completion</Label>
              <Input
                id="completionDate"
                type="date"
                value={formData.completionDate || ''}
                onChange={handleInputChange('completionDate')}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title / Description of Works</Label>
            <Input
              id="projectTitle"
              placeholder="e.g. Commercial Office Building Construction"
              value={formData.projectTitle || ''}
              onChange={handleInputChange('projectTitle')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="siteLocation">Site Location</Label>
            <Input
              id="siteLocation"
              placeholder="Include relevant site location, quantity or measurement details"
              value={formData.siteLocation || ''}
              onChange={handleInputChange('siteLocation')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contractPrice">Contract Price</Label>
            <Input
              id="contractPrice"
              placeholder="e.g. $500,000"
              value={formData.contractPrice || ''}
              onChange={handleInputChange('contractPrice')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contracting Parties</CardTitle>
          <CardDescription>
            Details of both contracting parties as required by SOP Act
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Client/Principal Details</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Name / Registered Company</Label>
                <Input
                  id="clientName"
                  value={formData.clientName || ''}
                  onChange={handleInputChange('clientName')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientAddress">Service Address</Label>
                <Textarea
                  id="clientAddress"
                  rows={2}
                  value={formData.clientAddress || ''}
                  onChange={handleInputChange('clientAddress')}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Telephone</Label>
                  <Input
                    id="clientPhone"
                    value={formData.clientPhone || ''}
                    onChange={handleInputChange('clientPhone')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientFax">Fax</Label>
                  <Input
                    id="clientFax"
                    value={formData.clientFax || ''}
                    onChange={handleInputChange('clientFax')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail || ''}
                    onChange={handleInputChange('clientEmail')}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Contractor Details</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contractorName">Name / Registered Company</Label>
                <Input
                  id="contractorName"
                  value={formData.contractorName || ''}
                  onChange={handleInputChange('contractorName')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractorAddress">Service Address</Label>
                <Textarea
                  id="contractorAddress"
                  rows={2}
                  value={formData.contractorAddress || ''}
                  onChange={handleInputChange('contractorAddress')}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contractorPhone">Telephone</Label>
                  <Input
                    id="contractorPhone"
                    value={formData.contractorPhone || ''}
                    onChange={handleInputChange('contractorPhone')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractorFax">Fax</Label>
                  <Input
                    id="contractorFax"
                    value={formData.contractorFax || ''}
                    onChange={handleInputChange('contractorFax')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractorEmail">Email</Label>
                  <Input
                    id="contractorEmail"
                    type="email"
                    value={formData.contractorEmail || ''}
                    onChange={handleInputChange('contractorEmail')}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Terms (SOP Act Compliance)</CardTitle>
          <CardDescription>
            Payment terms as required by the Building and Construction Industry Security of Payment Act
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paymentClaimFrequency">Date/Frequency for Serving Payment Claim</Label>
            <Select value={formData.paymentClaimFrequency || ''} onValueChange={handleSelectChange('paymentClaimFrequency')}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment claim frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly (last day of each month)</SelectItem>
                <SelectItem value="fortnightly">Fortnightly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="milestone">Milestone-based</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Note: If there is no contractual provision, the Act requires a payment claim to be served by the last day of each month (monthly interval).
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentResponseDays">Date for Serving Payment Response</Label>
            <Select value={formData.paymentResponseDays || ''} onValueChange={handleSelectChange('paymentResponseDays')}>
              <SelectTrigger>
                <SelectValue placeholder="Select response timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="14">14 days after payment claim</SelectItem>
                <SelectItem value="21">21 days after payment claim</SelectItem>
                <SelectItem value="28">28 days after payment claim</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Note: The Act stipulates a maximum of 21 days after a payment claim is served and if there is no contractual provision, the default period shall be 14 days.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentDays">Date for Payment</Label>
            <Select value={formData.paymentDays || ''} onValueChange={handleSelectChange('paymentDays')}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="14">14 days after payment response</SelectItem>
                <SelectItem value="21">21 days after payment response</SelectItem>
                <SelectItem value="28">28 days after payment response</SelectItem>
                <SelectItem value="35">35 days after payment response</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Note: The Act stipulates a maximum of 35 days after a payment response or tax invoice and if there is no contractual provision, the default period shall be 14 days.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="additionalTerms">Other Terms and Conditions</Label>
            <Textarea
              id="additionalTerms"
              rows={4}
              placeholder="Enter any additional terms and conditions..."
              value={formData.additionalTerms || ''}
              onChange={handleInputChange('additionalTerms')}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPContractForm;
