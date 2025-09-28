const { cmd, commands } = require('../lib/command');
let { img2url } = require('@blackamda/telegram-image-url');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
const config = require('../settings')
const fs = require('fs');
const axios = require("axios");
const got = require("got");
let { unlink } = require("fs/promises");
const translate = require('translate-google-api');
const { promisify } = require("util");
const FormData = require("form-data");
const stream = require("stream");
const pipeline = promisify(stream.pipeline);
const fileType = require("file-type");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const path = require('path')
const { tmpdir } = require("os")
const { spawn } = require('child_process')
const Crypto = require("crypto")
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg')
const os = require("os");


ffmpeg.setFfmpegPath(ffmpegPath);
async function videoToWebp (media) {

    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)

    fs.writeFileSync(tmpFileIn, media)

    await new Promise((resolve, reject) => {
        ffmpeg(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                "-loop",
                "0",
                "-ss",
                "00:00:00",
                "-t",
                "00:00:05",
                "-preset",
                "default",
                "-an",
                "-vsync",
                "0"
            ])
            .toFormat("webp")
            .save(tmpFileOut)
    })

    const buff = fs.readFileSync(tmpFileOut)
    fs.unlinkSync(tmpFileOut)
    fs.unlinkSync(tmpFileIn)
    return buff
}

function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3'
  ], ext, 'mp3')
}

function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus')
}

function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-ab', '128k',
    '-ar', '44100',
    '-crf', '32',
    '-preset', 'slow'
  ], ext, 'mp4')
}




var desct =''
if(config.LANG === 'SI') desct = 'එය ලබා දී ඇති රූපය url එකක් බවට පරිවර්තනය කරයි.'
else desct = "It convert given image to url."
var imgmsg =''
if(config.LANG === 'SI') imgmsg = '*ඡායාරූපයකට mention දෙන්න !*'
else imgmsg = "*Reply to a photo !*"
var cantf =''
if(config.LANG === 'SI') cantf = '*Server එක කාර්යබහුලයි. පසුව නැවත උත්සාහ කරන්න. !*'
else cantf = "*Server is busy. Try again later.!*"
var imgmsgs =''
if(config.LANG === 'SI') imgmsgs = '*මට anime නමක් දෙන්න !*'
else imgmsgs = "*Give me a anime name !*"
var descgs = ''
if(config.LANG === 'SI') descgs = "එය ලබා දී ඇති anime නම පිළිබඳ විස්තර සපයයි."
else descgs = "It gives details of given anime name."
var cants = ''
if(config.LANG === 'SI') cants = "I cant find this anime."
else cants = "I cant find this anime."
var descg = ''
if(config.LANG === 'SI') descg = "එය ඔබගේ mention දුන් ඡායාරූපය ස්ටිකර් බවට පරිවර්තනය කරයි."
else descg = "It converts your replied photo to sticker."
var imgmsg2 =''
if(config.LANG === 'SI') imgmsg2 = '*ස්ටිකරයකට mention දෙන්න !*'
else imgmsg2 = "*Reply to a sticker !*"
var descg2 = ''
if(config.LANG === 'SI') descg2 = "එය ඔබගේ mention දුන් sticker img බවට පරිවර්තනය කරයි."
else descg2 = "It converts your replied sticker to img."
var desct1 =''
if(config.LANG === 'SI') desct1 = 'එය ලබා දී ඇති රූපය anime image එකක් බවට පරිවර්තනය කරයි.'
else desct1 = "It convert given image to anime image."
var desct2 =''
if(config.LANG === 'SI') desct2 = 'එය ලබා දී ඇති text එකක් ai image එකක් බවට පරිවර්තනය කරයි.'
else desct2 = "It convert given text to ai image."
var imgmsg3 =''
if(config.LANG === 'SI') imgmsg3 = '*උදාහරණයක්: .imagine woman,hair cut collor red,full body,bokeh*'
else imgmsg3 = "*Example: .imagine woman,hair cut collor red,full body,bokeh*"
var imgmsg1 =''
if(config.LANG === 'SI') imgmsg1 = '*වීඩියෝවක් mention දෙන්න !*'
else imgmsg1 = "*Reply to a video !*"
var descg3 = ''
if(config.LANG === 'SI') descg3 = "එය ඔබගේ mention දුන් වීඩියෝව audio බවට පරිවර්තනය කරයි."
else descg3 = "It converts your replied video to audio [mp3]."
var N_FOUND =''
if(config.LANG === 'SI') N_FOUND = "*මට මෙම වීඩියෝව audio බවට පරිවර්තනය කළ නොහැකි විය :(*"
else N_FOUND = "*I cant convert this video to audio :(*"
var imgmsg4 =''
if(config.LANG === 'SI') imgmsg4 = '*කරුණාකර මට text එකක් දෙන්න !*'
else imgmsg4 = "*Please give me a text !*"
var descg1 = ''
if(config.LANG === 'SI') descg1 = "එය text එකක් gif ස්ටිකරයක් බවට පරිවර්තනය කරයි"
else descg = "it converts a text to gif sticker."
var descdg1 = ''
if(config.LANG === 'SI') descdg = "එය text එකක් ස්ටිකරයක් බවට පරිවර්තනය කරයි"
else descdg = "it converts a text to sticker."
if(config.LANG === 'SI') cant = "මට මෙම රූපයේ පසුබිම ඉවත් කළ නොහැක."
else cant = "I can't remove background on this image."

