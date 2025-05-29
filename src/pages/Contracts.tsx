
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, ArrowUpDown, Wand2 } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleContracts } from "@/lib/contracts";
import { Input } from "@/components/ui/input";
import TextToContractModule from "@/components/ai/TextToContractModule";

const statusColors = {
  Draft: "bg-gray-200 text-gray-800",
  "Under Review": "bg-blue-100 text-blue-800",
  Negotiating: "bg-yellow-100 text-yellow-800",
  Signed: "bg-green-100 text-green-800",
  Expired: "bg-red-100 text-red-800",
};

const Contracts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContracts, setFilteredContracts] = useState(sampleContracts);
  const [activeTab, setActiveTab] = useState("contracts");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === "") {
      setFilteredContracts(sampleContracts);
    } else {
      const filtered = sampleContracts.filter(
        contract => 
          contract.title.toLowerCase().includes(term) ||
          contract.parties.clientName.toLowerCase().includes(term) ||
          contract.parties.contractorName.toLowerCase().includes(term)
      );
      setFilteredContracts(filtered);
    }
  };

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Contract Management</h2>
              <p className="text-gray-600 mt-1">Create, manage, and track your construction contracts</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/contracts/generate">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Contract
                </Button>
              </Link>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="contracts">All Contracts</TabsTrigger>
              <TabsTrigger value="ai-generator">Text to Contract</TabsTrigger>
            </TabsList>

            <TabsContent value="contracts">
              <Card className="mb-8">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        className="pl-10"
                        placeholder="Search contracts, clients, or contractors..."
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <ArrowUpDown className="h-4 w-4" />
                        Sort
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6">
                {filteredContracts.length > 0 ? (
                  filteredContracts.map((contract) => (
                    <Link to={`/contracts/${contract.id}`} key={contract.id}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{contract.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {contract.parties.clientName} • {contract.parties.contractorName}
                              </p>
                            </div>
                            <Badge className={`mt-2 md:mt-0 ${statusColors[contract.status]}`}>
                              {contract.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-xs font-medium text-gray-500">CONTRACT VALUE</p>
                              <p className="text-sm font-semibold mt-1">
                                {formatCurrency(contract.value, contract.currency)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500">TEMPLATE</p>
                              <p className="text-sm font-semibold mt-1">
                                {contract.templateId}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500">CREATED</p>
                              <p className="text-sm font-semibold mt-1">
                                {new Date(contract.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500">UPDATED</p>
                              <p className="text-sm font-semibold mt-1">
                                {new Date(contract.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <Card className="p-12 text-center">
                    <p className="text-gray-500 mb-4">No contracts found matching your search criteria.</p>
                    <Link to="/contracts/generate">
                      <Button>Create New Contract</Button>
                    </Link>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ai-generator">
              <TextToContractModule />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Contracts;
