import { ActionFunctionArgs } from "@remix-run/node";
import { requireUser } from "~/auth/auth";
import invariant from "tiny-invariant";
import { redirect } from "@remix-run/node";
import { $Enums, itemStatus } from "@prisma/client";
import { getChecklistItem, updateChecklistItem } from "~/db/item.server";

export async function action({ request, params }: ActionFunctionArgs) {
  const user = await requireUser(request);
  invariant(user, "User is not logged in");

  // Get URL parameters
  const { adventureId, itemId } = params;
  invariant(adventureId, "Adventure ID is required");
  invariant(itemId, "Item ID is required");
  const formData = await request.formData();
  const status = formData.get("status");
  if (status !== itemStatus.COMPLETED && status !== itemStatus.IN_PROGRESS) {
    throw new Error("Invalid status value");
  }
  const updatedCurrentItem = await updateChecklistItem(itemId, {
    status: status,
  });
  return redirect(`/adventure/${adventureId}`);
}
