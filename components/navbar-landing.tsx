"use client";
import { Typography } from "@/components/ui/typography";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavbarLanding() {
  return (
    <header className="container fixed inset-x-0 w-full z-50">
      <nav className="relative z-50 flex items-center justify-between border border-muted rounded-md bg-background/90 backdrop-blur-md my-6 p-4">
        <Typography.Heading level={4}>WebTP</Typography.Heading>
        <section className="flex items-center gap-4">
          <Link
            href="signin"
            className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
          >
            Pricing
          </Link>
          <Link
            href="signin"
            className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
          >
            Docs
          </Link>
          <Link
            href="signin"
            className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
          >
            Docs
          </Link>
        </section>
        <Link href="signin" className={cn(buttonVariants({ size: "sm" }))}>
          Sign In
        </Link>
      </nav>
    </header>
  );
}
