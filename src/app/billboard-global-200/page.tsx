import { BillboardGlobal200 } from "@/components/tables/billboard_global200";
import { Dot } from "@/components/color-dot";

export default function Page() {
  return (
    <main className="container">
      <Dot count={3} />
      <div className="max-w-5xl mx-auto">
        <BillboardGlobal200 />
      </div>
    </main>
  );
}
