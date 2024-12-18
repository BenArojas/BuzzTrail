import type { ActionFunctionArgs } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import invariant from "tiny-invariant";
import { requireUser } from "~/auth/auth";
import NewAdventureForm, {
  AdventureFormData,
  resolver,
} from "~/components/NewAdventureForm";
import { createAdventure } from "~/db/adventure.server";

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
  const response = await createAdventure(user.id, {
    ...createData,
    country: country[0],
    state: country[1],
  });

  // Do something with the data
  return Response.json(data);
}
function NewAdventure() {
  return (
    <div className="">
      <h1 className="text-center mb-10">New Adventure</h1>
      <NewAdventureForm />
    </div>
  );
}

export default NewAdventure;
