import { Item } from "@prisma/client";
import { CheckSquare } from "lucide-react";
import { useState } from "react";
import { ChecklistPopup } from "~/components/ChecklistPopup";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
type AdvantureCheckListProps = {
  items: Item[];
  advetureId: string;
};
function AdvantureCheckList({ items, advetureId }: AdvantureCheckListProps) {
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const checklistItemsCompleted =
    items.filter((item) => item.status === "COMPLETED").length || 0;
  return (
    <>
      <Card
        className="bg-black/50 border-yellow-500/50 shadow-xl cursor-pointer"
        onClick={() => setIsChecklistOpen(true)}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className=" font-bold">Checklist</CardTitle>
          <CheckSquare className="h-5 w-5 " />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold ">
            {checklistItemsCompleted}/{items.length}
          </div>
          <p className="text-xs ">Items packed</p>
        </CardContent>
      </Card>
      <ChecklistPopup
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        items={items}
        adventureId={advetureId}
      />
      ;
    </>
  );
}

export default AdvantureCheckList;
