/*
    This file is used to create the database schema.
    LANGUAGE: POSTGRESQL
*/
DROP DATABASE IF EXISTS TIKTOK_DB;

CREATE DATABASE TIKTOK_DB;

CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_info (
    id SERIAL PRIMARY KEY,
    handle VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    follower INTEGER DEFAULT 0,
    following INTEGER DEFAULT 0,
    posts INTEGER DEFAULT 0,
    description TEXT,
    avatar_url TEXT,
    thumbnail_url TEXT,
    youtube_url TEXT
);

CREATE TABLE follower (
    id SERIAL PRIMARY KEY,
    host_id INTEGER NOT NULL,
    follower_id INTEGER NOT NULL
);

CREATE TABLE following (
    id SERIAL PRIMARY KEY,
    host_id INTEGER NOT NULL,
    following_id INTEGER NOT NULL
);

CREATE TABLE video (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    song VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    video_url TEXT,
    thumbnail_url TEXT,
    channel_id INTEGER NOT NULL
);

CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    video_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    commenter_id INTEGER NOT NULL,
    like_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0
);

CREATE TABLE likes (
    video_id INTEGER NOT NULL,
    liker_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (video_id, liker_id)
);

-- ADD FOREIGN KEY CONSTRAINT
ALTER TABLE user_info 
ADD CONSTRAINT fk_user_info_account 
FOREIGN KEY (id) REFERENCES account (id);

ALTER TABLE video
ADD CONSTRAINT fk_video_user_info
FOREIGN KEY (channel_id) REFERENCES user_info (id);

ALTER TABLE comment
ADD CONSTRAINT fk_comment_video
FOREIGN KEY (video_id) REFERENCES video (id);

ALTER TABLE comment
ADD CONSTRAINT fk_comment_user_info
FOREIGN KEY (commenter_id) REFERENCES user_info (id);

ALTER TABLE follower
ADD CONSTRAINT fk_follower_user_info
FOREIGN KEY (host_id) REFERENCES user_info (id);

ALTER TABLE follower
ADD CONSTRAINT fk_follower_user_info_2
FOREIGN KEY (follower_id) REFERENCES user_info (id);

ALTER TABLE following
ADD CONSTRAINT fk_following_user_info
FOREIGN KEY (host_id) REFERENCES user_info (id);

ALTER TABLE following
ADD CONSTRAINT fk_following_user_info_2
FOREIGN KEY (following_id) REFERENCES user_info (id);

