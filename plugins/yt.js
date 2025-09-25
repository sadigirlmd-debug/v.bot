const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");
const ddownr = require("denethdev-ytmp3");



cmd({
  pattern: "ytmp3",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
    
    if (!q) return await conn.sendMessage(from, { text: '*Need link...*' }, { quoted: mek })

    

    // Fetch from Infinity API
    const apiKey = "INF~v0cig1jd" // keep your apiKey here
    const res = await fetchJson(`https://infinity-apis.vercel.app/api/youtubedl2?videoUrl=${encodeURIComponent(mediaUrl)}&apiKey=${apiKey}`)

    if (!res.success) return reply("*Failed to fetch audio!*")

    const info = res.data.res_data.res_data
    const formats = info.formats || []

    // Find best audio format (itag 140 preferred, else 251/250/249)
    let audioFormat = formats.find(f => f.itag == 140) ||
                      formats.find(f => f.itag == 251) ||
                      formats.find(f => f.itag == 250) ||
                      formats.find(f => f.itag == 249)

    if (!audioFormat) return reply("*No audio format found!*")

    const message = {
      audio: { url: audioFormat.url },
      caption: `${info.title}\n\n${config.FOOTER}`,
      mimetype: "audio/mpeg",
      fileName: `${info.title}.mp3`,
    }

    await conn.sendMessage(from, message, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
    
  } catch (e) {
    reply('*ERROR !!*')
    l(e)
  }
})
