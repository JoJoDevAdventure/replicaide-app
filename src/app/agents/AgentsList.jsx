"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Clipboard, MessageCircle, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import AddAgentSheet from "./AddAgentSheet";

const initialAgents = [
    {
        agent_id: "12084234",
        name: "VoiceAide : Mike",
        conversation_config: {
          asr: {
            quality: "high",
            provider: "elevenlabs",
            user_input_audio_format: "pcm_8000",
            keywords: ["keywords"]
          },
          turn: {
            turn_timeout: 1.1,
            mode: "silence"
          },
          tts: {
            model_id: "eleven_turbo_v2",
            voice_id: "voice_id",
            agent_output_audio_format: "pcm_8000",
            optimize_streaming_latency: 1,
            stability: 1.1,
            speed: 1.1,
            similarity_boost: 1.1,
            pronunciation_dictionary_locators: [
              {
                pronunciation_dictionary_id: "pronunciation_dictionary_id",
                version_id: "version_id"
              }
            ]
          },
          conversation: {
            max_duration_seconds: 1,
            client_events: ["conversation_initiation_metadata"]
          },
          language_presets: {
            key: {
              overrides: {}
            }
          },
          agent: {
            first_message: "first_message",
            language: "language"
          }
        },
        metadata: {
          created_at_unix_secs: 1
        },
        platform_settings: {
          auth: {
            enable_auth: true,
            allowlist: [{ hostname: "hostname" }],
            shareable_token: "shareable_token"
          },
          evaluation: {
            criteria: [
              {
                id: "id",
                conversation_goal_prompt: "conversation_goal_prompt"
              }
            ]
          },
          widget: {
            variant: "compact",
            expandable: "never",
            avatar: { type: "orb" },
            feedback_mode: "none",
            bg_color: "bg_color",
            text_color: "text_color",
            btn_color: "btn_color",
            btn_text_color: "btn_text_color",
            border_color: "border_color",
            focus_color: "focus_color",
            border_radius: 1,
            btn_radius: 1,
            action_text: "action_text",
            start_call_text: "start_call_text",
            end_call_text: "end_call_text",
            expand_text: "expand_text",
            listening_text: "listening_text",
            speaking_text: "speaking_text",
            shareable_page_text: "shareable_page_text",
            shareable_page_show_terms: true,
            terms_text: "terms_text",
            terms_html: "terms_html",
            terms_key: "terms_key",
            show_avatar_when_collapsed: true,
            disable_banner: true,
            language_selector: true,
            custom_avatar_path: "custom_avatar_path"
          },
          data_collection: {
            key: { type: "boolean" }
          },
          overrides: {
            custom_llm_extra_body: true,
            enable_conversation_initiation_client_data_from_webhook: true
          },
          call_limits: {
            agent_concurrency_limit: 1,
            daily_limit: 1
          },
          ban: {
            at_unix: 1,
            reason_type: "safety",
            reason: "reason"
          },
          privacy: {
            record_voice: true,
            retention_days: 1,
            delete_transcript_and_pii: true,
            delete_audio: true,
            apply_to_existing_conversations: true
          },
          safety: {
            is_blocked_ivc: true,
            is_blocked_non_ivc: true
          }
        },
        phone_numbers: [
          {
            phone_number: "phone_number",
            provider: "twilio",
            label: "label",
            phone_number_id: "phone_number_id",
            assigned_agent: {
              agent_id: "agent_id",
              agent_name: "agent_name"
            }
          }
        ]
      },
  // Other agents with minimal structure
  { agent_id: "2", name: "VoiceAide : Luna" },
  { agent_id: "3", name: "VoiceAide : Max" },
  { agent_id: "4", name: "VoiceAide : Aria" },
  { agent_id: "5", name: "VoiceAide : Leo" },
  { agent_id: "6", name: "VoiceAide : Sophia" },
  { agent_id: "7", name: "VoiceAide : John" },
  { agent_id: "8", name: "AutoAide" },
  { agent_id: "9", name: "Movenpick" },
];

export default function AgentsList({ onSelectAgent }) {
  const [agents, setAgents] = useState(initialAgents);
  const [selectedAgentID, setSelectedAgentID] = useState(null)

  // Handle deleting an agent
  const onDeleteAgent = (id) => {
    setAgents((prevAgents) => prevAgents.filter((agent) => agent.agent_id !== id));
  };

  // Handle copying Agent ID
  const onCopyAgentID = (id) => {
    navigator.clipboard.writeText(id);
    alert(`Agent ID ${id} copied to clipboard`);
  };

  // Handle creating a new agent
  const onCreateAgent = () => {
    const newAgent = { id: String(agents.length + 1), name: `New Agent ${agents.length + 1}` };
    setAgents([...agents, newAgent]);
  };

    // Handle saving new agent
    const onSaveAgent = (newAgent) => {
      setAgents((prev) => [...prev, newAgent]);
    };

  return (
    <div className="w-xl border-r h-screen p-4 flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">AI Agents</h2>
        <AddAgentSheet onSave={onSaveAgent} />
      </div>

      {/* Agents List */}
      <ul className="space-y-2">
        {agents.map((agent) => (
          <li
            key={agent.agent_id}
            className={`flex items-center justify-between p-2 transition-all duration-200 hover:bg-orange-400/10 rounded-lg cursor-pointer ${agent.agent_id == selectedAgentID && "bg-orange-50"}`}
            onClick={() => { setSelectedAgentID(agent.agent_id); onSelectAgent(agent) }}
          >
            <div className="flex items-center space-x-3">
              <MessageCircle className={`h-5 w-5 text-gray-500 ${agent.agent_id== selectedAgentID && "text-orange-400"}`} />
              <span className={`text-sm text-gray-800 ${agent.agent_id == selectedAgentID && "text-orange-400"}`}>{agent.name}</span>
            </div>

            {/* Dropdown Menu for Agent Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onSelectAgent(agent)}>
                  <MessageCircle className="h-4 w-4 mr-2" /> Conversation history
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCopyAgentID(agent.agent_id)}>
                  <Clipboard className="h-4 w-4 mr-2" /> Copy Agent ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDeleteAgent(agent.agent_id)} className="text-red-500">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete agent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
      </ul>
    </div>
  );
}