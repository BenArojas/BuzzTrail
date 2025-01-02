import { AdventureStatus } from "@prisma/client";
import { CheckCircle, Circle, Tent, XCircle } from "lucide-react";

const StatusIcon = ({ status }: { status: AdventureStatus }) => {
  switch (status) {
    case AdventureStatus.NOT_STARTED:
      return <Circle className="h-4 w-4 text-muted-foreground" />;
    case AdventureStatus.ACTIVE:
      return <Tent className="h-4 w-4 text-yellow-500" />;
    case AdventureStatus.COMPLETED:
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case AdventureStatus.CANCELED:
      return <XCircle className="h-4 w-4 text-red-500" />;
  }
};

export default StatusIcon;
