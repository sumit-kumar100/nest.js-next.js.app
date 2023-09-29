"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Icons } from "@/components/icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Select {
  options: { label: string; value: any }[];
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  searchable?: boolean;
  className?: string;
}

export function Select({
  options,
  placeholder,
  value,
  onChange,
  className,
  searchable,
  ...field
}: Select) {
  const [open, setOpen] = useState<boolean>(false);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSize = () => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setSize({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

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
            ref={containerRef}
            aria-expanded={open}
            className={cn(
              "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              value ?? "text-muted-foreground",
              className
            )}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder || "Select..."}
            <Icons.ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className={"p-0"} style={{ width: size.width }}>
        <Command>
          {searchable && <CommandInput placeholder="Search..." />}
          <CommandEmpty>No Results found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={(currentValue) => {
                  const selected = options.find(
                    (option) =>
                      option.label.toLowerCase() === currentValue.toLowerCase()
                  );
                  onChange(selected ? selected.value : undefined);
                  setOpen(false);
                }}
              >
                <Icons.Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
