class Short {
    constructor(id, title, video_url, thumbnail_url, views, youtube_video_id, channel_id) {
      this.id = id || 0;
      this.title = title || '';
      this.video_url = video_url || '';
      this.thumbnail_url = thumbnail_url || '';
      this.views = views || 0;
      this.youtube_video_id = youtube_video_id || '';
      this.channel_id = channel_id || '';
    }
  
    toString() {
      return `Short: ${this.id} ${this.title} ${this.video_url} ${this.thumbnail_url} ${this.views} ${this.youtube_video_id} ${this.channel_id}`;
    }
  
    toJSON() {
      return {
        id: this.id,
        title: this.title,
        video_url: this.video_url,
        thumbnail_url: this.thumbnail_url,
        views: this.views,
        youtube_video_id: this.youtube_video_id,
        channel_id: this.channel_id
      };
    }    
}

class User {
    constructor(id, youtube_id, handle, name, subscribers, description, avatar_url, thumbnail_url, youtube_url) {
      this.id = id || 0;
      this.youtube_id = youtube_id || '';
      this.handle = handle || '';
      this.name = name || '';
      this.subscribers = subscribers || 0;
      this.description = description || '';
      this.avatar_url = avatar_url || '';
      this.thumbnail_url = thumbnail_url || '';
      this.youtube_url = youtube_url || '';
    }

    toString() {
      return `User: ${this.id} ${this.youtube_id} ${this.handle} ${this.name} ${this.subscribers} ${this.description} ${this.avatar_url} ${this.thumbnail_url} ${this.youtube_url}`;
    }

    toJSON() {
      return {
        id: this.id,
        youtube_id: this.youtube_id,
        handle: this.handle,
        name: this.name,
        subscribers: this.subscribers,
        description: this.description,
        avatar_url: this.avatar_url,
        thumbnail_url: this.thumbnail_url,
        youtube_url: this.youtube_url
      };
    }
}

module.exports = { Short, User };