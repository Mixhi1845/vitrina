import { IMDb } from "@/types/table";
import { LiaImdb } from "react-icons/lia";
import { RxStarFilled } from "react-icons/rx";

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

export async function ImdbTVmeter() {
  const file = await fs.readFile(
    process.cwd() + "/src/lib/json/imdb_tvmeter.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="w-full">
        <div className="flex items-center">
          <h2 className="text-2xl">{data.data_title}</h2>
          <div className=" border border-white/10 rounded-md bg-white/5 ml-4">
            <LiaImdb className="text-[#e2b616] h-8 w-12 " />
          </div>
        </div>
      </div>
      <div className="px-4 py-4 border border-white/10 rounded-md bg-white/5 shadow-[inset_0.75rem_0.75rem_1.5rem_rgba(255,255,255,0.05),0.5rem_0.5rem_1rem_rgba(0,0,0,0.5)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className="font-medium">Title</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((item: IMDb) => (
              <TableRow key={item.rank}>
                <TableCell className="text-muted-foreground">
                  {item.rank}
                </TableCell>
                <TableCell>
                  <span className="font-medium">{item.title}</span>
                  <div className="space-x-2">
                    <Badge variant="secondary">{item.year}</Badge>
                    <Badge variant="secondary">{item.length}</Badge>
                    <Badge
                      className="hidden md:inline-flex"
                      variant="secondary"
                    >
                      {item.age}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="text-right flex items-center">
                    <RxStarFilled className="text-[#e2b616] p-1/2 mr-2" />
                    <span>{item.rating}</span>
                  </div>
                  <Badge variant="secondary">{item.num_votes}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
