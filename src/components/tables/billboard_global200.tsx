import { Billboard } from "@/types/table";
import { SiBillboard } from "react-icons/si";

import { promises as fs } from "fs";
import { Badge } from "@/components/ui/badge";
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

export async function BillboardGlobal200() {
  const file = await fs.readFile(
    process.cwd() + "/src/lib/json/billboard_global200.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="w-full">
        <div className="flex items-center">
          <h2 className="text-2xl">Global 200</h2>
          <div className="p-1 h-8 border border-white/10 rounded-md bg-white/5 ml-4 flex items-center">
            <SiBillboard className="mx-auto" />
          </div>
        </div>
        <p className="text-muted-foreground">{data.data_desc}</p>
      </div>
      <div className="px-4 py-4 border border-white/10 rounded-md bg-white/5 shadow-[inset_0.75rem_0.75rem_1.5rem_rgba(255,255,255,0.05),0.5rem_0.5rem_1rem_rgba(0,0,0,0.5)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className="font-medium">Song</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Peak</TableHead>
              <TableHead>Weeks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((item: Billboard) => (
              <TableRow key={item.id}>
                <TableCell className="text-muted-foreground">
                  {item.id}
                </TableCell>
                <TableCell>
                  <span className="font-medium">{item.title}</span>
                  {item.type !== null && (
                    <>
                      <br />
                      <Badge variant="secondary">{item.type}</Badge>
                    </>
                  )}
                </TableCell>
                <TableCell>{item.artist}</TableCell>
                <TableCell>{item.peak}</TableCell>
                <TableCell>{item.wks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
