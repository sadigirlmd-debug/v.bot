const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");
const ddownr = require("denethdev-ytmp3");



const axios = require("axios");

cmd({
  pattern: "song",
  fromMe: true,
  desc: "Download YouTube videos in 720p via Infinity API",
}, async (conn, mek, m, { from, q, reply }) => { 
  try {
    if (!match) return conn.sendMessage(from, "❌ Please provide a YouTube link.", { quoted: mek });

    const apiKey = "ethix-api"; // your Infinity API key
    const encodedUrl = encodeURIComponent(match.trim());
    const apiUrl = `https://infinity-apis.vercel.app/api/youtubedl?videoUrl=${encodedUrl}&apiKey=${apiKey}`;

    // Fetch video info
    const { data } = await axios.get(apiUrl);

    if (!data.success) return conn.sendMessage(mek.chat, "❌ Failed to fetch video info.", { quoted: mek });

    const video = data.video.videos;
    const mp4s = video.mp4s;

    if (!mp4s || mp4s.length === 0) return conn.sendMessage(mek.chat, "❌ No downloadable formats available.", { quoted: mek });

    // Pick 720p first, fallback to first available
    const chosen = mp4s.find(f => f.resolution.startsWith("720p") && f.downloadUrl) || mp4s[0];

    if (!chosen?.downloadUrl) return conn.sendMessage(from, "❌ Download URL not available.", { quoted: mek });

    const caption = `🎬 *${video.text || "Unknown Title"}*\n📀 Resolution: ${chosen.resolution}\n💾 Size: ${chosen.size}\n⏱ Duration: ${video.durationText || "Unknown"} sec`;

    // Send thumbnail if available
    if (video.imgUrl) {
      await conn.sendMessage(from, {
        image: { url: video.imgUrl },
        caption
      }, { quoted: mek });
    } else {
      await conn.sendMessage(from, caption, { quoted: mek });
    }

    // Send the video
    await conn.sendMessage(from, {
      video: { url: chosen.downloadUrl },
      mimetype: "video/mp4",
      fileName: `${video.text || "video"}.mp4`,
      caption: `🎬 *${video.text || "Video"}*`
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(mek.chat, "❌ Error fetching or sending video.\n" + err.message, { quoted: mek });
  }
});
