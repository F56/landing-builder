import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  return (
    <div className="col-span-12 lg:col-span-9 flex flex-col">
      <header className="py-4 lg:pl-4 flex flex-row items-center justify-between border-b">
        <h1 className="text-sm font-bold leading-tight">
          Workspace - Landings
        </h1>
        <Button size="sm">
          <PlusIcon className="mr-2" />
          <span>New landing</span>
        </Button>
      </header>
      <div className="flex-1 grid grid-cols-12 auto-rows-min py-4 lg:pl-4 gap-4">
        <Card className="col-span-12 md:col-span-6 xl:col-span-4 rounded-md">
          <div className="h-48 bg-muted/20 p-4 border-b">
            <Badge variant="secondary">Draft</Badge>
          </div>
          <CardHeader className="p-4">
            <div className="flex flex-row items-center justify-between space-x-4">
              <CardTitle className="text-sm">Landing page</CardTitle>
              <Link
                href="dashboard/landing"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" })
                )}
              >
                <DotsHorizontalIcon />
              </Link>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
