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

    // Get current item
    const currentItem = await getChecklistItem(itemId);
    // Toggle the status between COMPLETED and IN_PROGRESS
    const newStatus = currentItem?.status === itemStatus.COMPLETED
        ? itemStatus.IN_PROGRESS
        : itemStatus.COMPLETED;

    const updatedCurrentItem = await updateChecklistItem(itemId, {
        status: newStatus
    });

    //   // Toggle the status between COMPLETED and IN_PROGRESS
    //   const newStatus = currentItem?.status === $Enums.itemStatus.COMPLETED 
    //     ? $Enums.itemStatus.IN_PROGRESS 
    //     : $Enums.itemStatus.COMPLETED;

    //   // Update the item
    //   await prisma.item.update({
    //     where: { id: itemId },
    //     data: { status: newStatus }
    //   });

    // Redirect back to the adventure page
    // return null
    return redirect(`/adventure/${adventureId}`);
}