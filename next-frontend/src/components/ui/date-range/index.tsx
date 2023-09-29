"use client";

import React, { useEffect, useRef, useState, type FC } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calender/index";
import { DateCaption } from "@/components/ui/date-caption";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface DateRangePickerProps {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate?: (values: { range: DateRange; rangeCompare?: DateRange }) => void;
  /** Initial value for start date */
  initialDateFrom?: Date | string;
  /** Initial value for end date */
  initialDateTo?: Date | string;
  /** Initial value for start date for compare */
  initialCompareFrom?: Date | string;
  /** Initial value for end date for compare */
  initialCompareTo?: Date | string;
  /** Alignment of popover */
  align?: "start" | "center" | "end";
  /** Option for locale */
  locale?: string;
  /** Option for showing compare feature */
  showCompare?: boolean;
}

const formatDate = (date: Date, locale: string = "en-us"): string => {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

interface DateRange {
  from: Date;
  to: Date | undefined;
}

interface Preset {
  value: string;
  label: string;
}

// Define presets
const PRESETS: Preset[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last7", label: "Last 7 days" },
  { value: "last14", label: "Last 14 days" },
  { value: "last30", label: "Last 30 days" },
  { value: "thisWeek", label: "This Week" },
  { value: "lastWeek", label: "Last Week" },
  { value: "thisMonth", label: "This Month" },
  { value: "lastMonth", label: "Last Month" },
];

//@ts-ignore
export const DateRangePicker: FC<DateRangePickerProps> & {
  filePath: string;
} = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  initialCompareFrom,
  initialCompareTo,
  onUpdate,
  align = "end",
  locale = "en-US",
  showCompare = true,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const [range, setRange] = useState<DateRange>({
    from: new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0)),
    to: initialDateTo
      ? new Date(new Date(initialDateTo).setHours(0, 0, 0, 0))
      : new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0)),
  });
  const [rangeCompare, setRangeCompare] = useState<DateRange | undefined>(
    initialCompareFrom
      ? {
          from: new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
          to: initialCompareTo
            ? new Date(new Date(initialCompareTo).setHours(0, 0, 0, 0))
            : new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
        }
      : undefined
  );

  // Refs to store the values of range and rangeCompare when the date picker is opened
  const openedRangeRef = useRef<DateRange | undefined>();
  const openedRangeCompareRef = useRef<DateRange | undefined>();

  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
    undefined
  );

  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 960 : false
  );

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmallScreen(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getPresetRange = (presetvalue: string): DateRange => {
    const preset = PRESETS.find(({ value }) => value === presetvalue);
    if (!preset) throw new Error(`Unknown date range preset: ${presetvalue}`);
    const from = new Date();
    const to = new Date();
    const first = from.getDate() - from.getDay();

    switch (preset.value) {
      case "today":
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "yesterday":
        from.setDate(from.getDate() - 1);
        from.setHours(0, 0, 0, 0);
        to.setDate(to.getDate() - 1);
        to.setHours(23, 59, 59, 999);
        break;
      case "last7":
        from.setDate(from.getDate() - 6);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "last14":
        from.setDate(from.getDate() - 13);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "last30":
        from.setDate(from.getDate() - 29);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "thisWeek":
        from.setDate(first);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "lastWeek":
        from.setDate(from.getDate() - 7 - from.getDay());
        to.setDate(to.getDate() - to.getDay() - 1);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "thisMonth":
        from.setDate(1);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "lastMonth":
        from.setMonth(from.getMonth() - 1);
        from.setDate(1);
        from.setHours(0, 0, 0, 0);
        to.setDate(0);
        to.setHours(23, 59, 59, 999);
        break;
    }

    return { from, to };
  };

  const setPreset = (preset: string): void => {
    const range = getPresetRange(preset);
    setRange(range);
    if (rangeCompare) {
      const rangeCompare = {
        from: new Date(
          range.from.getFullYear() - 1,
          range.from.getMonth(),
          range.from.getDate()
        ),
        to: range.to
          ? new Date(
              range.to.getFullYear() - 1,
              range.to.getMonth(),
              range.to.getDate()
            )
          : undefined,
      };
      setRangeCompare(rangeCompare);
    }
  };

  const checkPreset = (): void => {
    for (const preset of PRESETS) {
      const presetRange = getPresetRange(preset.value);

      const normalizedRangeFrom = new Date(range.from.setHours(0, 0, 0, 0));
      const normalizedPresetFrom = new Date(
        presetRange.from.setHours(0, 0, 0, 0)
      );

      const normalizedRangeTo = new Date(range.to?.setHours(0, 0, 0, 0) ?? 0);
      const normalizedPresetTo = new Date(
        presetRange.to?.setHours(0, 0, 0, 0) ?? 0
      );

      if (
        normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() &&
        normalizedRangeTo.getTime() === normalizedPresetTo.getTime()
      ) {
        setSelectedPreset(preset.value);
        return;
      }
    }

    setSelectedPreset(undefined);
  };

  const resetValues = (): void => {
    setRange({
      from:
        typeof initialDateFrom === "string"
          ? new Date(initialDateFrom)
          : initialDateFrom,
      to: initialDateTo
        ? typeof initialDateTo === "string"
          ? new Date(initialDateTo)
          : initialDateTo
        : typeof initialDateFrom === "string"
        ? new Date(initialDateFrom)
        : initialDateFrom,
    });
    setRangeCompare(
      initialCompareFrom
        ? {
            from:
              typeof initialCompareFrom === "string"
                ? new Date(initialCompareFrom)
                : initialCompareFrom,
            to: initialCompareTo
              ? typeof initialCompareTo === "string"
                ? new Date(initialCompareTo)
                : initialCompareTo
              : typeof initialCompareFrom === "string"
              ? new Date(initialCompareFrom)
              : initialCompareFrom,
          }
        : undefined
    );
  };

  useEffect(() => {
    checkPreset();
  }, [range]);

  const PresetButton = ({
    key,
    preset,
    label,
    isSelected,
  }: {
    key: any;
    preset: string;
    label: string;
    isSelected: boolean;
  }): JSX.Element => (
    <Button
      key={key}
      className={cn("text-xs", isSelected && "pointer-events-none")}
      variant="ghost"
      onClick={() => {
        setPreset(preset);
      }}
    >
      <>
        <span className={cn("pr-2 opacity-0", isSelected && "opacity-70")}>
          <Icons.Check width={18} height={18} />
        </span>
        {label}
      </>
    </Button>
  );

  // Helper function to check if two date ranges are equal
  const areRangesEqual = (a?: DateRange, b?: DateRange) => {
    if (!a || !b) return a === b; // If either is undefined, return true if both are undefined
    return (
      a.from.getTime() === b.from.getTime() &&
      (!a.to || !b.to || a.to.getTime() === b.to.getTime())
    );
  };

  useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range;
      openedRangeCompareRef.current = rangeCompare;
    }
  }, [isOpen]);

  return (
    <Popover
      modal={true}
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) {
          resetValues();
        }
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <div
          className={cn(
            "relative -top-1 rounded-lg border-2 border-transparent p-[0.15rem]",
            isOpen && "border-primary"
          )}
        >
          <div
            className={cn(
              "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {`${formatDate(range.from, locale)}${
              range.to != null ? " - " + formatDate(range.to, locale) : ""
            }`}
            {isOpen ? (
              <Icons.ChevronUp width={24} />
            ) : (
              <Icons.ChevronDown width={24} />
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto p-0">
        <div className="flex py-2">
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-end gap-2 px-3 pb-4 lg:flex-row lg:items-start lg:pb-0">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <DateCaption
                      value={range.from}
                      onChange={(date) => {
                        const toDate =
                          range.to == null || date > range.to ? date : range.to;
                        setRange((prevRange) => ({
                          ...prevRange,
                          from: date,
                          to: toDate,
                        }));
                      }}
                      mode="range"
                    />
                    <div className="py-1">-</div>
                    <DateCaption
                      value={range.to}
                      onChange={(date) => {
                        const fromDate = date < range.from ? date : range.from;
                        setRange((prevRange) => ({
                          ...prevRange,
                          from: fromDate,
                          to: date,
                        }));
                      }}
                      mode="range"
                    />
                  </div>
                </div>
              </div>
              {isSmallScreen && (
                <Select
                  options={PRESETS}
                  value={selectedPreset}
                  onChange={(value) => {
                    setPreset(value);
                  }}
                />
              )}
              <div>
                <Calendar
                  mode="range"
                  onSelect={(value: { from?: Date; to?: Date } | undefined) => {
                    if (value?.from != null) {
                      setRange({ from: value.from, to: value?.to });
                    }
                  }}
                  selected={range}
                  numberOfMonths={isSmallScreen ? 1 : 2}
                  defaultMonth={
                    new Date(
                      new Date().setMonth(
                        new Date().getMonth() - (isSmallScreen ? 0 : 1)
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
          {!isSmallScreen && (
            <div className="pr-2">
              <div className="grid max-h-[230px] grid-cols-2 gap-[0.4rem] overflow-auto">
                {PRESETS.map((preset) => (
                  <PresetButton
                    key={preset.value}
                    preset={preset.value}
                    label={preset.label}
                    isSelected={selectedPreset === preset.value}
                  />
                ))}
              </div>

              <div className="flex justify-end gap-2 py-2 pr-4">
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    resetValues();
                  }}
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    if (
                      !areRangesEqual(range, openedRangeRef.current) ||
                      !areRangesEqual(
                        rangeCompare,
                        openedRangeCompareRef.current
                      )
                    ) {
                      onUpdate?.({ range, rangeCompare });
                    }
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
