import { LIMCpopular } from "@/components/tables/limc_most_watched_videos";
import { Dot } from "@/components/color-dot";

export default function Page() {
  return (
    <main className="container">
      <Dot count={3} />
      <div className="max-w-5xl mx-auto">
        <LIMCpopular />
      </div>
    </main>
  );
}
