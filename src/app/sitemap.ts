import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { pathsConfig } from "@/config/paths";

// Adapt this as necessary
const pathnames = ["", "/about"];
const host = `${siteConfig.url}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = pathnames.map((pathname) => ({
    url: `${host}${pathname === "/" ? "" : pathname}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const charts = pathsConfig.mainNav.map((navItem) => ({
    url: `${host}${navItem.href === "/" ? "" : navItem.href}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...charts];
}
