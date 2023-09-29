"use client";

import * as React from "react";
import { Icons } from "@/components/icons";
import { Calendar } from "@/components/ui/calender";
import { DateCaption } from "@/components/ui/date-caption";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DateInputProps {
  value: Date;
  onChange: (value: Date | string) => void;
  placeholder?: string;
  className?: string;
}

export function DateInput({
  value,
  onChange,
  placeholder,
  className,
  ...field
}: DateInputProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "relative -top-1 rounded-lg border-2 border-transparent p-[0.15rem]",
            open && "border-primary"
          )}
        >
          <div
            className={cn(
              "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              value ?? "text-muted-foreground",
              className
            )}
          >
            {value ? format(value, "yyyy-MM-dd") : placeholder || "Pick a date"}
            <Icons.Calendar className="ml-auto h-4 w-4 opacity-50" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DateCaption
          mode="single"
          value={value}
          onChange={(date) => {
            console.log(date);
            onChange(date);
          }}
        />
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date: Date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
}
