import Link from "next/link";
import { RxArrowRight } from "react-icons/rx";
import { Blocks } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export function Announcement() {
  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      <Blocks className="h-4 w-4" />{" "}
      <Separator className="mx-2 h-4" orientation="vertical" /> <span>--</span>
      <RxArrowRight className="ml-1 h-4 w-4" />
    </Link>
  );
}
