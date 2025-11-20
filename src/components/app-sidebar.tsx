"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  Users,
  Clock,
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname() ?? "/";

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path);

  return (
    <aside className="w-64 min-h-screen fixed left-0 top-0 bg-white border-r">
      <div className="p-4 border-b">
        <Link href="/">
          <div className="text-lg font-semibold">Merchant</div>
        </Link>
      </div>

      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/") ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}>
                    <Home size={16} /> <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/dashboard") ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}>
                    <Clock size={16} /> <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Catalog</SidebarGroupLabel>
            <SidebarGroupLabel className="sr-only" />

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/products" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/products") ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}>
                    <Package size={16} /> <span>Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/orders" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/orders") ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}>
                    <ShoppingCart size={16} /> <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/customers" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/customers") ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}>
                    <Users size={16} /> <span>Customers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/settings") ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}>
                    <Settings size={16} /> <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </aside>
  );
}
