"use client";

import Tabs from "@/Components/dashboard/Tabs";
import { liveCall } from "@/data";
import { useState } from "react";
import LiveCall from "./LiveCall";

const MainContent = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="p-6 space-y-4 h-full">
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={["Properties", "Live Calls", "Calls History"]}
        />
        {activeTab === 1 && <LiveCall call={liveCall}/>}
      </div>
    </>
  );
};

export default MainContent;
