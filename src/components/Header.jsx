import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex space-x-2">
        <Button variant="outline">All Agents</Button>
        <Button variant="outline">Last Month</Button>
      </div>
    </header>
  );
}