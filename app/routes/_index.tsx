import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Calendar, CheckSquare, DollarSign, MapPin } from "lucide-react";
import { useState } from "react";
import { requireUser } from "~/auth/auth";
import { AppSidebar } from "~/components/app-sidebar";
import { ChecklistPopup } from "~/components/ChecklistPopup";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request);
  return {};
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const initialChecklist = [
  { id: '1', text: 'Hiking Boots', completed: true },
  { id: '2', text: 'Sleeping Bag', completed: false },
  { id: '3', text: 'First Aid Kit', completed: true },
]
export default function Index() {

  const [checklistItems, setChecklistItems] = useState(initialChecklist)
  const [isChecklistOpen, setIsChecklistOpen] = useState(false)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-gradient-to-bl from-amber-300 to-slate-900">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card className="bg-black/50 border-yellow-500/50 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="font-bold">Next Trip</CardTitle>
                <Calendar className="h-5 w-5 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold ">15</div>
                <p className="text-xs ">Days until departure</p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-yellow-500/50 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="">Budget</CardTitle>
                <DollarSign className="h-5 w-5 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold ">$2,450</div>
                <p className="text-xs ">Remaining budget</p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-yellow-500/50 shadow-xl cursor-pointer" onClick={() => setIsChecklistOpen(true)}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className=" font-bold">Checklist</CardTitle>
                <CheckSquare className="h-5 w-5 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold ">8/12</div>
                <p className="text-xs ">Items packed</p>
              </CardContent>
            </Card>
            <ChecklistPopup
              isOpen={isChecklistOpen}
              onClose={() => setIsChecklistOpen(false)}
              items={checklistItems}
              onUpdateItems={setChecklistItems}
            />
          </div>
          <Card className="bg-black/50 border-yellow-500/50 shadow-xl">
            <CardHeader>
              <CardTitle className="font-bold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Route Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg bg-black/40 flex items-center justify-center">
                <p className="">Interactive Map Coming Soon</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                  <span className="">Starting Point</span>
                  <span className="text-white">Lukla Airport</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                  <span className="">Destination</span>
                  <span className="text-white">Everest Base Camp</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                  <span className="">Distance</span>
                  <span className="text-white">130 km round trip</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
