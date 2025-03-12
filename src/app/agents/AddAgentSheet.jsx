"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AudioWaveformIcon, Plus } from "lucide-react";
import { useState } from "react";

export default function AddAgentSheet({ onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [agentType, setAgentType] = useState("ElevenLabs");
  const [agentName, setAgentName] = useState("");
  const [firstMessage, setFirstMessage] = useState("");
  const [agentPrompt, setAgentPrompt] = useState("");
  const [agentLanguage, setAgentLanguage] = useState("English");
  const [voice, setVoice] = useState("Mike");

  const handleSave = () => {
    const newAgent = {
      agent_id: String(Date.now()), // Generate a unique ID
      name: agentName,
      conversation_config: {
        agent: {
          first_message: firstMessage,
          prompt: agentPrompt,
          language: "English",
        },
        tts: {
          voice_id: voice,
        },
      },
    };

    onSave(newAgent);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="bg-orange-400 hover:bg-orange-800 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Add Agent
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        <SheetHeader>
          <SheetTitle>Add New Agent</SheetTitle>
        </SheetHeader>

        {/* Agent Type */}
        <div className="mt-4">
          <label className="text-sm font-medium">Agent Provider</label>
          <DropdownMenu className="w-full">
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                {agentType}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-full"} align="start">
              <DropdownMenuItem
                className={"w-full"}
                onClick={() => setAgentType("ElevenLabs")}
              >
                <div className="pr-6 flex w-full gap-2 items-center">
                  <img
                    src="https://11labs-nonprd-15f22c1d.s3.eu-west-3.amazonaws.com/a2ea339b-8b5e-41bb-b706-24eda8a4c9e3/elevenlabs-symbol.svg"
                    alt=""
                    className="w-4 h-4"
                  />
                  <p>Eleven Labs</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAgentType("OpenAI")}>
                <div className="pr-6 flex w-full gap-2 items-center">
                  <img
                    src="https://static-00.iconduck.com/assets.00/openai-icon-2021x2048-4rpe5x7n.png"
                    alt=""
                    className="w-4 h-4"
                  />
                  <p>OpenAI</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAgentType("Flow")}>
                <div className="pr-6 flex w-full gap-2 items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/1a/SM-Icon-Dark_Cyan1000.png"
                    alt=""
                    className="w-4 h-4"
                  />
                  <p>Flow</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

                {/* Agent Language */}
        <div className="mt-4">
          <label className="text-sm font-medium">Agent Language</label>
          <DropdownMenu className="w-full">
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                {agentLanguage}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-full"} align="start">
              <DropdownMenuItem
                className={"w-full"}
                onClick={() => setAgentLanguage("English")}
              >
                <div className="pr-6 flex w-full gap-2 items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/255px-Flag_of_the_United_States_%28Pantone%29.svg.png"
                    alt=""
                    className="w-6 h-4"
                  />
                  <p>English</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAgentLanguage("Spanish")}>
                <div className="pr-6 flex w-full gap-2 items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg"
                    alt=""
                    className="w-6 h-4"
                  />
                  <p>Spanish</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAgentLanguage("Thai")}>
                <div className="pr-6 flex w-full gap-2 items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg"
                    alt=""
                    className="w-6 h-4"
                  />
                  <p>Thai</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Agent Name */}
        <div className="mt-4">
          <label className="text-sm font-medium">Agent Name</label>
          <Input
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Enter agent name"
          />
        </div>

        {/* First Message */}
        <div className="mt-4">
          <label className="text-sm font-medium">First Message</label>
          <Input
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            placeholder="Enter first message"
          />
        </div>

        {/* Agent Prompt */}
        <div className="mt-4">
          <label className="text-sm font-medium">Agent Prompt</label>
          <Input
            value={agentPrompt}
            onChange={(e) => setAgentPrompt(e.target.value)}
            placeholder="Define the agent's persona"
          />
        </div>

        {/* Voice Selection */}
        <div className="mt-4">
          <label className="text-sm font-medium">Voice</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full flex justify-start">
              <AudioWaveformIcon /> {voice}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setVoice("Mike")}>
              <AudioWaveformIcon /> Mike
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVoice("Emma")}>
              <AudioWaveformIcon/> Emma
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-700"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}