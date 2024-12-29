import { Calendar } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Card } from "./ui/card";
import { differenceInDays } from "date-fns";
type AdventureTimeTrackerProps = {
  startDate: Date;
  endDate: Date;
};
function AdventureTimeTracker({
  endDate,
  startDate,
}: AdventureTimeTrackerProps) {
  const isDatePassed = differenceInDays(endDate, new Date()) < 0;
  const diffInDays = differenceInDays(startDate, new Date());
  let timeLeft = "";
  if (isDatePassed) {
    timeLeft = "Already Over";
  } else if (diffInDays >= 0) {
    timeLeft = diffInDays.toString() + " days left";
  } else {
    timeLeft = "Already started!";
  }
  return (
    <Card className="bg-black/50 border-yellow-500/50 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="font-bold">Time Left</CardTitle>
        <Calendar className="h-5 w-5 " />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold ">{timeLeft}</div>
        <p className="text-xs ">Days until departure</p>
      </CardContent>
    </Card>
  );
}

export default AdventureTimeTracker;
