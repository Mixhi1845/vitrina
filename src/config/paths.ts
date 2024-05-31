import { MainNavItem, SidebarNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
}

export const pathsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Netflix",
      href: "/netflix-top-10",
    },
    {
      title: "IMDb",
      href: "/imdb-top-100",
    },
    {
      title: "Billboard",
      href: "/billboard-global-200",
    },
    {
      title: "NYT",
      href: "/nyt-bestsellers",
    },
    {
      title: "Memes",
      href: "/most-relevant-memes",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
};
