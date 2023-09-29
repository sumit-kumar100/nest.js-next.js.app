"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  maximum?: number;
  value: string | undefined;
  onChange: (value: string) => void;
}

const ChipInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, value, maximum, ...props }) => {
    const [focus, setFocus] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>("");
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const handleOnFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();
        setFocus(true);
      }
    };

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        if (value) {
          let newChips = value.split(",");

          if (maximum && newChips.length < maximum) {
            newChips = [...newChips, inputValue.trim()];
          } else if (!maximum) {
            newChips = [...newChips, inputValue.trim()];
          } else {
            newChips = [...newChips];
          }

          setInputValue("");
          onChange(newChips.join(","));
        } else {
          setInputValue("");
          onChange(inputValue.trim());
        }
      }
    };

    const handleChipRemove = (chipIndex: number) => {
      if (value) {
        const updatedChips = value
          .split(",")
          .filter((_, index) => index !== chipIndex);
        if (updatedChips.length) {
          onChange(updatedChips.join(","));
        } else {
          onChange("");
        }
      }
    };

    return (
      <div
        className={cn(
          "relative -top-1 rounded-lg border-2 border-transparent bg-background p-[0.15rem]",
          focus && "border-primary",
          className
        )}
        onClick={handleOnFocus}
        onBlur={() => setFocus(false)}
      >
        <div
          className={cn(
            "flex cursor-text flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-[10px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <div className="flex flex-wrap gap-2 overflow-auto">
            {value &&
              value.split(",").map((chip: string, index: number) => (
                <Badge
                  key={index}
                  className="cursor-pointer px-4 font-normal hover:bg-primary"
                >
                  {chip}
                  <span
                    onClick={() => handleChipRemove(index)}
                    className="ml-2 text-sm"
                  >
                    &times;
                  </span>
                </Badge>
              ))}
          </div>
          <input
            type={type}
            ref={inputRef}
            className="outline-none placeholder:text-muted-foreground"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyPress}
            {...props}
          />
        </div>
      </div>
    );
  }
);

ChipInput.displayName = "ChipInput";

export { ChipInput };
