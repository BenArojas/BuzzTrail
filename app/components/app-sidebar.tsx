import * as React from "react";
import { Check, ChevronRight, Plus, HomeIcon as House, Mountain } from 'lucide-react';

import { Adventures } from "~/components/adventures";
import { DatePicker } from "~/components/date-picker";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  sidebarMenuButtonVariants,
} from "~/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Adventure } from "@prisma/client";
import { Link } from "@remix-run/react";
import { cn } from "~/lib/utils";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.britannica.com%2Fanimal%2Fcat&psig=AOvVaw3RShbRfsrkKYyz5-92YnzK&ust=1734523270354000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMC4m-7grooDFQAAAAAdAAAAABAE",
  }
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  adventures: Adventure[];
}

export function AppSidebar({ adventures, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link className={cn(sidebarMenuButtonVariants())} to={`/`}>
            <House />
            Home
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarContent>
        <SidebarSeparator className="mx-0" />
        <Adventures adventures={adventures} />
        <SidebarSeparator className="mx-0" />
        <DatePicker adventures={adventures} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link className={cn(sidebarMenuButtonVariants())} to={`/new-adventure`}>
              <Plus />
              New Adventure
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

