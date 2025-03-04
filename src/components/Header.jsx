import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-6">
      <div>
        <p className="text-sm text-gray-500">My Workspace</p>
        <h1 className="text-2xl font-bold">Good afternoon, Amin</h1>
      </div>
      <div className="flex space-x-4">
        <DropdownMenu >
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Button variant="outline">All agents ▼</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="cursor-pointer">
            <DropdownMenuItem>All agents</DropdownMenuItem>
            <DropdownMenuItem>VoiceAide : John</DropdownMenuItem>
            <DropdownMenuItem>SkyAgent</DropdownMenuItem>
            <DropdownMenuItem>AutoAide</DropdownMenuItem>
            <DropdownMenuItem>RestaurantAgent</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Last Month ▼</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Last week</DropdownMenuItem>
            <DropdownMenuItem>Last month</DropdownMenuItem>
            <DropdownMenuItem>Last 3 months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}