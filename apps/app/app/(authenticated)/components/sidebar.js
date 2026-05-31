"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalSidebar = void 0;
const client_1 = require("@repo/auth/client");
const mode_toggle_1 = require("@repo/design-system/components/mode-toggle");
const button_1 = require("@repo/design-system/components/ui/button");
const sidebar_1 = require("@repo/design-system/components/ui/sidebar");
const utils_1 = require("@repo/design-system/lib/utils");
const trigger_1 = require("@repo/notifications/components/trigger");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const search_1 = require("./search");
const navMain = [
    { title: "Dashboard", url: "/", icon: lucide_react_1.LayoutDashboardIcon },
    { title: "Migrations", url: "/migrations", icon: lucide_react_1.ArrowRightLeftIcon },
    { title: "Clients", url: "/clients", icon: lucide_react_1.UsersIcon },
    { title: "Leads", url: "/leads", icon: lucide_react_1.ZapIcon },
    { title: "Revenue", url: "/revenue", icon: lucide_react_1.DollarSignIcon },
    { title: "WhatsApp", url: "/whatsapp", icon: lucide_react_1.MessageCircleIcon },
    { title: "Tasks", url: "/tasks", icon: lucide_react_1.ListChecksIcon },
    { title: "SYNTHIA", url: "/synthia", icon: lucide_react_1.BotIcon },
];
const navMarkets = [
    { title: "India (IN)", url: "/market/in", icon: lucide_react_1.GlobeIcon },
    { title: "USA (US)", url: "/market/us", icon: lucide_react_1.GlobeIcon },
    { title: "Mexico (MX)", url: "/market/mx", icon: lucide_react_1.GlobeIcon },
];
const navSettings = [
    { title: "Settings", url: "/settings", icon: lucide_react_1.Settings2Icon },
    { title: "API Keys", url: "/settings/keys", icon: lucide_react_1.KeyRoundIcon },
];
const GlobalSidebar = ({ children }) => {
    const sidebar = (0, sidebar_1.useSidebar)();
    const pathname = (0, navigation_1.usePathname)();
    return (<>
      <sidebar_1.Sidebar variant="inset">
        <sidebar_1.SidebarHeader>
          <sidebar_1.SidebarMenu>
            <sidebar_1.SidebarMenuItem>
              <div className={(0, utils_1.cn)("h-[36px] overflow-hidden transition-all [&>div]:w-full", sidebar.open ? "" : "-mx-1")}>
                <client_1.OrganizationSwitcher afterSelectOrganizationUrl="/" hidePersonal/>
              </div>
            </sidebar_1.SidebarMenuItem>
          </sidebar_1.SidebarMenu>
        </sidebar_1.SidebarHeader>
        <search_1.Search />
        <sidebar_1.SidebarContent>
          <sidebar_1.SidebarGroup>
            <sidebar_1.SidebarGroupLabel>Engine</sidebar_1.SidebarGroupLabel>
            <sidebar_1.SidebarMenu>
              {navMain.map((item) => (<sidebar_1.SidebarMenuItem key={item.title}>
                  <sidebar_1.SidebarMenuButton asChild isActive={item.url === "/"
                ? pathname === "/"
                : pathname.startsWith(item.url)} tooltip={item.title}>
                    <link_1.default href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </link_1.default>
                  </sidebar_1.SidebarMenuButton>
                </sidebar_1.SidebarMenuItem>))}
            </sidebar_1.SidebarMenu>
          </sidebar_1.SidebarGroup>

          <sidebar_1.SidebarGroup>
            <sidebar_1.SidebarGroupLabel>Markets</sidebar_1.SidebarGroupLabel>
            <sidebar_1.SidebarMenu>
              {navMarkets.map((item) => (<sidebar_1.SidebarMenuItem key={item.title}>
                  <sidebar_1.SidebarMenuButton asChild isActive={pathname.startsWith(item.url)} tooltip={item.title}>
                    <link_1.default href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </link_1.default>
                  </sidebar_1.SidebarMenuButton>
                </sidebar_1.SidebarMenuItem>))}
            </sidebar_1.SidebarMenu>
          </sidebar_1.SidebarGroup>

          <sidebar_1.SidebarGroup className="mt-auto">
            <sidebar_1.SidebarGroupContent>
              <sidebar_1.SidebarMenu>
                {navSettings.map((item) => (<sidebar_1.SidebarMenuItem key={item.title}>
                    <sidebar_1.SidebarMenuButton asChild isActive={pathname.startsWith(item.url)} tooltip={item.title}>
                      <link_1.default href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </link_1.default>
                    </sidebar_1.SidebarMenuButton>
                  </sidebar_1.SidebarMenuItem>))}
              </sidebar_1.SidebarMenu>
            </sidebar_1.SidebarGroupContent>
          </sidebar_1.SidebarGroup>
        </sidebar_1.SidebarContent>
        <sidebar_1.SidebarFooter>
          <sidebar_1.SidebarMenu>
            <sidebar_1.SidebarMenuItem className="flex items-center gap-2">
              <client_1.UserButton appearance={{
            elements: {
                rootBox: "flex overflow-hidden w-full",
                userButtonBox: "flex-row-reverse",
                userButtonOuterIdentifier: "truncate pl-0",
            },
        }} showName/>
              <div className="flex shrink-0 items-center gap-px">
                <mode_toggle_1.ModeToggle />
                <button_1.Button asChild className="shrink-0" size="icon" variant="ghost">
                  <div className="h-4 w-4">
                    <trigger_1.NotificationsTrigger />
                  </div>
                </button_1.Button>
              </div>
            </sidebar_1.SidebarMenuItem>
          </sidebar_1.SidebarMenu>
        </sidebar_1.SidebarFooter>
      </sidebar_1.Sidebar>
      <sidebar_1.SidebarInset>{children}</sidebar_1.SidebarInset>
    </>);
};
exports.GlobalSidebar = GlobalSidebar;
