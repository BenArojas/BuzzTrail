import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Calendar, CheckSquare, DollarSign, MapPin } from "lucide-react";
import { useState } from "react";
import { requireUser } from "~/auth/auth";
import { ChecklistPopup } from "~/components/ChecklistPopup";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getAdventure } from "~/db/adventure.server";
import invariant from "tiny-invariant";
import { redirect, useLoaderData } from "@remix-run/react";
import { $Enums, itemStatus, Prisma } from "@prisma/client";
import { createChecklistItem } from "~/db/item.server";
import AdvantureCheckList from "~/components/AdvantureCheckList";
import AdventureBudgetCard from "~/components/AdventureBudgetCard";
import AdventureTimeTracker from "~/components/AdventureTimeTracker";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  invariant(user, "User is not logged in");

  const { id } = params;
  invariant(id, "Adventure id required!");
  const adventure = await getAdventure(user.id, id);
  if (!adventure) return redirect("/");

  return { adventure };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const user = await requireUser(request);
  invariant(user, "user is not logged in");
  // Extract and validate the adventureId from params
  const adventureId = params.id;
  invariant(adventureId, "adventureId not found");
  const formData = await request.formData();
  // Prepare the data according to ItemCreateWithoutAdventureInput type
  const data: Prisma.ItemCreateWithoutAdventureInput = {
    name: formData.get("name") as string,
    quantity: parseInt(formData.get("quantity") as string),
    importance: formData.get("importance") as $Enums.ItemImportance,
    // Set default status for new items
    status: itemStatus.IN_PROGRESS,
    // Only include price if it's not empty
    ...(formData.get("price")
      ? { price: parseFloat(formData.get("price") as string) }
      : { price: null }),
  };
  // Create the checklist item
  const item = await createChecklistItem(adventureId, data);

  // Redirect back to the adventure page
  return redirect(`/adventure/${adventureId}`);
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { adventure } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <AdventureTimeTracker endDate={adventure.endDate} startDate={adventure.startDate}/>
        <AdventureBudgetCard budget={adventure.budget} />
        <AdvantureCheckList advetureId={adventure.id} items={adventure.items} />
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
            <p className="">{JSON.stringify(adventure)}</p>
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
  );
}
