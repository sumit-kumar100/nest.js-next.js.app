"use client";

import * as React from "react";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";

export function SiteHeader() {
  return (
    <header className="fixed left-0 top-0 z-40 w-full bg-background/70 backdrop-blur-lg backdrop-saturate-150">
      <div className="flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="mr-2 flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="border-0 outline-none lg:mr-4">
                <Icons.User size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-4">
                <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                  <Icons.Logout size={18} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
