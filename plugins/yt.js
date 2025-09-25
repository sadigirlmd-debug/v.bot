2const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");



const fetch = require('node-fetch');

async function fetchJson(url) {
    const res = await fetch(url);
    return res.json();
}

async function getBuffer(url) {
    const res = await fetch(url);
    return Buffer.from(await res.arrayBuffer());
}

cmd({
  pattern: "song",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '📥', key: mek.key } });

        if (!q) return await conn.sendMessage(from, { text: '*Need link...*' }, { quoted: mek });

        const apiKey = "ethix-api";
        const encodedUrl = encodeURIComponent(q);
        const apiUrl = `https://infinity-apis.vercel.app/api/youtubedl?videoUrl=${encodedUrl}&apiKey=${apiKey}`;
        const data = await fetchJson(apiUrl);

        if (!data?.success) return reply('*❌ Failed to fetch video info*');

        const mp4s = data.video.videos.mp4s.downloadUrl;
        if (!mp4s || mp4s.length === 0) return reply('*❌ No video URLs found*');

        const mediaUrl = mp4s[0];

        const message = {
            audio: await getBuffer(mediaUrl),
            caption: `${data.video.videos.text || "No title"}\n\n${config.FOOTER}`,
            mimetype: "audio/mpeg",
            fileName: `yt_audio.mp3`,
        };

        await conn.sendMessage(from, message);

        await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });

    } catch (e) {
        reply('*ERROR !!*');
        console.error(e);
    }
});
