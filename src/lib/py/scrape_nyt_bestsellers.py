import requests
from bs4 import BeautifulSoup
import json


def scrape_imdb_data(url, output_file):
    page = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(page.content, "html.parser")

    top_items = []

    chart_item = soup.select_one(f"div.css-v2kl5d:nth-of-type(2)")
    for j in range(1, 6):
        list_item = chart_item.select_one(f"li.css-19afmtv:nth-of-type({j})")
        if list_item:
            title = list_item.select_one("h3.css-i1z3c1")
            author = list_item.select_one("p.css-1nxjbfc")
            wks = list_item.select_one("p.css-t7cods")
            desc = list_item.select_one("p.css-5yxv3r")

        info = {
            "title": title.text.strip(),
            "author": author.text.strip(),
            "wks": wks.text.strip(),
            "desc": desc.text.strip(),
        }
        top_items.append(info)

    data_desc = soup.select_one("h2.css-2j7wu4")
    data_updated = soup.select_one("time.css-6068ga")

    nested_data = {
        "data_desc": data_desc.text.strip(),
        "data_updated": data_updated.text.strip(),
        "data": top_items,
    }

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(nested_data, f, indent=4)


# Scrape Most Popular Movies
scrape_imdb_data(
    "https://www.nytimes.com/books/best-sellers/", "src/lib/json/nyt_bestsellers.json"
)
