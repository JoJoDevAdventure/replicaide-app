import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const agents = [
  { name: "VoiceAide : John", calls: 32, minutes: 6, credits: "2,679" },
  { name: "SkyAgent", calls: 30, minutes: 67, credits: "36,638" },
  { name: "AutoAide", calls: 29, minutes: 42, credits: "18,920" },
  { name: "RestaurantAgent", calls: 13, minutes: 13, credits: "5,899" },
];

export default function AgentsList() {
  return (
    <div className="mt-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Most called agents</h2>
        <Button variant="outline" size="sm">See all 13 agents</Button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent, index) => (
          <Card key={index} className="p-4 border rounded-lg">
            <CardContent className="space-y-2">
              <h3 className="text-md font-bold">{agent.name}</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Number of calls</span>
                <span className="font-bold text-black">{agent.calls}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Call minutes</span>
                <span className="font-bold text-black">{agent.minutes}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Credits spent</span>
                <span className="font-bold text-black">{agent.credits}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}