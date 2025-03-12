"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function SecurityTab({ agent, onChange }) {
  return (
    <div>
      {/* Enable Authentication */}
      <div className="p-4 bg-gray-100 rounded-lg mb-4 flex items-center justify-between">
        <label className="text-sm font-medium">Enable authentication</label>
        <Switch
          checked={agent.platform_settings.auth.enable_auth}
          onCheckedChange={(val) => onChange("platform_settings.auth.enable_auth", val)}
        />
      </div>

      {/* Allowlist */}
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <label className="text-sm font-medium">Allowlist</label>
        <p className="text-sm text-gray-500">Specify the hosts that will be allowed to connect to this agent.</p>
        <Input placeholder="Add host" />
        <Button className="mt-2">Add host</Button>
      </div>
    </div>
  );
}