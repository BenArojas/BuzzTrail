import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type AdventureBudgetCardProps = {
  budget: number | null;
};
function AdventureBudgetCard({ budget }: AdventureBudgetCardProps) {
  return (
    <Card className="bg-black/50 border-yellow-500/50 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="">Budget</CardTitle>
        <DollarSign className="h-5 w-5 " />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold ">
          {budget ? `${budget?.toFixed(2)}$` : "Unlimited money!!!!!"}
        </div>
        {/* <p className="text-xs ">Remaining budget</p> */}
      </CardContent>
    </Card>
  );
}

export default AdventureBudgetCard;
