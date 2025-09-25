const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");
const ddownr = require("denethdev-ytmp3");



const axios = require("axios");

cmd({
  pattern: "song",
  desc: "Download YouTube video",
  react: "🎬",
  use: "<url>",
  category: "download"
}, async (conn, mek, m, { q }) => {
  try {
    if (!q) return await m.reply("Give me a YouTube link!");

    let url = q[0];
    let res = await axios.get(`https://your-api.com/api/yt?url=${encodeURIComponent(url)}`);

    let data = res.data?.data?.res_data?.res_data;  // ✅ Correct path

    if (!data || !data.formats) return await m.reply("No formats found!");

    let video = data.formats.find(f => f.quality === "360p"); // pick 360p
    if (!video) video = data.formats[0]; // fallback

    await conn.sendMessage(m.chat, {
      video: { url: video.url },
      caption: `🎶 *${data.title}*\n\n📺 Quality: ${video.quality}`
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    await m.reply("❌ Error fetching video.");
  }
});
