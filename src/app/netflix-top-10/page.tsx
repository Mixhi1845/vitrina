import { NetflixTV } from "@/components/tables/netflix_tv";
import { NetflixMovie } from "@/components/tables/netflix_movie";
import { Dot } from "@/components/color-dot";

export default function Page() {
  return (
    <main className="container">
      <Dot variant="netflix" count={1} />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <NetflixTV />
        <NetflixMovie />
      </div>
    </main>
  );
}
