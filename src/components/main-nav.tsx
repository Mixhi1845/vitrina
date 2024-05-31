"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
interface MainNavProps {
  category1: string;
  category2: string;
  category3: string;
  category4: string;
  category5: string;
  about: string;
}

export function MainNav({
  category1,
  category2,
  category3,
  category4,
  category5,
  about,
}: MainNavProps) {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/netflix-top-10"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/netflix-top-10"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {category1}
        </Link>
        <Link
          href="/imdb-top-100"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/imdb-top-100")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {category2}
        </Link>
        <Link
          href="/billboard-global-200"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/billboard-global-200")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {category3}
        </Link>{" "}
        <Link
          href="/nyt-bestsellers"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/nyt-bestsellers")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {category4}
        </Link>
        <Link
          href="/most-relevant-memes"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/most-relevant-memes")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {category5}
        </Link>
        <Link
          href="/about"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/about")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {about}
        </Link>
      </nav>
    </div>
  );
}
