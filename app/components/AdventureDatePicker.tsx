import React, { useMemo } from 'react';
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import { Button } from "~/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { DayProps } from "react-day-picker";
import { Adventure } from "@prisma/client";

interface AdventureDatePickerProps {
  name: string;
  label: string;
  control: any;
  adventures: Adventure[];
  minDate?: Date;
}

export function AdventureDatePicker({
  name,
  label,
  control,
  adventures,
  minDate,
}: AdventureDatePickerProps) {
  // Default minDate to today if not provided
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const disabledDays = {
    before: minDate || today
  };

  const adventureDates = useMemo(() => {
    const dates = new Map<string, Adventure[]>();
    adventures.forEach(adventure => {
      const start = new Date(adventure.startDate);
      const end = new Date(adventure.endDate);
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split('T')[0];
        if (!dates.has(dateString)) {
          dates.set(dateString, []);
        }
        dates.get(dateString)?.push(adventure);
      }
    });
    return dates;
  }, [adventures]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabledDays}
                defaultMonth={minDate}
                initialFocus
                components={{
                  Day: ({ date, ...props }: DayProps) => {
                    const dateString = date.toISOString().split('T')[0];
                    const dateAdventures = adventureDates.get(dateString);
                    const hasAdventure = Boolean(dateAdventures?.length);

                    if (!hasAdventure) {
                      return (
                        <div {...props} className="rdp-day_container">
                          {date.getDate()}
                        </div>
                      );
                    }

                    return (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              {...props} 
                              className={cn(
                                "rdp-day_container relative",
                                "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-blue-500"
                              )}
                            >
                              {date.getDate()}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              {dateAdventures?.map(adventure => (
                                <div key={adventure.id}>
                                  {adventure.name}
                                </div>
                              ))}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  }
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default AdventureDatePicker;