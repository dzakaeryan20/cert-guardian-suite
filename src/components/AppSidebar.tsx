import { Shield, FileText, X, Settings, Home } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Certificates", url: "/certificates", icon: FileText },
  { title: "Agent", url: "/agent", icon: X },
  { title: "Setting Admin", url: "/create-agent", icon: Settings },
];

export function AppSidebar() {
  const { state, setOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  const handleSidebarEnter = () => {
    if (isCollapsed) {
      setOpen(true);
    }
  };

  const handleSidebarLeave = () => {
    if (!isCollapsed) {
      setOpen(false);
    }
  };

  return (
    <Sidebar 
      className={`${isCollapsed ? "w-16" : "w-72"} bg-gradient-to-b from-sidebar-background to-sidebar-background/95 shadow-strong border-r border-sidebar-border/50`} 
      collapsible="icon"
      onMouseEnter={handleSidebarEnter}
      onMouseLeave={handleSidebarLeave}
    >
      <SidebarHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-glow/5"></div>
        <div className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} pr-2 pl-2 pt-7 pb-7 h-15 w-15`}>
          <div 
            className={`flex items-center space-x-3 cursor-pointer group transition-all duration-300 hover:bg-primary/10 rounded-xl p-3 -m-3 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="relative">
              <Shield className="h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-primary-glow " />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-lg text-sidebar-foreground group-hover:text-primary transition-colors duration-300">SSL Monitor</span>
                <span className="text-xs text-sidebar-foreground/70">Security Dashboard</span>
              </div>
            )}
          </div>
        </div>
      </SidebarHeader>

      {!isCollapsed && (
        <SidebarContent className="px-4 py-6">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-4 px-3">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={({ isActive }) => `
                          ${getNavCls({ isActive })}
                          group relative flex items-center rounded-xl px-3 py-3 transition-all duration-300
                          ${isActive 
                            ? 'bg-gradient-to-r from-primary/20 to-primary-glow/10 text-primary border-l-4 border-primary shadow-medium' 
                            : 'hover:bg-sidebar-accent/30 hover:translate-x-1'
                          }
                        `}
                      >
                        <div className="relative">
                          <item.icon className={`h-5 w-5 transition-all duration-300 ${isActive ? 'text-primary' : 'text-sidebar-foreground/70 group-hover:text-primary'}`} />
                          {isActive && (
                            <div className="absolute inset-0 bg-primary/30 rounded-full blur-sm"></div>
                          )}
                        </div>

                        <span className={`ml-3 font-medium transition-all duration-300 ${isActive ? 'text-primary' : 'text-sidebar-foreground group-hover:text-primary'}`}>
                          {item.title}
                        </span>

                        {isActive && (
                          <div className="absolute right-3 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}

      {isCollapsed && (
        <SidebarContent>
          <SidebarGroup >
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title} className="mb-6">
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={({ isActive }) => `
                          ${getNavCls({ isActive })}
                          group relative flex items-center rounded-xl transition-all duration-300 hover:bg-sidebar-accent/30 hover:translate-x-1
                        `}
                      >
                        <div className="relative">
                          <item.icon className={` flex transition-all duration-300`} />
                            {/* <div className="absolute inset-0 bg-primary/30 rounded-full blur-sm"></div> */}
                        </div>
                      
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}


    </Sidebar>
  );
}