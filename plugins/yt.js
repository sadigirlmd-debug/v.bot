const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");
const ddownr = require("denethdev-ytmp3");



const axios = require("axios");

cmd({
  pattern: "song",
  desc: "Download YouTube audio",
  react: "🎶",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("📌 Example: *.yta https://youtu.be/xxxxxxx*");

    let url = `https://infinity-apis.vercel.app/api/youtubedl2?videoUrl=${encodeURIComponent(q)}&apiKey=INF~v0cig1jd`;
    let { data } = await axios.get(url);

    if (!data.success) return reply("❌ Failed to fetch audio, try again later.");

    let result = data.data.res_data.res_data;
    let audioFormat = result.formats.find(f => f.ext === "m4a" || f.ext === "weba" || f.ext === "webm");

    if (!audioFormat) return reply("⚠️ No audio format found for this video.");

    let audioUrl = audioFormat.url;

    let caption =
      `🎧 *VAJIRA YT AUDIO DOWNLOADER*\n\n` +
      `🎼 Title: *${result.title}*\n` +
      `📅 Uploaded: ${result.uploadDate || "N/A"}\n` +
      `⏱️ Duration: ${result.duration || "N/A"}\n` +
      `👁️ Views: ${result.viewCount || "N/A"}\n` +
      `🔗 URL: ${q}\n\n` +
      `● *VAJIRA MINI BOT* ●`;

    await conn.sendMessage(from, {
      audio: { url: audioUrl },
      mimetype: "audio/mpeg",  // ✅ normal audio type
      fileName: `${result.title}.mp3`,
      ptt: false,
      jpegThumbnail: (await axios.get(result.thumbnail, { responseType: "arraybuffer" })).data, // ✅ image preview
      caption: caption
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Error while processing your request.");
  }
});

