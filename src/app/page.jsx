import CallHistory from "@/components/CallHistory";
import AgentsList from "../components/AgentsList";
import DashboardChart from "../components/Chart";
import Header from "../components/Header";
import SidebarNav from "../components/Sidebar";
import StatsGrid from "../components/StatsGrid";

const page = () => {
  return (
    <div className="flex">
      <SidebarNav />
      <main className="flex flex-col w-full gap-7 md:px-32 md:py-12">
        <Header />
        <StatsGrid />
        <DashboardChart />
        <div className="mt-6 flex gap-7">
          <div className="w-[55%]">
            <AgentsList />
          </div>
          <div className="w-[45%]">
            <CallHistory />
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
