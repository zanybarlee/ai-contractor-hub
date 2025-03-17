
import { useState } from "react";
import { Calendar, Clock, Filter, Download, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockTimelineEvents } from "@/lib/forensicsData";

const TimelineGenerator = () => {
  const [project, setProject] = useState("");
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateTimeline = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setTimelineEvents(mockTimelineEvents);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Timeline Generation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Extract event dates from project documentation and generate visual timelines for delay analysis.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project-a">Project Alpha</SelectItem>
                  <SelectItem value="project-b">Project Beta</SelectItem>
                  <SelectItem value="project-c">Project Gamma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button 
                className="gap-2"
                onClick={handleGenerateTimeline} 
                disabled={!project || isGenerating}
              >
                <Zap className="h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Timeline"}
              </Button>
              
              <Button variant="outline" className="gap-2" disabled={timelineEvents.length === 0}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Timeline Display */}
      {timelineEvents.length > 0 && (
        <div className="relative">
          {/* Timeline bar */}
          <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200"></div>
          
          {/* Timeline events */}
          <div className="space-y-6 pt-4">
            {timelineEvents.map((event) => (
              <div key={event.id} className="relative pl-10">
                {/* Timeline dot */}
                <div className={`absolute left-0 top-1.5 h-8 w-8 rounded-full flex items-center justify-center ${
                  event.category === 'delay' ? 'bg-red-100' : 
                  event.category === 'approval' ? 'bg-green-100' : 
                  event.category === 'change' ? 'bg-amber-100' : 'bg-blue-100'
                }`}>
                  {event.category === 'delay' ? (
                    <Clock className={`h-4 w-4 text-red-600`} />
                  ) : (
                    <Calendar className={`h-4 w-4 ${
                      event.category === 'approval' ? 'text-green-600' : 
                      event.category === 'change' ? 'text-amber-600' : 'text-blue-600'
                    }`} />
                  )}
                </div>
                
                {/* Event card */}
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{event.title}</h4>
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant={
                        event.category === 'delay' ? 'destructive' : 
                        event.category === 'approval' ? 'default' : 
                        event.category === 'change' ? 'outline' : 'secondary'
                      }>
                        {event.category}
                      </Badge>
                      <Badge variant="outline">{event.documentRef}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineGenerator;
