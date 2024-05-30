const postgres = require('./database')
const fs = require('fs')
const path = require('path')

// return list of shorts from json file
const fetchShorts = async () => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../crawler/data/shorts.json')
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log('Error reading shorts file')
                reject(err)
            } else {
                const result = JSON.parse(data)
                resolve(result)
            }
        })
    })
}

const uploadShorts = async () => {
    const shorts = await fetchShorts()
    const query = `
        INSERT INTO short (youtube_id, title, video_url, thumbnail_url, views, channel_id)
        VALUES ($1, $2, $3, $4, $5, $6)
    `

    try {
        await Promise.all(shorts.map(async (short) => {
            console.log(short)
            await postgres.query(query, [short.youtube_id, short.title, short.video_url, short.thumbnail_url, short.views, short.channel_id])
        }))
        console.log("Shorts uploaded successfully")
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
                const result = JSON.parse(data)

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
        INSERT INTO comment (short_id, content, created_at, commenter_id, like_count, reply_count)
        VALUES ($1, $2, $3, $4, $5)
    `

    try {
        await Promise.all(comments.map(async (comment) => {
            console.log(comment)
            await postgres.query(query, [comment.short_id, comment.content, comment.created_at, comment.commenter_id, comment.like_count, comment.reply_count])
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
        INSERT INTO user_info (youtube_id, handle, name, subscribers, description, avatar_url, thumbnail_url, youtube_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `

    try {
        await Promise.all(users.map(async (user) => {
            console.log(user)
            await postgres.query(query, [user.youtube_id, user.handle, user.name, user.subscribers, user.description, user.avatar_url, user.thumbnail_url, user.youtube_url])
        }
        ))
        console.log("Users uploaded successfully")
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { uploadShorts, uploadComments, uploadUsers }