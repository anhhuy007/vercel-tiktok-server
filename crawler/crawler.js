const fs = require('fs');
const ytdl = require('ytdl-core');
const { Client } = require("youtubei");
const youtube = new Client();
const csv = require('csv-parser');
const path = require('path');

const video_cloud_storage = 'https://tiktok-clone-storage.000webhostapp.com/video/';
const video_local_storage = path.join(__dirname, 'short_videos/');
const youtube_video_path = 'https://www.youtube.com/shorts/'

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
    const short = new Short();

    short.title = video.title;
    short.video_url = video_cloud_storage + video.id + '.mp4';
    short.thumbnail_url = video.thumbnails[0].url;
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

    fs.createReadStream('data/short_ids.csv')
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

const writeShorts = (shorts) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(shorts, null, 2);
    fs.writeFile('data/shorts.json', data, (error) => {
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

const run = async () => {
  try {
    const video_ids = await readVideoIds();
    console.log('Data :\n', video_ids);
    const shorts = await fetchAndDownloadVideo(video_ids);
    console.log('Shorts :\n', shorts);
    await writeShorts(shorts);
  } catch (error) {
    console.error('Error reading video IDs:', error);
  }
}

run();