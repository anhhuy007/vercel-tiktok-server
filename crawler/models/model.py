import json

class Short:
    def __init__(self):
        self.title = ""
        self.video_url = ""
        self.thumbnail = ""
        self.views_original = ""
        self.views = ""
        self.youtube_video_id = ""
        self.channel_id = 0

    def __str__(self):
        return f"Title: {self.title}, Video URL: {self.video_url}, Thumbnail: {self.thumbnail}, Views Original: {self.views_original}, Views: {self.views}, Channel ID: {self.channel_id}"    
    
    def to_dict(self):
        return {
            "title": self.title,
            "video_url": self.video_url,
            "thumbnail": self.thumbnail,
            "views_original": self.views_original,
            "views": self.views,
            "youtube_video_id": self.youtube_video_id,
            "channel_id": self.channel_id
        }
    
    def from_dict(self, data):
        self.title = data["title"]
        self.video_url = data["link"]
        self.thumbnail = data["thumbnail"]
        self.views_original = data["views_original"]
        self.views = data["views"]
        self.youtube_video_id = data["video_id"]
        self.channel_id = data["channel_id"] if "channel_id" in data else 0

class User:
    def __init__(self):
        self.handle = ""
        self.subcribers = 0
        self.description = ""
        self.avatar_url = ""
        self.thumbnail_url = ""
        self.youtube_url = ""

    def __str__(self):
        return f"Handle: {self.handle}, Subscribers: {self.subcribers}, Description: {self.description}, Avatar URL: {self.avatar_url}, Thumbnail URL: {self.thumbnail_url}, Youtube URL: {self.youtube_url}"
    
    def to_dict(self):
        return {
            "handle": self.handle,
            "subcribers": self.subcribers,
            "description": self.description,
            "avatar_url": self.avatar_url,
            "thumbnail_url": self.thumbnail_url,
            "youtube_url": self.youtube_url
        }
    
    def from_dict(self, data):
        self.handle = data["handle"]
        self.subcribers = data["subcribers"]
        self.description = data["description"]
        self.avatar_url = data["avatar_url"]
        self.thumbnail_url = data["thumbnail_url"]
        self.youtube_url = data["youtube_url"]


class Account:
    def __init__(self):
        self.email = ""
        self.password = ""
        self.user = User()

    def __str__(self):
        return f"Email: {self.email}, Password: {self.password}, User: {self.user}"
    
    def to_dict(self):
        return {
            "email": self.email,
            "password": self.password,
            "user": self.user.to_dict()
        }
    
    def from_dict(self, data):
        self.email = data["email"]
        self.password = data["password"]
        self.user.from_dict(data["user"])