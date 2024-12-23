import { ChevronRight, Mountain } from "lucide-react";
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
import { Link, useLocation } from "@remix-run/react";
import { cn } from "~/lib/utils";
import StatusIcon from "~/components/StatusIcon";



export function Adventures({ adventures }: { adventures: Adventure[] }) {
  const location = useLocation();
  const currentAdventureId = location.pathname.split("/adventure/")[1];
  return (
    <>
      <SidebarGroup className="py-0">
        <Collapsible className="group/collapsible">
          <SidebarGroupLabel
            asChild
            className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-0 gap-2"
          >
            <CollapsibleTrigger>
              <Mountain />
              <span>My Adventures</span>
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {adventures.map((adventure) => (
                  <SidebarMenuItem key={adventure.id}>
                    <Link
                      className={cn(
                        sidebarMenuButtonVariants(),
                        adventure.id === currentAdventureId && "bg-sidebar-accent"
                      )}
                      to={`/adventure/${adventure.id}`}
                    >
                      <div className="flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground">
                        <StatusIcon status={adventure.status} />
                      </div>
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
