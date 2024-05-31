import { NYT } from "@/types/table";
import { SiNewyorktimes } from "react-icons/si";
import { RxInfoCircled } from "react-icons/rx";

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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export async function NYTBestsellers() {
  const file = await fs.readFile(
    process.cwd() + "/src/lib/json/nyt_bestsellers.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="w-full">
        <div className="flex items-center">
          <h2 className="text-2xl">Top 10 Bestsellers</h2>
          <div className="p-1 border size-8 border-white/10 rounded-md bg-white/5 ml-4 flex items-center">
            <SiNewyorktimes className="size-4 mx-auto" />
          </div>
        </div>
        <p className="text-muted-foreground">{data.data_desc}</p>
      </div>
      <div className="px-4 py-4 border border-white/10 rounded-md bg-white/5 shadow-[inset_0.75rem_0.75rem_1.5rem_rgba(255,255,255,0.05),0.5rem_0.5rem_1rem_rgba(0,0,0,0.5)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((item: NYT) => (
              <TableRow key={item.title}>
                <TableCell>
                  <div className="flex items-center">
                    <span className="font-medium">{item.title}</span>
                    <Popover>
                      <PopoverTrigger>
                        <RxInfoCircled />
                      </PopoverTrigger>
                      <PopoverContent>{item.desc}</PopoverContent>
                    </Popover>
                  </div>
                  <Badge variant="secondary">{item.wks}</Badge>
                </TableCell>
                <TableCell>{item.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
