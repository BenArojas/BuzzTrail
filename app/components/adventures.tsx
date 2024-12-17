import * as React from "react";
import { Check, ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  sidebarMenuButtonVariants,
  SidebarMenuItem,
  SidebarSeparator,
} from "~/components/ui/sidebar";
import { Adventure } from "@prisma/client";
import { Link } from "@remix-run/react";

// interface Adventure {
//   id: number;
//   name: string;
//   description: string;
//   date: Date;
// }

export function Adventures({ adventures }: { adventures: Adventure[] }) {
  return (
    <>
      <SidebarGroup className="py-0">
        <Collapsible className="group/collapsible">
          <SidebarGroupLabel
            asChild
            className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <CollapsibleTrigger>
              {"My Adventures"}
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {adventures.map((adventure, Index) => (
                  <SidebarMenuItem key={adventure.id}>
                    <Link
                      className={sidebarMenuButtonVariants()}
                      to={`/adventure/${adventure.id}`}
                    >
                      <div
                        data-active={Index === 0}
                        className="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary"
                      ></div>
                      {adventure.name}
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>
    </>
  );
}
