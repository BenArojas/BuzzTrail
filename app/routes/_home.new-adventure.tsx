import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import invariant from "tiny-invariant";
import { requireUser } from "~/auth/auth";
import NewAdventureForm, {
  AdventureFormData,
  resolver,
} from "~/components/NewAdventureForm";
import { checkForOverlappingAdventures, createAdventure, getUserAdventures } from "~/db/adventure.server";
import { redirect } from "@remix-run/node";
import { $Enums } from "@prisma/client";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useToast } from "~/hooks/use-toast";


export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request);
  invariant(user, "user is not logged in");
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<AdventureFormData>(request, resolver);

  if (errors) {
    // The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
    return Response.json({ errors, defaultValues });
  }
  const { country, ...createData } = data;
  const overlappingAdventures = await checkForOverlappingAdventures(user.id, createData.startDate, createData.endDate)
  if (overlappingAdventures) {
    return Response.json({
      errors: {
        message: "You already have an adventure scheduled during this period",
      }
    });
  }
  // Validate the difficulty value
  if (!['easy', 'medium', 'hard'].includes(createData.difficulty)) {
    throw new Error('Invalid difficulty level');
  }
  const response = await createAdventure(user.id, {
    ...createData,
    country: country[0],
    state: country[1],
    difficulty: createData.difficulty as $Enums.AdventureDifficulty
  });
  const id = response.id
  if (id) {
    throw redirect(`/adventure/${id}`)
  }

  // Do something with the data
  return Response.json(data);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  invariant(user, "User is not logged in");

  const adventures = await getUserAdventures(user?.id);
  return { adventures };
}
function NewAdventure() {
  const actionData = useActionData<typeof action>();
  const { adventures } = useLoaderData<typeof loader>();
  
  const { toast } = useToast()
  
  useEffect(() => {
    if (actionData?.errors) {
      toast({
        variant: "destructive",
        title: "Scheduling Conflict",
        description: actionData.errors.message,
      });
    }
  }, [actionData]);

  return (
    <div className="">
      <h1 className="text-center mb-10">New Adventure</h1>
      <NewAdventureForm adventures={adventures}/>
    </div>
  );
}

export default NewAdventure;
