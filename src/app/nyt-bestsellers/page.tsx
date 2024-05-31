import { NYTBestsellers } from "@/components/tables/nyt_bestsellers";
import { Dot } from "@/components/color-dot";

export default function Home() {
  return (
    <main className="container">
      <Dot count={1} />
      <div className="max-w-5xl mx-auto">
        <NYTBestsellers />
      </div>
    </main>
  );
}
