const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");
const ddownr = require("denethdev-ytmp3");



cmd({
  pattern: "song",
  react: "🎬",
  desc: "Download YouTube video using Infinity API",
  category: "download",
  use: "<url>",
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("*Usage:* .ytinfinity <youtube-url>")

    const apiKey = "ethix-api" // put your Infinity API key
    const apiUrl = `https://infinity-apis.vercel.app/api/youtubedl?videoUrl=${encodeURIComponent(q)}&apiKey=${apiKey}`

    const res = await fetchJson(apiUrl)
    if (!res.success) return reply(`❌ ${res.message || "Failed to fetch video info"}`)

    const video = res.video
    const { text, durationText, imgUrl, mp4s } = video.videos

    // Build details message
    let caption = `🎬 *YouTube Video Info*\n\n`
    caption += `📝 *Title:* ${text}\n`
    caption += `⏱️ *Duration:* ${durationText} sec\n\n`
    caption += `📥 *Available Qualities:*\n`

    mp4s.forEach((v, i) => {
      caption += `\n${i + 1}. ${v.resolution} (${v.size})`
    })

    caption += `\n\n_Reply with format number to download._`

    // send thumbnail + details
    await conn.sendMessage(from, {
      image: { url: imgUrl },
      caption
    }, { quoted: mek })

    // collect user reply (format number)
    const collector = conn.ev.on("messages.upsert", async (msg) => {
      try {
        const quoted = msg.messages[0]
        if (!quoted.message?.extendedTextMessage?.text) return
        if (quoted.key.remoteJid !== from) return
        if (!quoted.message.extendedTextMessage?.contextInfo?.stanzaId) return
        if (quoted.message.extendedTextMessage.contextInfo.stanzaId !== mek.key.id) return

        const num = parseInt(quoted.message.extendedTextMessage.text.trim())
        if (isNaN(num) || num < 1 || num > mp4s.length) {
          return conn.sendMessage(from, { text: "❌ Invalid number, try again." }, { quoted: quoted })
        }

        const chosen = mp4s[num - 1]
        await conn.sendMessage(from, {
          video: { url: chosen.downloadUrl },
          mimetype: "video/mp4",
          fileName: `${text}.mp4`,
          caption: `🎬 *${text}*\n📀 ${chosen.resolution} (${chosen.size})`
        }, { quoted: quoted })

        conn.ev.off("messages.upsert", collector)
      } catch (err) {
        console.error(err)
      }
    })

  } catch (e) {
    console.error(e)
    reply("*Error fetching video !!*")
  }
})
