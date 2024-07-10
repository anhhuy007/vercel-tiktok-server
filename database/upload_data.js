const postgres = require('./database_wrapper')
const fs = require('fs')
const path = require('path')

const uploadAccounts = async (req, res) => {
    console.log("Uploading accounts...")
    const query1 = `CREATE TABLE account (
                        id SERIAL PRIMARY KEY,
                        username VARCHAR(50) NOT NULL UNIQUE,
                        email VARCHAR(255) NOT NULL UNIQUE,
                        password VARCHAR(255) NOT NULL,
                        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
                    );`

    const query2 = `INSERT INTO account (id, username, email, password, created_at) VALUES
                    (1, 'alice123', 'alice@example.com', '123', '2024-05-21 12:00:00+07'),
                    (2, 'bob456', 'bob@example.com', 'another_secret', '2024-05-20 18:30:00+07'),
                    (3, 'john_doe', 'john@example.com', 'secure_password123', '2024-05-22 09:00:00+07'),
                    (4, 'jane_smith', 'jane@example.com', 'another_secure_pwd', '2024-05-21 15:30:00+07');
                    `

    try {
        await postgres.query(query1)
        await postgres.query(query2)
        console.log("Accounts uploaded successfully")
    }
    catch (error) {
        console.log(error)
    }
}

// return list of videos from json file
const fetchvideos = async (id) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../crawler/data/shorts.json')
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log('Error reading videos file')
                reject(err)
            } else {
                console.log('Reading videos file successful')
                console.log('Number of videos: ' + JSON.parse(data).length)
                var result = JSON.parse(data)
                result = result.slice(id, id + 20)
                console.log('Number of videos to upload: ' + result.length)
                resolve(result)
            }
        })
    })
}

// sample song name and sound effect in video
const songs = ['Dance Monkey', 'Shape of You', 'Blinding Lights', 'Uptown Funk', 'Despacito', 'Baby Shark', 'Lean On', 'See You Again', 'Counting Stars', 'Shake It Off', 'Thinking Out Loud', 'Cheap Thrills', 'Love Yourself', 'Let Her Go', 'Stressed Out', 'One Dance'];

const uploadVideos = async (req, res) => {
    const id = req.params.id
    const videos = await fetchvideos(id)
    console.log(videos.length)
    const query = ` INSERT INTO video 
    (title, likes, comments, views, song, created_at, video_url, thumbnail_url, channel_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

    try {
        await Promise.all(videos.map(async (video) => {
            // copy video object and add more fields
            // random date between 2020-01-01 and now
            startDate = new Date(2020, 0, 1)
            endDate = new Date()
            randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
            randomTimeStamp = randomDate.toISOString().slice(0, 19).replace('T', ' ')
            video.created_at = randomTimeStamp
            video.likes = Math.floor(Math.random() * 1000)
            video.comments = Math.floor(Math.random() * 100)
            video.views = Math.floor(Math.random() * 10000)
            video.channel_id = Math.floor(Math.random() * 9) + 1
            // random song name
            video.song = songs[Math.floor(Math.random() * songs.length)]

            console.log(video)
            await postgres.query(query, [video.title, video.likes, video.comments, video.views, video.song, video.created_at, video.video_url, video.thumbnail_url, video.channel_id])}))
        console.log("videos uploaded successfully")
    } catch (error) {
        console.log(error)
    }
}

const fetchComments = async (id) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../crawler/data/comments.json')
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log('Error reading comments file')
                reject(err)
            } else {
                var result = JSON.parse(data)

                // get first 20 comments, starting from index id
                result = result.slice(id, id + 20)

                resolve(result)
            }
        })
    })
}

const uploadComments = async (req, res) => {
    const id = req.params.id
    const comments = await fetchComments(id)
    const query = `
        INSERT INTO comment (video_id, content, created_at, commenter_id, like_count, reply_count)
        VALUES ($1, $2, $3, $4, $5, $6)
    `

    try {
        await Promise.all(comments.map(async (comment) => {
            console.log(comment)
            comment.video_id = Math.floor(Math.random() * 38) + 1
            comment.commenter_id = Math.floor(Math.random() * 10) + 1
            startDate = new Date(2020, 0, 1)
            endDate = new Date()
            randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
            randomTimeStamp = randomDate.toISOString().slice(0, 19).replace('T', ' ')
            comment.created_at = randomTimeStamp
            await postgres.query(query, [comment.video_id, comment.content, comment.created_at, comment.commenter_id, comment.like_count, comment.reply_count])
        }))
        console.log("Comments uploaded successfully")
    } catch (error) {
        console.log(error)
    }
}

const uploadFollowers = async (req, res) => {
    const query = `
        INSERT INTO follower (host_id, follower_id)
        VALUES ($1, $2)
    `

    try {
        for (let i = 1; i <= 10; i++) {
            random_host = Math.floor(Math.random() * 10) + 1
            random_follower = Math.floor(Math.random() * 10) + 1
            if (random_host != random_follower) {
                await postgres.query(query, [random_host, random_follower])
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { uploadAccounts, uploadVideos, uploadComments, uploadFollowers }