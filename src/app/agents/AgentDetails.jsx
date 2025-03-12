"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Mic, MoreVertical } from "lucide-react";
import { useState } from "react";
import AgentTab from "./AgentTab";
import SecurityTab from "./SecurityTab";
import VoiceTab from "./VoiceTab";

export default function AgentDetails({ initialAgent }) {
  const [agent, setAgent] = useState(initialAgent);

  // Handle property updates dynamically
  const handleChange = (path, value) => {
    setAgent((prev) => {
      const newAgent = { ...prev };
      const keys = path.split(".");
      let obj = newAgent;

      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return { ...newAgent };
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">

              {/* Agent Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">{agent.name}</h2>
          <p className="text-gray-500 text-sm">{agent.agent_id}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline"><Mic className="h-4 w-4 mr-2" /> Test AI agent</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost"><MoreVertical className="h-5 w-5 text-gray-500" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Agent</DropdownMenuItem>
              <DropdownMenuItem>Delete Agent</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>


      <Tabs defaultValue="agent">
        <TabsList>
          <TabsTrigger value="agent">Agent</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Voice</TabsTrigger>
          <TabsTrigger value="widget">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="agent"><AgentTab agent={agent} onChange={handleChange} /></TabsContent>
        <TabsContent value="voice"><VoiceTab agent={agent} onChange={handleChange} /></TabsContent>
        <TabsContent value="security"><SecurityTab agent={agent} onChange={handleChange} /></TabsContent>
        <TabsContent value="advanced"> <p>Coming soon!</p> </TabsContent>
        <TabsContent value="widget"><p>Coming soon!</p></TabsContent>
      </Tabs>
    </div>
  );
}