import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="h-dvh border p-5">
        <SidebarTrigger />
      </div>
      <p>GG</p>
      <SidebarHeader />
      <SidebarContent>
        <p>gg</p>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
