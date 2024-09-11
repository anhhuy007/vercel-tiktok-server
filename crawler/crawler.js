const { loremIpsum } = require('lorem-ipsum');
const fs = require('fs');
const ytdl = require('ytdl-core');
const { Client } = require("youtubei");
const youtube = new Client();
const csv = require('csv-parser');
const path = require('path');
const { Video, User, Comment, Like } = require('./models/model');
const { channel } = require('diagnostics_channel');
const { randomInt } = require('crypto');

const video_cloud_storage = 'https://tiktok-clone-storage.000webhostapp.com/video/';
const video_local_storage = path.join(__dirname, 'short_videos/');
const youtube_video_path = 'https://www.youtube.com/shorts/'

function downloadVideo(url, path) {
  try{
    console.log('Downloading video from: ' + url);
    ytdl(url).pipe(fs.createWriteStream(path));
    console.log('Downloaded video to ' + path);
  }
  catch(err){
    console.log(err);
  }
}

async function fetchVideoInfo(video_id) {
  console.log('Fetching video info for ' + video_id)
  try {
    const video = await youtube.getVideo(video_id);
    const short = new Video();

    short.title = video.title;
    short.video_url = video_cloud_storage + video.id + '.mp4';
    short.thumbnail_url = video.thumbnails.min;
    short.views = video.viewCount;
    short.youtube_video_id = video.id;
    short.channel_id = video.channel.id;
    
    console.log('Fetched video info for ' + video_id);
    return short;
  }
  catch(err) {
    console.log(err);
    print('Error fetching video info');

    return null;
  }
}

const readVideoIds = () => {
  return new Promise((resolve, reject) => {
    // open csv file to read video ids
    const video_ids = [];

    const filePath = path.resolve(__dirname, 'data/short_ids.csv')
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        console.log(row);
        video_ids.push(row.video_id);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        // remove duplicates and return
        const result = [...new Set(video_ids)];
        resolve(result);
      })
      .on('error', (error) => {
        console.log('Error reading CSV file');
        reject(error);
      });
  });
}

const fetchAndDownloadVideo = async(video_ids) => {
  const shorts = await Promise.all(video_ids.map(async (video_id) => {
    const short = await fetchVideoInfo(video_id);
    if (short) {
      // const filePath = path.join(video_local_storage, short.youtube_video_id + '.mp4');
      // await downloadVideo(youtube_video_path + short.youtube_video_id, filePath);
      return short;
    }
    return null;
  }));

  return shorts.filter(short => short !== null);
}

const writeToJson = (obj, filename) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(obj, null, 2);
    const filePath = path.resolve(__dirname, 'data/' + filename);
    fs.writeFile(filePath, data, (error) => {
      if (error) {
        console.log('Error writing shorts to file');
        reject(error);
      } else {
        console.log('Shorts written to file');
        resolve();
      }
    });
  });
}

const readChannelIds = () => {
  return new Promise((resolve, reject) => {
    // open json file to read channel ids
    const filePath = path.resolve(__dirname, 'data/shorts.json');
    fs.readFile(filePath, (error, data) => {
      if (error) {
        console.log('Error reading channel ids');

        reject(error);
      } else {
        const shorts = JSON.parse(data);
        const channel_ids = [];
        shorts.forEach(short => {
          channel_ids.push(short.channel_id);
        });

        // remove duplicates and return
        const result = [...new Set(channel_ids)];

        resolve(result);
      }
    });
  }
)}

const fetchUserInfo = async (channel_id) => {
  console.log('Fetching user info for ' + channel_id);
  return new Promise(async (resolve, reject) => {
    try {
      const user = await youtube.getChannel(channel_id);
      const userInfo = new User();

      console.log('User info: ', user);

      userInfo.youtube_id = user.id;
      userInfo.name = user.name;
      userInfo.description = user.shelves[0]?.subtitle?.replace(/<[^>]*>?/gm, '') || loremIpsum({count: 2, units: 'sentences'}); // remove html tags
      userInfo.avatar_url = user.thumbnails?.best;
      userInfo.thumbnail_url = "https://drive.google.com/file/d/1_VuG30LkK3lxNxRZhwFqIid1c7zBAKZh/view?usp=sharing";
      userInfo.youtube_url = user?.url;

      // generate random number of followers, following, posts
      const randomSeed = Math.random() * 900 + 100;
      userInfo.follower = Math.round((Math.random() * 900000 + 1000) * randomSeed);
      userInfo.following = Math.round((Math.random() * 900 + 100) * randomSeed);
      userInfo.posts = Math.round((Math.random() * 990 + 10));

      // create handle from name
      // example: "John Doe" -> "@johndoe"
      userInfo.handle = '@' + userInfo.name.toLowerCase().replace(' ', '');

      resolve(userInfo);
    }
    catch(err) {
      console.log(err);
      console.log('Error fetching user info:', channel_id);
      reject(err);
    }
  });
}

const fetchUsers = async (channel_ids) => {
  const users = await Promise.all(channel_ids.map(async (channel_id) => {
    const user = await fetchUserInfo(channel_id);
    return user;
  }));

  return users;
}

const shortCrawler = async () => {
  const video_ids = await readVideoIds();
  console.log('Data :\n', video_ids);
  const shorts = await fetchAndDownloadVideo(video_ids);
  console.log('Shorts :\n', shorts);
  await writeToJson(shorts, 'shorts_test.json');
}

const userCrawler = async () => {
  const channel_ids = await readChannelIds();
  console.log('Data :\n', channel_ids);
  const users = await fetchUsers(channel_ids);
  console.log('Users :\n', users);
  await writeToJson(users, 'users.json');
  console.log('Users written to file');
}

const fetchComments = async (short_id, user_ids, nbo_comments = 5) => {
  const comments = []; 
  
  try{
    const video = await youtube.getVideo(short_id);
    let data = await video.comments.next(); // first 20 comments

    // get first nbo_comments comments
    for (let i = 0; i < nbo_comments; i++) {
      const comment = data[i];
      const newComment = new Comment();

      console.log('Comment: ', comment);

      newComment.short_id = short_id;
      newComment.content = comment.content;
      newComment.created_at = comment.publishDate;
      // get random user id
      newComment.commenter_id = user_ids[Math.floor(Math.random() * user_ids.length)];
      newComment.like_count = comment?.likeCount;
      newComment.reply_count = comment?.replyCount;

      comments.push(newComment);
    }
  }
  catch(err){
    console.log(err);
    console.log('Error fetching comments');
    return [];
  }

  return comments;
}

const commentCrawler = async () => {
  const short_ids = await readVideoIds();
  const user_ids = await readChannelIds();
  console.log('Data :\n', short_ids);

  const comments = [];
  
  for(let i = 0; i < short_ids.length; i++) {
    const result = await fetchComments(short_ids[i], user_ids);
    if (result.length == 0) {
      console.log('No comments for short id ' + short_ids[i]);
      continue;
    }
    comments.push(...result);
    console.log('Comments for short id ' + short_ids[i] + ':\n', result);
  }

  console.log('Comments :\n', comments);
  await writeToJson(comments, 'comments.json');
  console.log('Comments: ', comments);
}

const run = async () => {
  try {
    await shortCrawler();
  }
  catch(err) {
    console.log(err);
    console.log('Error running crawler');
  }
}

run();