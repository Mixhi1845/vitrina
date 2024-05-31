import { ImdbMoviemeter } from "@/components/tables/imdb_tvmoviemeter";
import { ImdbTVmeter } from "@/components/tables/imdb_tvmeter";
import { Dot } from "@/components/color-dot";

export default function Page() {
  return (
    <main className="container">
      <Dot variant="imdb" count={3} />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ImdbMoviemeter />
        <ImdbTVmeter />
      </div>
    </main>
  );
}
