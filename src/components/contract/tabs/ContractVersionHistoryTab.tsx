
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VersionHistoryTabProps {
  versions: {
    id: string;
    createdAt: string;
    createdBy: string;
    changes: string;
  }[];
}

const ContractVersionHistoryTab = ({ versions }: VersionHistoryTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Version History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {versions.map((version, index) => (
              <div key={version.id} className="relative pl-10">
                <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(version.createdAt).toLocaleString()}
                  </p>
                  <p className="font-medium mt-1">
                    Version {versions.length - index}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {version.changes}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    By {version.createdBy}
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      View This Version
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractVersionHistoryTab;
