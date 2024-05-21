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

class Comment {
  constructor(id, short_id, content, created_at, commenter_id, like_count, reply_count) {
    this.id = id || 0;
    this.short_id = short_id || '';
    this.content = content || '';
    this.created_at = created_at || '';
    this.commenter_id = commenter_id || '';
    this.like_count = like_count || 0;
    this.reply_count = reply_count || 0;
  }

  toString() {
    return `Comment: ${this.id} ${this.short_id} ${this.content} ${this.created_at} ${this.commenter_id} ${this.like_count} ${this.reply_count}`;
  }

  toJSON() {
    return {
      id: this.id,
      short_id: this.short_id,
      content: this.content,
      created_at: this.created_at,
      commenter_id: this.commenter_id,
      like_count: this.like_count,
      reply_count: this.reply_count
    };
  }
}

class Like {
  constructor(id, short_id, liker_id) {
    this.id = id || 0;
    this.short_id = short_id || '';
    this.liker_id = liker_id || '';
  }

  toString() {
    return `Like: ${this.id} ${this.short_id} ${this.liker_id}`;
  }

  toJSON() {
    return {
      id: this.id,
      short_id: this.short_id,
      liker_id: this.liker_id
    };
  }
}

module.exports = { Short, User, Comment, Like };