"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  return (
    <main className="grid flex-1 container grid-cols-12 items-baseline lg:items-stretch auto-rows-min lg:auto-rows-fr">
      <aside className="col-span-12 lg:col-span-3 border-b lg:border-r lg:border-b-0 flex flex-row lg:flex-col">
        <header className="py-4 lg:pr-4 flex items-center border-b border-transparent">
          {!segment?.includes("landing") ? (
            <Select>
              <SelectTrigger className="w-[200px] lg:w-full">
                <SelectValue placeholder="Workspace" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full items-center justify-start"
              )}
            >
              <ArrowLeftIcon className="mr-2" />
              <span>Go back</span>
            </Link>
          )}
        </header>
        <nav className="lg:flex flex-col gap-2 lg:pr-4 hidden">
          {!segment?.includes("landing") ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm bg-muted/50 py-2 px-3 rounded-md transition-colors"
              >
                Landings
              </Link>
              <Link
                href="/settings"
                className="text-sm hover:bg-muted/50 py-2 px-3 rounded-md transition-colors"
              >
                Settings
              </Link>
            </>
          ) : (
            <>
              <Link
                href="landing"
                className="text-sm bg-muted/50 py-2 px-3 rounded-md transition-colors"
              >
                General
              </Link>
              <Link
                href="landing/settings"
                className="text-sm hover:bg-muted/50 py-2 px-3 rounded-md transition-colors"
              >
                Settings
              </Link>
            </>
          )}
        </nav>
      </aside>
      {children}
    </main>
  );
}
