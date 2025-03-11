
import { Link } from "react-router-dom";
import { ChevronLeft, Download, Share2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ContractHeaderProps {
  title: string;
  status: string;
  clientName: string;
  contractorName: string;
}

const ContractHeader = ({ title, status, clientName, contractorName }: ContractHeaderProps) => {
  return (
    <>
      <div className="mb-6">
        <Link to="/contracts" className="text-sm text-gray-600 flex items-center hover:text-gray-900">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Contracts
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            <Badge className={cn(
              "ml-2",
              status === "Draft" ? "bg-gray-200 text-gray-800" :
              status === "Under Review" ? "bg-blue-100 text-blue-800" :
              status === "Negotiating" ? "bg-yellow-100 text-yellow-800" :
              status === "Signed" ? "bg-green-100 text-green-800" :
              "bg-red-100 text-red-800"
            )}>
              {status}
            </Badge>
          </div>
          <p className="text-gray-600 mt-1">
            {clientName} • {contractorName}
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button size="sm" className="gap-2">
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ContractHeader;
