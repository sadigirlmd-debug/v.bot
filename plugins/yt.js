const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");







cmd({
  pattern: "songs",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '📥', key: mek.key } });

        if (!q) return await conn.sendMessage(from, { text: '*Need link...*' }, { quoted: mek });

        
        
        const data = await fetchJson(`https://infinity-apis.vercel.app/api/youtubedl?videoUrl=${encodeURIComponent(q)}&apiKey=ethix-api`);

        if (!data?.success) return reply('*❌ Failed to fetch video info*');

        const mp4s = data.video.videos.mp4s.downloadUrl;
        if (!mp4s || mp4s.length === 0) return reply('*❌ No video URLs found*');

        const mediaUrl = mp4s[2];

    
await conn.sendMessage(from, {
      audio: { url: mediaUrl },
      caption: config.FOOTER,
      mimetype: "video/mp4",
      fileName: `${data.video.videos.text}.mp3`
    }, { quoted: mek });
        

        await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });

    } catch (e) {
        reply('*ERROR !!*');
        console.error(e);
    }
});



