import os
import json
import datetime
from googleapiclient.discovery import build

api_key = os.environ["YOUTUBE_API_KEY"]
youtube = build("youtube", "v3", developerKey=api_key)

channel_id = "UCaHT88aobpcvRFEuy4v5Clg"
now = datetime.datetime.now()
three_months_ago = now - datetime.timedelta(days=90)
published_after = three_months_ago.strftime("%Y-%m-%dT%H:%M:%SZ")


def fetch_videos(channel_id, published_after, max_results=50):
    request = youtube.search().list(
        part="snippet",
        channelId=channel_id,
        publishedAfter=published_after,
        maxResults=max_results,
        order="viewCount",
        type="video",
    )
    response = request.execute()
    return response["items"]


def fetch_video_details(video_ids):
    request = youtube.videos().list(
        part="snippet,contentDetails,statistics", id=",".join(video_ids)
    )
    response = request.execute()
    return response["items"]


def get_most_watched_videos(channel_id, published_after):
    videos = fetch_videos(channel_id, published_after)
    video_ids = [video["id"]["videoId"] for video in videos]
    video_details = fetch_video_details(video_ids)

    video_data = []
    for video in video_details:
        video_info = {
            "video_id": video["id"],
            "title": video["snippet"]["title"],
            "description": video["snippet"]["description"],
            "published_at": video["snippet"]["publishedAt"],
            "view_count": video["statistics"]["viewCount"],
            "thumbnail_url": video["snippet"]["thumbnails"]["high"]["url"],
            "video_url": f"https://www.youtube.com/watch?v={video['id']}",
        }
        video_data.append(video_info)

    return video_data


def save_to_json(data, filename="src/lib/json/limc_most_watched_videos.json"):
    with open(filename, "w") as json_file:
        json.dump(data, json_file, indent=4)


if __name__ == "__main__":
    video_data = get_most_watched_videos(channel_id, published_after)
    save_to_json(video_data)
