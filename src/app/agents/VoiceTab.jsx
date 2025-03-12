"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export default function VoiceTab({ agent, onChange }) {
  return (
    <div>
      {/* Voice Selection */}
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <label className="text-sm font-medium">Voice</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Input
              value={agent?.conversation_config?.tts?.voice_id || ""}
              readOnly
              className="cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onChange("conversation_config.tts.voice_id", "Jamal")}>
              Jamal
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChange("conversation_config.tts.voice_id", "Emma")}>
              Emma
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Optimize Streaming Latency */}
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <label className="text-sm font-medium">Optimize streaming latency</label>
        <Slider
          value={[agent?.conversation_config?.tts?.optimize_streaming_latency ?? 0]}
          min={0}
          max={1}
          step={0.1}
          onValueChange={(val) => onChange("conversation_config.tts.optimize_streaming_latency", val[0])}
          className={"py-4"}
        />
      </div>

      {/* Stability */}
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <label className="text-sm font-medium">Stability</label>
        <Slider
          value={[agent?.conversation_config?.tts?.stability ?? 0]}
          min={0}
          max={1}
          step={0.1}
          onValueChange={(val) => onChange("conversation_config.tts.stability", val[0])}
          className={"py-4"}
        />
      </div>
    </div>
  );
}