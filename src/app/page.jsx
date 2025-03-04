import AgentsList from "../components/AgentsList";
import DashboardChart from "../components/Chart";
import Header from "../components/Header";
import SidebarNav from "../components/Sidebar";
import StatsGrid from "../components/StatsGrid";


const page = () => {
  return (
    <div className="flex">
      <SidebarNav />
      <main className="flex-1 p-6">
        <Header />
        <StatsGrid />
        <DashboardChart />
        <div className="mt-6">
          <AgentsList />
        </div>
      </main>
    </div>
  );
}

export default page