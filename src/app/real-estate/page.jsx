"use client"

import dynamic from "next/dynamic";

import { appState } from "@/appState"; // Application state to access the username
import Head from "next/head";

const Header = dynamic(() => import("../../Components/dashboard/Header"));
const SideBar = dynamic(() => import("../../Components/dashboard/SideBar"));
const MainContent = dynamic(() => import("./MainContent"), { ssr: false });

const Dashboard = () => {

  return (
    <div className="flex md:h-[100vh] pb-12">
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
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;