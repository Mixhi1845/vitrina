import requests
from bs4 import BeautifulSoup
import json


def scrape_imdb_data(url, output_file):
    page = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(page.content, "html.parser")

    top_items = []

    for i in range(1, 101):
        list_item = soup.select_one(
            f"li.ipc-metadata-list-summary-item:nth-of-type({i})"
        )
        if list_item:
            title = list_item.select_one("h3.ipc-title__text").text
            rank_text = list_item.select_one("div.meter-const-ranking").text
            rank = int(rank_text.split(" ")[0])

            year_element = list_item.select_one(
                f"span.cli-title-metadata-item:nth-of-type(1)"
            )
            if year_element:
                year = year_element.text.replace("\u2013", "-")
            else:
                year = "N/A"

            length_element = list_item.select_one(
                f"span.cli-title-metadata-item:nth-of-type(2)"
            )
            if length_element:
                length = length_element.text
            else:
                length = "N/A"

            age_element = list_item.select_one(
                f"span.cli-title-metadata-item:nth-of-type(3)"
            )
            if age_element:
                age = age_element.text
            else:
                age = "N/A"

            rating_text = list_item.select_one("span.ipc-rating-star").text
            if "\xa0" in rating_text:
                rating, num_votes = rating_text.split("\xa0")
                num_votes = num_votes.strip("()")
            else:
                rating = rating_text
                num_votes = "N/A"

            anchor = list_item.select_one("a.ipc-title-link-wrapper")
            if anchor:
                href = anchor.get("href")

        info = {
            "title": title.strip(),
            "rank": rank,
            "year": year,
            "length": length.strip(),
            "age": age.strip(),
            "href": href,
            "rating": rating,
            "num_votes": num_votes,
        }
        top_items.append(info)

    data = soup.select("hgroup")
    if data:
        data_title = soup.select_one("h1.ipc-title__text")
        data_desc = soup.select_one("div.ipc-title__description")

    nested_data = {
        "data_title": data_title.text.strip(),
        "data_desc": data_desc.text.strip(),
        "data": top_items,
    }

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(nested_data, f, indent=4)


# Scrape Most Popular Movies
scrape_imdb_data(
    "https://www.imdb.com/chart/moviemeter/", "src/lib/json/imdb_moviemeter.json"
)

# Scrape Most Popular TV Shows
scrape_imdb_data(
    "https://www.imdb.com/chart/tvmeter/", "src/lib/json/imdb_tvmeter.json"
)
