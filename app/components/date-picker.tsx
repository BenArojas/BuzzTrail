"use client"

import * as React from "react"
import { Calendar } from "~/components/ui/calendar"
import {
  SidebarGroup,
  SidebarGroupContent,
} from "~/components/ui/sidebar"
import { Adventure } from "@prisma/client"
import { cn } from "~/lib/utils"
import { DayProps } from "react-day-picker"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import { useNavigate } from "@remix-run/react"

interface DatePickerProps {
  adventures: Adventure[]
}

export function DatePicker({ adventures }: DatePickerProps) {
  const navigate = useNavigate()
  
  const adventureDates = React.useMemo(() => {
    const dates = new Map<string, Adventure[]>()
    
    adventures.forEach(adventure => {
      const start = new Date(adventure.startDate)
      const end = new Date(adventure.endDate)
      
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split('T')[0]
        if (!dates.has(dateString)) {
          dates.set(dateString, [])
        }
        dates.get(dateString)?.push(adventure)
      }
    })
    
    return dates
  }, [adventures])

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <TooltipProvider>
          <Calendar 
            className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
            components={{
              Day: (props: DayProps) => {
                const dateString = props.date.toISOString().split('T')[0]
                const dateAdventures = adventureDates.get(dateString)
                const hasAdventure = Boolean(dateAdventures?.length)
                
                const dayButton = (
                  <button
                    type="button"
                    onClick={() => {
                      if (dateAdventures?.length) {
                        navigate(`/adventure/${dateAdventures[0].name}`)
                      }
                    }}
                    className={cn(
                      "relative h-8 w-8 p-0 font-normal hover:bg-accent rounded-md",
                      hasAdventure && "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-blue-500"
                    )}
                  >
                    <time dateTime={dateString}>
                      {props.date.getDate()}
                    </time>
                  </button>
                )

                if (!hasAdventure) {
                  return dayButton
                }

                return (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {dayButton}
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        {dateAdventures?dateAdventures.map(adventure => (
                          <div key={adventure.id}>
                            {adventure.name}
                          </div>
                        )): null}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )
              }
            }}
          />
        </TooltipProvider>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

