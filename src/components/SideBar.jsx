import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Book, Home, Phone, Settings, Users } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Agents", href: "/agents", icon: Users },
  { title: "Call History", href: "/call-history", icon: Phone },
  { title: "Knowledge Base", href: "/knowledge-base", icon: Book },
  { title: "Settings", href: "/settings", icon: Settings },
];

export default function SidebarNav() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}