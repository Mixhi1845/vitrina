import { Netflix } from "@/types/table";
import { SiNetflix } from "react-icons/si";

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
import { Badge } from "../ui/badge";

export async function NetflixTV() {
  const file = await fs.readFile(
    process.cwd() + "/src/lib/json/netflix_tv.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="w-full">
        <div className="flex items-center">
          <h2 className="text-2xl">TV Shows - {data.data_title}</h2>
          <div className="size-8 p-1 border border-white/10 rounded-md bg-white/5 ml-4 flex items-center">
            <SiNetflix className="text-[#e50914] mx-auto" />
          </div>
        </div>
        <p className="text-muted-foreground">{data.data_desc}</p>
      </div>
      <div className="px-4 py-4 border border-white/10 rounded-md bg-white/5 shadow-[inset_0.75rem_0.75rem_1.5rem_rgba(255,255,255,0.05),0.5rem_0.5rem_1rem_rgba(0,0,0,0.5)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className="font-medium">Title</TableHead>
              <TableHead>Weeks in Charts</TableHead>
              <TableHead className="text-right">Views (Mil)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((item: Netflix) => (
              <TableRow key={item.rows}>
                <TableCell className="text-muted-foreground">
                  {item.rows}
                </TableCell>
                <TableCell className="font-medium">
                  {item.title}
                  {item.episode !== null && (
                    <>
                      <br />
                      <Badge variant="secondary">{item.episode}</Badge>
                    </>
                  )}
                </TableCell>
                <TableCell>{item.wks}</TableCell>
                <TableCell className="text-right">
                  {(item.views / 1000000).toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
