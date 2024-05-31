import { YouTube } from "@/types/table";
import { SiYoutube } from "react-icons/si";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { promises as fs } from "fs";
import { format, parseISO } from "date-fns";

function formatViewCount(viewCount: number): string {
  if (viewCount >= 1000000) {
    return `${(viewCount / 1000000).toFixed(1)} Mil`;
  } else if (viewCount >= 1000) {
    return `${(viewCount / 1000).toFixed(1)}k`;
  } else {
    return viewCount.toLocaleString();
  }
}

export async function LIMCpopular() {
  const file = await fs.readFile(
    process.cwd() + "/src/lib/json/limc_most_watched_videos.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="w-full">
        <div className="flex items-center">
          <h2 className="text-2xl">Memes - last 3 Months</h2>
          <div className="p-1 border size-8 border-white/10 rounded-md bg-white/5 ml-4 flex items-center">
            <SiYoutube className="size-4 mx-auto text-[#bf0000]" />
          </div>
        </div>
        <p className="text-muted-foreground">
          Sourced from{" "}
          <a className="anchordesc" href="https://www.youtube.com/@LIMC">
            Lessons in Meme Culture
          </a>
        </p>
      </div>
      <div className="px-4 py-4 border border-white/10 rounded-md bg-white/5 shadow-[inset_0.75rem_0.75rem_1.5rem_rgba(255,255,255,0.05),0.5rem_0.5rem_1rem_rgba(0,0,0,0.5)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className="font-medium">Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: YouTube, index: number) => (
              <TableRow key={index}>
                <TableCell className="text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium flex items-center">
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="w-20 mr-4"
                  />
                  <a className="anchor" href={item.video_url} target="_blank">
                    {item.title}
                  </a>
                </TableCell>
                <TableCell>
                  {format(parseISO(item.published_at), "do MMMM yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  {formatViewCount(Number(item.view_count))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
