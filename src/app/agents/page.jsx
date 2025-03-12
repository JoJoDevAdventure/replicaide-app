'use client'

import SidebarNav from "@/components/SidebarNav";
import { useState } from "react";
import AgentDetails from "./AgentDetails";
import AgentsList from "./AgentsList";

const Page = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <div className="flex">
      <SidebarNav />
      <AgentsList onSelectAgent={setSelectedAgent} />
      
      <main className="flex flex-col w-full">
        {selectedAgent ? (
          <AgentDetails initialAgent={selectedAgent} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-4xl">⚡</span>
              <h2 className="text-lg font-semibold mt-2">No AI Agent Selected</h2>
              <p className="text-sm text-gray-500">Select an existing agent or create a new one to configure and test your AI.</p>
            </div>
            <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">Create an AI agent</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;