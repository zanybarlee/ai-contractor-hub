
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const claims = [
  { id: 'CLM-001', title: 'Schedule Delay - Foundation Work', amount: '$125,000', status: 'pending', documents: 15 },
  { id: 'CLM-002', title: 'Unforeseen Site Conditions', amount: '$87,500', status: 'under-review', documents: 23 },
  { id: 'CLM-003', title: 'Design Change - HVAC System', amount: '$42,300', status: 'approved', documents: 9 },
  { id: 'CLM-004', title: 'Material Price Increase', amount: '$18,750', status: 'rejected', documents: 7 },
  { id: 'CLM-005', title: 'Scope Change - Additional Parking', amount: '$215,000', status: 'pending', documents: 19 },
];

const ClaimsDisputes: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Claims & Disputes Repository</CardTitle>
          <CardDescription>
            Single location to gather supporting documents, correspondences, and references for claims.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="claims">
            <TabsList className="mb-4">
              <TabsTrigger value="claims">Active Claims</TabsTrigger>
              <TabsTrigger value="repository">Document Repository</TabsTrigger>
              <TabsTrigger value="create">Create New Claim</TabsTrigger>
            </TabsList>
            
            <TabsContent value="claims">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Documents</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.title}</TableCell>
                      <TableCell>{claim.amount}</TableCell>
                      <TableCell>
                        <Badge variant={
                          claim.status === 'approved' ? "secondary" : 
                          claim.status === 'rejected' ? "destructive" : 
                          claim.status === 'pending' ? "default" : 
                          "outline"
                        }>
                          {claim.status === 'under-review' ? 'Under Review' : 
                           claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{claim.documents} files</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="repository">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Search documents..." className="px-3 py-2 border rounded-md" />
                    <select className="px-3 py-2 border rounded-md">
                      <option>All Document Types</option>
                      <option>Correspondences</option>
                      <option>Contracts</option>
                      <option>Photos & Evidence</option>
                      <option>Cost Records</option>
                    </select>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Upload New</button>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-md text-center">
                  <p className="text-gray-500">Select a claim to view associated documents</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="create">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Claim Title</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Enter claim title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount Claimed</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="e.g. $50,000" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={4} className="w-full px-3 py-2 border rounded-md" placeholder="Describe the claim" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <p className="text-gray-500">Drag and drop files here or click to browse</p>
                    <button className="mt-2 px-4 py-2 bg-gray-100 rounded-md text-sm">Browse Files</button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-md">Cancel</button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Submit Claim</button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export { ClaimsDisputes };
