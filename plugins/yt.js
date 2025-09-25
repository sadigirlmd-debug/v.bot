const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");
const ddownr = require("denethdev-ytmp3");



const savetube = require("../lib/savetube") // save the code you gave in /lib/savetube.js

cmd({
  pattern: "song",
  react: "📥",
  desc: "Download YouTube video or audio using SaveTube",
  category: "download",
  use: "<url> | <format>",
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("*Usage:* .ytstube <url> | <format>\n\nExample: .ytstube https://youtu.be/abc123 | mp3")

    const args = q.split("|").map(a => a.trim())
    const url = args[0]
    const format = args[1] || "mp3"

    // Call savetube
    const result = await savetube.download(url, format)
    if (!result.status) return reply(`❌ ${result.error || "Failed to download"}`)

    const { title, thumbnail, download, type, quality, duration } = result.response

    // send preview
    await conn.sendMessage(from, {
      image: { url: thumbnail },
      caption: `🎶 *Title:* ${title}\n📀 *Format:* ${quality}\n⏱️ *Duration:* ${duration || "N/A"}\n\n_⬇ Sending ${type}..._`
    }, { quoted: mek })

    // send media
    if (type === "audio") {
      await conn.sendMessage(from, {
        audio: { url: download },
        mimetype: "audio/mpeg",
        fileName: `${title}.mp3`
      }, { quoted: mek })
    } else {
      await conn.sendMessage(from, {
        video: { url: download },
        mimetype: "video/mp4",
        fileName: `${title}.mp4`
      }, { quoted: mek })
    }

    await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })

  } catch (e) {
    console.log(e)
    reply("*ERROR while fetching from SaveTube !!*")
  }
})
