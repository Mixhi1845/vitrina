import requests
from bs4 import BeautifulSoup
import json


def scrape_billboard_data(url, output_file):
    page = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(page.content, "html.parser")

    top_items = []

    for i in range(2, 250):
        list_item = soup.select_one(
            f"div.o-chart-results-list-row-container:nth-of-type({i})"
        )
        if list_item:

            col1_item = list_item.select_one(
                f"li.o-chart-results-list__item:nth-of-type({1})"
            )
            if col1_item:
                id = int(col1_item.select_one("span.c-label").text.strip())

            # TODO: Album hrefs

            col3_item = list_item.select_one(
                f"li.o-chart-results-list__item:nth-of-type({3})"
            )
            if col3_item:
                type = col3_item.select_one("span.c-label")
                if type:
                    type = type.text.strip().replace("\n", "")
                else:
                    type = None

            col4_item = list_item.select_one(f"li.lrv-u-width-100p")
            if col4_item:
                title = col4_item.select_one("h3.c-title").text.strip()
                artist = col4_item.select_one("span.c-label").text.strip()
                col4_1_item = list_item.select_one(
                    f"li.o-chart-results-list__item:nth-of-type({5})"
                )
                if col4_1_item:
                    peak = int(col4_1_item.select_one("span.c-label").text.strip())
                col4_2_item = list_item.select_one(
                    f"li.o-chart-results-list__item:nth-of-type({6})"
                )
                if col4_2_item:
                    wks = int(col4_2_item.select_one("span.c-label").text.strip())

        info = {
            "id": id,
            "title": title,
            "artist": artist,
            "type": type,
            "peak": peak,
            "wks": wks,
        }
        if info not in top_items:
            top_items.append(info)

    data = soup.select_one("div.pmc-paywall")
    if data:
        data_title = soup.select_one("h1.c-heading")
        data_desc = soup.select("p.c-tagline")[0]
        data_date = soup.select("p.c-tagline")[6]

    nested_data = {
        "data_title": data_title.text.strip(),
        "data_desc": data_desc.text.strip(),
        "data_date": data_date.text.strip(),
        "data": top_items,
    }

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(nested_data, f, indent=4)


# Scrape Most Popular Movies
scrape_billboard_data(
    "https://www.billboard.com/charts/billboard-global-200/",
    "src/lib/json/billboard_global200.json",
)
