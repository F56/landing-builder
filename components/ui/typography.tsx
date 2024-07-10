"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React, { ElementType } from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
}

const levels = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

const headingVariants = cva("text-primary", {
  variants: {
    variant: {
      1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      2: "scroll-m-20 border-b border-primary pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      4: "scroll-m-20 text-xl font-semibold tracking-tight",
    },
  },
  defaultVariants: {
    variant: 1,
  },
});

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, className, level, ...props }, ref) => {
    const Component = (level ? levels[level] : levels[1]) as ElementType<
      HeadingProps,
      "h1" | "h2" | "h3" | "h4"
    >;
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ variant: level }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6 text-primary",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

Paragraph.displayName = "Paragraph";

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ children, className, ...props }, ref) => {
  return (
    <blockquote
      ref={ref}
      className={cn("mt-6 border-l-2 pl-6 italic text-primary", className)}
      {...props}
    >
      {children}
    </blockquote>
  );
});

Blockquote.displayName = "Blockquote";

export const Typography = { Heading, Paragraph, Blockquote };