//---------------------------------------------------------------------------

cmd({
  pattern: "channelreact",
  alias: ["chr"],
  react: "📕",
  use: ".channelreact <link>,<reaction>",
  desc: "React to a channel message",
  category: "main",
  filename: __filename,
},
async (conn, mek, m, { q, reply }) => {
  try {
    // Language variables
    let usageMsg, invalidInput, invalidFormat, successMsg, errorMsg;
    
    if (config.LANG === 'si') {
      usageMsg = "*භාවිතය:* .channelreact <link>,<reaction>";
      invalidInput = "*අවලංගු ආදානයක්.* කරුණාකර සබැඳිය හා විකාශය දෙකම ලබාදෙන්න.";
      invalidFormat = "*අවලංගු නාලිකා සබැඳි ආකෘතියක්.*";
      successMsg = (reaction) => `✅ "${reaction}" ලෙස ප්‍රතික්‍රියාවක් යවා ඇත.`;
      errorMsg = (msg) => `❌ දෝෂයක්: ${msg}`;
    } else {
      usageMsg = "*Usage:* .channelreact <channel link>,<emoji>";
      invalidInput = "*Invalid input.* Please provide both the link and the emoji.";
      invalidFormat = "*Invalid channel link format.*";
      successMsg = (reaction) => `✅ Reacted with "${reaction}" to the message.`;
      errorMsg = (msg) => `❌ Error: ${msg}`;
    }

    if (!q || !q.includes(',')) return reply(usageMsg);
    const [link, reaction] = q.split(',').map(v => v.trim());
    if (!link || !reaction) return reply(invalidInput);

    const parts = link.split('/');
    const channelId = parts[4];
    const messageId = parts[5];

    if (!channelId || !messageId) return reply(invalidFormat);

    const res = await conn.newsletterMetadata("invite", channelId);
    await conn.newsletterReactMessage(res.id, messageId, reaction);

    reply(successMsg(reaction));
  } catch (e) {
    console.error(e);
    reply(errorMsg(e.message));
  }
});




const forwardAsChannel = async (conn, m, type, jid, name) => {
  if (!m.quoted) return m.reply("⚠️ Reply to a message.");

  const msg = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: jid,
        newsletterName: name,
        serverMessageId: Math.floor(Math.random() * 9999) + 100
      }
    }
  };

  if (type === "text") {
    if (!m.quoted.text) return m.reply("📄 Reply to a *text* message.");
    msg.text = m.quoted.text;
  }

  if (type === "image") {
    const mimeType = (m.quoted.msg || m.quoted).mimetype || '';
    if (!mimeType.includes('image')) return m.reply("🖼️ Reply to an *image* message.");

    const buffer = await m.quoted.download();
    const tempFile = path.join(os.tmpdir(), `img-${Date.now()}.jpg`);
    fs.writeFileSync(tempFile, buffer);

    msg.image = fs.readFileSync(tempFile);
    msg.caption = m.quoted.caption || '';

    fs.unlinkSync(tempFile); // cleanup
  }

  if (type === "video") {
    const mimeType = (m.quoted.msg || m.quoted).mimetype || '';
    if (!mimeType.includes('video')) return m.reply("🎥 Reply to a *video* message.");

    const buffer = await m.quoted.download();
    const tempFile = path.join(os.tmpdir(), `vid-${Date.now()}.mp4`);
    fs.writeFileSync(tempFile, buffer);

    msg.video = fs.readFileSync(tempFile);
    msg.caption = m.quoted.caption || '';

    fs.unlinkSync(tempFile); // cleanup
  }

  await conn.sendMessage(m.chat, msg, { quoted: m });
};

// 📄 TEXT command
cmd({
  pattern: "ctx",
  desc: "Forward text like newsletter",
  category: "tools",
  filename: __filename
}, async (conn, m, text, { args }) => {
  const [jid, ...nameArr] = args;
  const name = nameArr.join(" ");
  if (!jid || !name) return m.reply("✏️ Usage: .ctx <channelJid> <channelName>");
  await forwardAsChannel(conn, m, "text", jid, name);
});

// 🖼️ IMAGE command
cmd({
  pattern: "cimg",
  desc: "Forward image like newsletter",
  category: "tools",
  filename: __filename
}, async (conn, m, text, { args }) => {
  const [jid, ...nameArr] = args;
  const name = nameArr.join(" ");
  if (!jid || !name) return m.reply("✏️ Usage: .cimg <channelJid> <channelName>");
  await forwardAsChannel(conn, m, "image", jid, name);
});

// 🎥 VIDEO command
cmd({
  pattern: "cvid",
  desc: "Forward video like newsletter",
  category: "tools",
  filename: __filename
}, async (conn, m, text, { args }) => {
  const [jid, ...nameArr] = args;
  const name = nameArr.join(" ");
  if (!jid || !name) return m.reply("✏️ Usage: .cvid <channelJid> <channelName>");
  await forwardAsChannel(conn, m, "video", jid, name);
});
