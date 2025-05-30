"use client";

import { appState } from "@/appState"; // Application state to access the username
import { Calls } from "@/data"; // Mock data for calls
import dynamic from "next/dynamic";
import Head from "next/head";
import Header from "../../Components/dashboard/Header"; // Header component
import SideBar from "../../Components/dashboard/SideBar"; // Sidebar navigation component
const MainContent = dynamic(() => import("./MainContent"), { ssr: false });

const Dashboard = () => {

  return (
    <div className="flex md:h-[100vh] md:overflow-hidden pb-12">
            <Head>
        <title>ReplicAIDE Demo</title>
        <meta name="description" content="A brief description of the page" />
      </Head>
      {/* Sidebar Navigation */}
      <SideBar />
      
      {/* Main Dashboard Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header username={appState.username} />
        
        {/* Main Content Section */}
        <MainContent calls={Calls} />
      </div>
    </div>
  );
};

export default Dashboard;