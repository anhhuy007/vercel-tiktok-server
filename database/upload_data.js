const postgre = require('./database')
const fs = require('fs')
const path = require('path')

// youtube short table
const createShortTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS short (
            id SERIAL PRIMARY KEY,
            youtube_id VARCHAR(255),
            title VARCHAR(255),
            video_url VARCHAR(255),
            thumbnail_url VARCHAR(255),
            views INT,
            channel_id VARCHAR(255),
        )
    `;

    try {
        // await postgre.query(query)
        console.log("Short table created successfully")
    } catch (error) {
        console.log(error)
    }
}

// return list of shorts from json file
const fetchShorts = async () => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../crawler/data/shorts.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log('Error reading shorts file');
                reject(err);
            } else {
                const result = JSON.parse(data);
                resolve(result);
            }
        });
    });
}

const uploadShorts = async () => {
    const shorts = await fetchShorts();
    const query = `
        INSERT INTO short (youtube_id, title, video_url, thumbnail_url, views, channel_id)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;

    try {
        await Promise.all(shorts.map(async (short) => {
            console.log(short);
            await postgre.query(query, [short.youtube_id, short.title, short.video_url, short.thumbnail_url, short.views, short.channel_id]);
        }));
        console.log("Shorts uploaded successfully");
    } catch (error) {
        console.log(error);
    }
}

const fetchComments = async () => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../crawler/data/comments.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log('Error reading comments file');
                reject(err);
            } else {
                const result = JSON.parse(data);
                resolve(result);
            }
        });
    });
}

const uploadComments = async () => {
    const comments = await fetchComments();
    const query = `
        INSERT INTO comment (short_id, content, created_at, commenter_id, like_count, reply_count)
        VALUES ($1, $2, $3, $4, $5)
    `;

    try {
        await Promise.all(comments.map(async (comment) => {
            console.log(comment);
            await postgre.query(query, [comment.short_id, comment.content, comment.created_at, comment.commenter_id, comment.like_count, comment.reply_count]);
        }));
        console.log("Comments uploaded successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createShortTable, uploadShorts, uploadComments }