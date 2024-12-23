import { AdventureStatus } from '@prisma/client';
import { Check, ChevronRight, Circle, Mountain, Play, XCircle } from "lucide-react";

const StatusIcon = ({ status }: { status: AdventureStatus }) => {
    switch (status) {
      case AdventureStatus.NOT_STARTED:
        return <Circle className="h-3 w-3" />;
      case AdventureStatus.ACTIVE:
        return <Play className="h-3 w-3 fill-current" />;
      case AdventureStatus.COMPLETED:
        return <Check className="h-3 w-3" />;
      case AdventureStatus.CANCELED:
        return <XCircle className="h-3 w-3" />;
    }
  };

export default StatusIcon