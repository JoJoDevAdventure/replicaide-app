"use client";

import { appState } from "@/appState"; // Application state to access the username
import { Calls } from "@/data"; // Mock data for calls
import Head from "next/head";
import Header from "../../Components/dashboard/Header"; // Header component
import SideBar from "../../Components/dashboard/SideBar"; // Sidebar navigation component
import MainContent from "./MainContent"; // Main content component

const Dashboard = () => {

  return (
    <div className="flex md:min-h-[100vh] md:overflow-y-scroll pb-12">
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