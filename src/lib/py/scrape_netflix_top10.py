import requests
from bs4 import BeautifulSoup
import json


def scrape_netflix_data(url, output_file):
    page = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(page.content, "html.parser")

    top_items = []

    table = soup.select_one("table")
    rows = table.select("tr")[1:]  # Skip the first row

    for row in rows:
        rank_element = row.select_one("td:nth-of-type(1)")
        if rank_element:
            rank = int(rank_element.text)
        else:
            rank = "N/A"

        title_element = row.select_one("td:nth-of-type(2)")
        if title_element:
            title_text = title_element.text.strip()
            if ":" in title_text:
                title, episode = title_text.split(":", 1)
                title = title.strip()
                episode = episode.strip()
            else:
                title = title_text
                episode = None
        else:
            title = "N/A"
            episode = None

        wks_element = row.select_one("td:nth-of-type(3)")
        if wks_element:
            wks = int(wks_element.text)
        else:
            wks = "N/A"

        views_element = row.select_one("td:nth-of-type(6)")
        if views_element:
            views = int(views_element.text.replace(",", ""))
        else:
            views = "N/A"

        info = {
            "rows": rank,
            "title": title,
            "episode": episode,
            "wks": wks,
            "views": views,
        }
        top_items.append(info)

    data_title = soup.select("span.pagetext")[5]
    data_desc = soup.select("span.pagetext")[6]
    data_updated = soup.select("div.uppercase")[10]

    nested_data = {
        "data_title": data_title.text.strip(),
        "data_desc": data_desc.text.strip(),
        "data_updated": data_updated.text.strip(),
        "data": top_items,
    }

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(nested_data, f, indent=4)


# Scrape Most Popular Movies
scrape_netflix_data(
    "https://www.netflix.com/tudum/top10", "src/lib/json/netflix_movie.json"
)

# Scrape Most Popular TV Shows
scrape_netflix_data(
    "https://www.netflix.com/tudum/top10/tv", "src/lib/json/netflix_tv.json"
)
