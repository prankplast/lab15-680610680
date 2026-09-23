import { BookOpen, Calendar, Home, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/mock-data";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
  { title: "ตารางเรียน", url: "/schedule", icon: Calendar },
  { title: "ตั้งค่า", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">
          CPE & ISNE
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User information */}
      <SidebarFooter>
        <Separator />

        <div className="flex items-center gap-3 p-2">
          {/* Avatar */}
          <img
            src={currentUser.avatar}
            alt={"Cheetah"}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />

          {/* User information */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {currentUser.nickname}
            </p>

            {/* Role badge */}
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                currentUser.role === "STUDENT"
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
              }`}
            >
              {currentUser.role}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}