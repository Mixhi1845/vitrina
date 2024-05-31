import { BillboardGlobal200 } from "@/components/tables/billboard_global200";

export default function Page() {
  return (
    <main className="max-w-3xl text-sm md:text-lg mx-auto prose">
      <p>
        This page provides weekly updated charts and lists covering the latest
        trends and rankings in the entertainment industry, including the top
        songs from the authoritative Billboard music charts; movie and TV show
        data from IMDb; the popularity and virality of the latest internet
        memes; the most-watched shows and movies on the popular streaming
        platform Netflix based on their public viewership data; and weekly
        updates on the best-selling books.
      </p>
      <p>
        All the information on this page is intended to be objective and
        informative, allowing users to stay up-to-date on the evolving landscape
        of entertainment and popular culture. The charts and lists are updated
        on a regular basis, so be sure to check back frequently for the latest
        insights.
      </p>
      <p>
        This page is an open-source project. We welcome contributions and
        feedback from the community to help improve the quality and breadth of
        the content.
      </p>
      <p>
        This project is inspired by{" "}
        <a className="underline" href="https://github.com/sebsebmc">
          sebsebmc on github
        </a>
        . The data is scraped from websites every Saturday at midnight and then
        pushed to a GitHub repository. Then the page is redeployed on Vercel,
        making the entire process free.
      </p>
    </main>
  );
}
