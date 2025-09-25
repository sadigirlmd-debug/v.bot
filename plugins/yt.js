2const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");
const ddownr = require("denethdev-ytmp3");



const axios = require("axios");


cmd({
  pattern: "song",
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
        const encodedUrl = encodeURIComponent(q);
        const apiUrl = `https://infinity-apis.vercel.app/api/youtubedl?videoUrl=${encodedUrl}&apiKey=${apiKey}`;
        const data = await fetchJson(apiUrl)

        if (!data?.success) return reply('*❌ Failed to fetch video info*');

        


        // Send audio
        const message = {
            audio: await getBuffer(`${data.video.videos.mp4s.downloadUrl[2]}`),
            caption: `${data.video.videos.text}\n\n${config.FOOTER}`,
            mimetype: "audio/mpeg",
            fileName: `yt_audio.mp3`,
        };

        await conn.sendMessage(from, message);

        // React to show finished
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });

    } catch (e) {
        reply('*ERROR !!*');
        console.error(e);
    }
});
