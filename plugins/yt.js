const yts = require("yt-search");
const ddownr = require("denethdev-ytmp3");

cmd({
  pattern: "song",
  react: "🎵",
  desc: "Download a YouTube song as normal audio",
  category: "download",
  use: ".song Faded Alan Walker",
  filename: __filename,
},
async (
  conn,
  mek,
  m,
  { from, l, q, reply }
) => {
  try {
    if (!q) return reply("❌ *Please provide a YouTube title or link!*\n\nExample: *.song Faded Alan Walker*");

    // Search YouTube
    const search = await yts(q);
    const data = search.videos[0];
    if (!data) return reply("❌ No matching result found.");

    // Download MP3
    const result = await ddownr.download(data.url, "mp3");
    const downloadLink = result.downloadUrl;

    // Caption
    const caption =
      `🎧 *VAJIRA SONG DOWNLOADER*\n\n` +
      `🎼 Title: *${data.title}*\n` +
      `📅 Uploaded: ${data.ago}\n` +
      `⏱ Duration: ${data.timestamp}\n` +
      `👁 Views: ${data.views}\n` +
      `🔗 URL: ${data.url}\n\n` +
      `● *VAJIRA MINI BOT* ●`;

    // Send as normal audio
    await conn.sendMessage(from, {
      audio: { url: downloadLink },
      mimetype: "audio/mpeg",
      ptt: false, // normal audio
      caption
    }, { quoted: mek });

  } catch (e) {
    reply(`⚠️ *Error occurred:* ${e.message || "Unknown error"}`);
    l(e);
  }
});