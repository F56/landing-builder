"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroLanding() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center container"
      >
        <Typography.Heading className="mb-10 text-center max-w-screen-md">
          Build landing pages fast and easy without coding for React.
        </Typography.Heading>
        <Link
          href="/org/dashboard"
          className={cn(buttonVariants({ size: "xl" }))}
        >
          <span>Try now for free</span>
          <ArrowRightIcon className="ml-2" />
        </Link>
        <Typography.Paragraph className="text-muted-foreground text-sm">
          No credit card required (*)
        </Typography.Paragraph>
      </motion.div>
    </AuroraBackground>
  );
}
