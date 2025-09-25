const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");







cmd({
  pattern: "ytmp3",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        // React to show downloading
        await conn.sendMessage(from, { react: { text: '📥', key: mek.key } });

        if (!q) return await conn.sendMessage(from, { text: '*Need link...*' }, { quoted: mek });

        // Fetch video info from Infinity API
        const apiKey = "ethix-api";
        const apiUrl = `https://infinity-apis.vercel.app/api/youtubedl?videoUrl=${encodeURIComponent(q)}&apiKey=${apiKey}`;
        const data = await fetchJson(apiUrl);

        if (!data?.success) return reply('*❌ Failed to fetch video info*');

        const mp4s = data.video.videos.mp4s;
if (!mp4s || mp4s.length === 0) return reply('*❌ No video URLs found*');

// Pick the first video (ignore canDownload)
const media = mp4s[2];
const mediaUrl = media.downloadUrl;




await conn.sendMessage(from, {
          audio: await getBuffer(mediaUrl),
          mimetype: "audio/mpeg"
        }, { quoted: mek });
      

        // React to show finished
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });

    } catch (e) {
        reply('*ERROR !!*');
        console.error(e);
    }
});






cmd({
  pattern: "ytdoc",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        // React to show downloading
        await conn.sendMessage(from, { react: { text: '📥', key: mek.key } });

        if (!q) return await conn.sendMessage(from, { text: '*Need link...*' }, { quoted: mek });

        // Fetch video info from Infinity API
        const apiKey = "ethix-api";
        const apiUrl = `https://infinity-apis.vercel.app/api/youtubedl?videoUrl=${encodeURIComponent(q)}&apiKey=${apiKey}`;
        const data = await fetchJson(apiUrl);

        if (!data?.success) return reply('*❌ Failed to fetch video info*');

        const mp4s = data.video.videos.mp4s;
if (!mp4s || mp4s.length === 0) return reply('*❌ No video URLs found*');

// Pick the first video (ignore canDownload)
const media = mp4s[2];
const mediaUrl = media.downloadUrl;

      
await conn.sendMessage(from, {
          document: await getBuffer(mediaUrl),
          mimetype: "audio/mpeg",
          fileName: `${data.video.videos.text}.mp3`,
          caption: `${data.video.videos.text}\n\n${config.FOOTER}`
        }, { quoted: mek });
        // React to show finished
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });

    } catch (e) {
        reply('*ERROR !!*');
        console.error(e);
    }
});



cmd({
  pattern: "ytv",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        // React to show downloading
        await conn.sendMessage(from, { react: { text: '📥', key: mek.key } });

        if (!q) return await conn.sendMessage(from, { text: '*Need link...*' }, { quoted: mek });

        // Fetch video info from Infinity API
        const apiKey = "ethix-api";
        const apiUrl = `https://infinity-apis.vercel.app/api/youtubedl?videoUrl=${encodeURIComponent(q)}&apiKey=${apiKey}`;
        const data = await fetchJson(apiUrl);

        if (!data?.success) return reply('*❌ Failed to fetch video info*');

        const mp4s = data.video.videos.mp4s;
if (!mp4s || mp4s.length === 0) return reply('*❌ No video URLs found*');

// Pick the first video (ignore canDownload)
const media = mp4s[2];
const mediaUrl = media.downloadUrl;




await conn.sendMessage(from, {
          video: await getBuffer(mediaUrl),
          mimetype: "video/mp4"
        }, { quoted: mek });
      

        // React to show finished
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });

    } catch (e) {
        reply('*ERROR !!*');
        console.error(e);
    }
});

cmd({
  pattern: "ytvdoc",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        // React to show downloading
        await conn.sendMessage(from, { react: { text: '📥', key: mek.key } });

        if (!q) return await conn.sendMessage(from, { text: '*Need link...*' }, { quoted: mek });

        // Fetch video info from Infinity API
        const apiKey = "ethix-api";
        const apiUrl = `https://infinity-apis.vercel.app/api/youtubedl?videoUrl=${encodeURIComponent(q)}&apiKey=${apiKey}`;
        const data = await fetchJson(apiUrl);

        if (!data?.success) return reply('*❌ Failed to fetch video info*');

        const mp4s = data.video.videos.mp4s;
if (!mp4s || mp4s.length === 0) return reply('*❌ No video URLs found*');

// Pick the first video (ignore canDownload)
const media = mp4s[2];
const mediaUrl = media.downloadUrl;

      
await conn.sendMessage(from, {
          document: await getBuffer(mediaUrl),
          mimetype: "video/mp4",
          fileName: `${data.video.videos.text}.mp3`,
          caption: `${data.video.videos.text}\n\n${config.FOOTER}`
        }, { quoted: mek });
        // React to show finished
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });

    } catch (e) {
        reply('*ERROR !!*');
        console.error(e);
    }
});


