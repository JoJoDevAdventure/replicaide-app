import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Clock, MessageCircle } from "lucide-react";

const callHistory = [
  { time: "Yesterday, 11:00 PM", agent: "SkyAgent", messages: 4, duration: "0:15", status: "Success" },
  { time: "Yesterday, 9:46 PM", agent: "VoiceAide : Luna", messages: 1, duration: "0:02", status: "Success" },
  { time: "Yesterday, 9:42 PM", agent: "VoiceAide : Mike", messages: 3, duration: "0:17", status: "Success" },
  { time: "Yesterday, 9:42 PM", agent: "VoiceAide : John", messages: 3, duration: "0:28", status: "Success" },
  { time: "Yesterday, 9:41 PM", agent: "VoiceAide : Leo", messages: 1, duration: "0:11", status: "Success" },
  { time: "Yesterday, 9:41 PM", agent: "VoiceAide : John", messages: 3, duration: "0:19", status: "Success" },
  { time: "Yesterday, 6:57 PM", agent: "VoiceAide : Mike", messages: 3, duration: "0:25", status: "Success" },
  { time: "Yesterday, 6:57 PM", agent: "VoiceAide : Sophia", messages: 3, duration: "0:13", status: "Success" },
];

export default function CallHistory() {
  return (
    <div className="mt-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Conversation History</h2>
        <div className="flex space-x-2">
          {/* All results dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">All results ▼</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All results</DropdownMenuItem>
              <DropdownMenuItem>Successful calls</DropdownMenuItem>
              <DropdownMenuItem>Failed calls</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Call History List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Chat Timestamps */}
        <div className="space-y-4">
          {callHistory.map((call, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <MessageCircle className="h-5 w-5 text-gray-500" />
              </div>
              <span className="text-sm text-gray-700">{call.time}</span>
            </div>
          ))}
        </div>

        {/* Right Column - Agent Details */}
        <div className="space-y-4">
          {callHistory.map((call, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
              {/* Agent Name */}
              <span className="text-sm font-medium">{call.agent}</span>

              {/* Call Duration */}
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{call.duration}</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}