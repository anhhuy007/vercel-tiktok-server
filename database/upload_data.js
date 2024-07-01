const postgres = require('./database')
const fs = require('fs')
const path = require('path')

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
                resolve(result)
            }
        })
    })
}

// sample song name and sound effect in video
const songs = ['Dance Monkey', 'Shape of You', 'Blinding Lights', 'Uptown Funk', 'Despacito', 'Baby Shark', 'Lean On', 'See You Again', 'Counting Stars', 'Shake It Off', 'Thinking Out Loud', 'Cheap Thrills', 'Love Yourself', 'Let Her Go', 'Stressed Out', 'One Dance'];

const uploadVideos = async (id) => {
    var videos = await fetchvideos(id)
    console.log(videos.length)
    const query = `
        INSERT INTO video (youtube_id, title, likes, comments, views, song, created_at, video_url, thumbnail_url, channel_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `

    try {
        await Promise.all(videos.map(async (video) => {
            // random date between 2020-01-01 and now
            video.created_at = new Date(2020, 0, 1 + Math.floor(Math.random() * (new Date() - new Date(2020, 0, 1))))
            video.likes = Math.floor(Math.random() * 1000)
            video.comments = Math.floor(Math.random() * 100)
            // random song name
            video.song = songs[Math.floor(Math.random() * songs.length)]

            console.log(video)
            await postgres.query(query, [video.youtube_id, video.title, video.likes, video.comments, video.views, video.song, video.created_at, video.video_url, video.thumbnail_url, video.channel_id])
        }))
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
            await postgres.query(query, [comment.video_id, comment.content, comment.created_at, comment.commenter_id, comment.like_count, comment.reply_count])
        }))
        console.log("Comments uploaded successfully")
    } catch (error) {
        console.log(error)
    }
}

const fetchUsers = async (id) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../crawler/data/users.json')
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log('Error reading users file')
                reject(err)
            } else {
                var result = JSON.parse(data)

                // get first 20 users, starting from index id
                result = result.slice(id, id + 20)

                resolve(result)
            }
        })
    })
}

const uploadUsers = async (req, res) => {
    const users = await fetchUsers(req.params.id)

    const query = `
        INSERT INTO user_info (youtube_id, handle, name, follower, following, posts, description, avatar_url, thumbnail_url, youtube_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `

    try {
        await Promise.all(users.map(async (user) => {
            console.log(user)
            await postgres.query(query, [user.youtube_id, user.handle, user.name, user.follower, user.following, user.posts, user.description, user.avatar_url, user.thumbnail_url, user.youtube_url])
        }
        ))
        console.log("Users uploaded successfully")
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { uploadVideos, uploadComments, uploadUsers }