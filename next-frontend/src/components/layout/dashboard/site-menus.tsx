"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BlurImage from "@/components/blur-image";
import { Icons } from "@/components/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { SideMenu } from "./index";

export const SiteMenu = ({ menus }: { menus: SideMenu[] }) => {
  const currentPage = usePathname();

  const renderMenu = () => {
    return (
      <div className="flex flex-col gap-6 text-sm lg:gap-10">
        <div className="flex items-center gap-2">
          <BlurImage
            alt="dashboard-logo"
            src={"/images/dashboard-logo.png"}
            style={{ height: 50, width: 50 }}
          />
          <BlurImage
            alt="dashboard-text"
            src={"/images/dashboard-text.png"}
            style={{ height: 25, width: 150 }}
          />
        </div>
        {menus?.length ? (
          <nav className="flex flex-col gap-2">
            {menus?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    prefetch={true}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-white",
                      currentPage.includes(item.href)
                        ? "bg-white/30"
                        : "hover:bg-white/30"
                    )}
                  >
                    {item.icon && <item.icon size={18} />}
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <div
        className={cn(
          "hidden h-screen flex-col justify-between border-r bg-primary p-6 lg:flex"
        )}
      >
        {renderMenu()}
        <div className="tag text-white">Made by @Sumit</div>
      </div>
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger className="fixed left-4 top-6 z-40">
            <Icons.Menu />
          </SheetTrigger>
          <SheetContent
            className={cn(
              "flex h-screen flex-col justify-between border-r bg-primary text-sm"
            )}
            side={"left"}
          >
            <div className="flex flex-col gap-6 lg:gap-10">
              <div className="flex items-center gap-2">
                <BlurImage
                  alt="dashboard-logo"
                  src={"/images/dashboard-logo.png"}
                  style={{ height: 50, width: 50 }}
                />
                <BlurImage
                  alt="dashboard-text"
                  src={"/images/dashboard-text.png"}
                  style={{ height: 25, width: 150 }}
                />
              </div>
              {menus?.length ? (
                <nav className="flex flex-col gap-2">
                  {menus?.map(
                    (item, index) =>
                      item.href && (
                        <Link key={index} prefetch={true} href={item.href}>
                          <SheetTrigger
                            className={cn(
                              "flex w-full items-center gap-2 rounded-lg p-3 text-white sm:gap-3",
                              currentPage.includes(item.href)
                                ? "bg-white/30"
                                : "hover:bg-white/30"
                            )}
                          >
                            {item.icon && <item.icon />}
                            {item.title}
                          </SheetTrigger>
                        </Link>
                      )
                  )}
                </nav>
              ) : null}
            </div>
            <div className="tag text-white">Made by @Sumit</div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
