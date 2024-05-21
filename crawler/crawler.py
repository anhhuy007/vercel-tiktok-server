import random
from serpapi import GoogleSearch
import urllib.request as req
from models.model import Short
import csv, json, os
from local_lib.pytube.__main__ import YouTube as youtube
def remove_icon_characters(text):
    # Filter out non-ASCII characters
    cleaned_text = ''.join(char for char in text if ord(char) < 128)
    
    return cleaned_text

def shorts_query(query: str):
    params = {
        "engine": "youtube",
        "search_query": query,
        "gl": "vn", # country to search from
        "api_key": "74f1a6220f51f76129b5b4570854bd9a785bb303f7d576d89c2deb3eaf865a2a"
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    shorts_results = results["shorts_results"]

    # convert the results to a list of dictionaries
    shorts = []

    for page in shorts_results:
        for short in page['shorts']:
            short_data = {
                "title": remove_icon_characters(short['title']),
                "link": short['link'],
                "thumbnail": short['thumbnail'],
                "views_original": short['views_original'],
                "views": short['views'],
                "video_id": short['video_id']
            }
            
            short_model = Short()
            short_model.from_dict(short_data)

            # random channel id from 1..30
            short_model.channel_id = random.randint(1, 30)

            print(short_model)
            shorts.append(short_model.to_dict())

    return shorts

def video_query(query: str):
    params = {
    "engine": "youtube",
    "gl": "vn", # country to search from
    "search_query": query,
    "api_key": "74f1a6220f51f76129b5b4570854bd9a785bb303f7d576d89c2deb3eaf865a2a",
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    video_results = results["video_results"]

    print(video_results)

def write_to_csv(data, filename):
    path = os.path.join("data", filename)
    # continue writing to the file
    with open(path, mode='a', newline='') as file:
        writer = csv.writer(file)
        # just write short youtube id to file
        for short in data:
            writer.writerow([short['youtube_video_id']])

def write_to_json(data, filename):
    path = os.path.join("data", filename)
    with open(path, 'w') as file:
        json.dump(data, file)

def download_video(url, filename):
    output_path = os.path.join("short_videos")
    try:
        yt = youtube(url)
        stream = yt.streams.get_highest_resolution()
        if stream:
            stream.download(output_path=output_path, filename=filename)
            return True
    except Exception as e:
        print("Video ", filename, "download failed: ", e)
        return False

def download_videos(shorts, num_videos=10):
    youtube_path = 'https://www.youtube.com/watch?v='
    downloaded_shorts = []
    cnt = 0
    for short in shorts:
        if cnt >= num_videos:
            break
        try:
            url = youtube_path + short['youtube_video_id']
            file_name = short['youtube_video_id'] + '.mp4'
            if download_video(url, file_name):
                downloaded_shorts.append(short)
                cnt += 1

        except Exception as e:
            print("Error:", e)
    
    return downloaded_shorts


def main():
    # download the video 
    shorts = shorts_query("cooking")
    downloaded_shorts = download_videos(shorts, 15)
    # write_to_json(shorts, "shorts.json")
    write_to_csv(downloaded_shorts, "short_ids.csv")

if __name__ == "__main__":
    main()

