class Video {
    constructor(id, youtube_id, title, likes, comments, views, song, created_at, video_url, thumbnail_url, channel_id) {
      this.id = id || 0;
      this.youtube_id = youtube_id || '';
      this.title = title || '';
      this.likes = likes || 0;
      this.comments = comments || 0;
      this.views = views || 0;
      this.song = song || '';
      this.created_at = created_at || '';
      this.video_url = video_url || '';
      this.thumbnail_url = thumbnail_url || '';
      this.channel_id = channel_id || '';
    }

    toString() {
      return `Video: ${this.id} ${this.youtube_id} ${this.title} ${this.likes} ${this.comments} ${this.views} ${this.song} ${this.created_at} ${this.video_url} ${this.thumbnail_url} ${this.channel_id}`;
    }

    toJSON() {
      return {
        id: this.id,
        youtube_id: this.youtube_id,
        title: this.title,
        likes: this.likes,
        comments: this.comments,
        views: this.views,
        song: this.song,
        created_at: this.created_at,
        video_url: this.video_url,
        thumbnail_url: this.thumbnail_url,
        channel_id: this.channel_id
      };
    }
}

class User {
    constructor(id, youtube_id, handle, name, follower, following, posts, description, avatar_url, thumbnail_url, youtube_url) {
      this.id = id || 0;
      this.youtube_id = youtube_id || '';
      this.handle = handle || '';
      this.name = name || '';
      this.follower = follower || 0;
      this.following = following || 0;
      this.posts = posts || 0;
      this.description = description || '';
      this.avatar_url = avatar_url || '';
      this.thumbnail_url = thumbnail_url || '';
      this.youtube_url = youtube_url || '';
    }

    toString() {
      return `User: ${this.id} ${this.youtube_id} ${this.handle} ${this.name} ${this.follower} ${this.following} ${this.posts} ${this.description} ${this.avatar_url} ${this.thumbnail_url} ${this.youtube_url}`;
    }

    toJSON() {
      return {
        id: this.id,
        youtube_id: this.youtube_id,
        handle: this.handle,
        name: this.name,
        follower: this.follower,
        following: this.following,
        posts: this.posts,
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