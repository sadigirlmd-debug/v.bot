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
async (conn, mek, m, { from, q, reply, l }) => {
  try {
    await conn.sendMessage(from, { react: { text: '📥', key: mek.key } })

    if (!q) return await conn.sendMessage(from, { text: '*Need YouTube link...*' }, { quoted: mek })


    const apiKey = "INF~v0cig1jd" // your Infinity API key
    const res = await fetchJson(`https://infinity-apis.vercel.app/api/youtubedl2?videoUrl=${encodeURIComponent(q)}&apiKey=${apiKey}`)

    if (!res.success) return reply("*Failed to fetch audio!*")

    const info = res.data.res_data.res_data
    const firstUrl = info.formats && info.formats[0] ? info.formats[0].url : null

    if (!firstUrl) return reply("*No download URL found!*")

    const message = {
      audio: { url: firstUrl },
      caption: `${info.title}\n\n${config.FOOTER}`,
      mimetype: "audio/mpeg",
      fileName: `${info.title}.mp3`,
    }

    await conn.sendMessage(from, message, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })

  } catch (e) {
    reply('*ERROR !!*')
    l(e)
  }
})
