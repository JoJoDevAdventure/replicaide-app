"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";

export default function AgentTab({ agent, onChange }) {
  return (
    <div>
      {/* Agent Language Selection */}
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <label className="text-sm font-medium">Agent Language</label>
        <p className="text-sm text-gray-500 mb-2">Choose the default language the agent will communicate in.</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              {agent?.conversation_config?.agent?.language || "Select a language"} <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onChange("conversation_config.agent.language", "English")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChange("conversation_config.agent.language", "Spanish")}>
              Spanish
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChange("conversation_config.agent.language", "French")}>
              French
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Additional Languages */}
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <label className="text-sm font-medium">Additional Languages</label>
        <p className="text-sm text-gray-500 mb-2">
          Specify additional languages that the caller will be able to choose from.
        </p>
        <Input placeholder="Add additional languages" />
      </div>

      {/* First Message */}
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <label className="text-sm font-medium">First message</label>
        <p className="text-sm text-gray-500 mb-2">
          The first message the agent will say. If empty, the agent will wait for the user to start the conversation.
        </p>
        <Input
          value={agent?.conversation_config?.agent?.first_message || ""}
          onChange={(e) => onChange("conversation_config.agent.first_message", e.target.value)}
          placeholder="Hey! I'm your AI assistant!"
        />
      </div>

      {/* System Prompt */}
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <label className="text-sm font-medium">System prompt</label>
        <p className="text-sm text-gray-500 mb-2">
          The system prompt is used to determine the persona of the agent and the context of the conversation.
        </p>
        <Input
          value={agent?.conversation_config?.agent?.system_prompt || ""}
          onChange={(e) => onChange("conversation_config.agent.system_prompt", e.target.value)}
          placeholder="Define the agent's persona here..."
        />
      </div>
    </div>
  );
}