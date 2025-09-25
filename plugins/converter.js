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
    pattern: "vv",
    alias: ['retrive', '🔥'],
    desc: "Fetch and resend a ViewOnce message content (image/video).",
    category: "convert",
    use: '<query>',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quotedMessage = m.msg.contextInfo.quotedMessage; // Get quoted message

        if (quotedMessage && quotedMessage.viewOnceMessageV2) {
            const quot = quotedMessage.viewOnceMessageV2;
            if (quot.message.imageMessage) {
                let cap = quot.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.videoMessage) {
                let cap = quot.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.audioMessage) {
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.audioMessage);
                return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
            }
        }

        // If there is no quoted message or it's not a ViewOnce message
        if (!m.quoted) return reply("Please reply to a ViewOnce message.");
        if (m.quoted.mtype === "viewOnceMessage") {
            if (m.quoted.message.imageMessage) {
                let cap = m.quoted.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            else if (m.quoted.message.videoMessage) {
                let cap = m.quoted.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
        } else if (m.quoted.message.audioMessage) {
            let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.audioMessage);
            return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
        } else {
            return reply("This is not a ViewOnce message.");
        }
    } catch (e) {
        console.log("Error:", e);
        reply("An error occurred while fetching the ViewOnce message.");
    }
});




cmd({
    pattern: "vcloner",
    react: "😁",
    desc: "To clone a voice",
    category: "main",
    use: '.vcloner',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
    
    if (!q) {
        
        return reply(`*Provide valid input text.*`);
    }

    const urls = q.split("|");
    if (urls.length !== 2) {
        
        return reply(`*Invalid input format. Provide two audio URLs separated by "|".*`);
    }

    const initAudioUrl = urls[0].trim();
    const targetAudioUrl = urls[1].trim();

    
        const apiUrl = `https://matrixcoder.vercel.app/api/VoiceCloner?init_audio=${encodeURIComponent(initAudioUrl)}&target_audio=${encodeURIComponent(targetAudioUrl)}&key=${vcapiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            
            return reply(`Invalid response from the API. Status code: ${response.status}`);
        }

        const result = await response.json();

        console.log('API Response:', result);

        if (result.status === "success" && result.output && result.output.length > 0) {
            const audioUrl = result.output[0];

            await conn.sendMessage(from, { audio: { url: audioUrl},mimetype: 'audio/mp4', ptt: true, fileName: `${q}.mp3`}, { quoted: mek })

            
        } else {
            
            return reply(`Invalid or unexpected API response. ${JSON.stringify(result)}`);
        }
    
		    
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
return reply(`An error occurred while processing the request. ${e.message}`);
l(e)
}
})





cmd({
    pattern: "emojimix",
    react: "😁",
    desc: "To convert 2 imoji to 1",
    category: "main",
    use: '.emojimix',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
  let [emoji1, emoji2] = q.split`+`;
  if (!emoji1) throw `Example: ${prefix + command} 😅+🤔`;
  if (!emoji2) throw `Example: ${prefix + command} 😅+🤔`;
  let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);
  for (let res of anu.results) {
    let encmedia = await conn.sendImageAsSticker(from, res.url, mek, { packname: global.packname, author: global.author, categories: res.tags });
    await fs.unlinkSync(encmedia);
  }
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "trt",
    react: "🔖",
    desc: "To convert languages",
    category: "main",
    use: '.trt',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
    if (!q) return mreply( 'Usage: .trt <language code> <text> or reply message');
    if (q && mek.quoted && mek.quoted.text) {
      let lang = q.slice(0, 2);
try {
        let data = mek.quoted.q;
        let result = await translate(`${data}`, {
          to: lang
        })
        reply(result[0]);
      } catch {
        return reply(` Language code not supported.`);
}
    } else if (q) {
      let lang = q.slice(0, 2);
        let data = q.substring(2).trim();
        let result = await translate(`${data}`, {
          to: lang
        });
        reply(result[0]);
    }     
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
})

	
cmd({
    pattern: "removebg",
    react: "🔮",
    alias: ["rmbg"],
    desc: descg,
    category: "convert",
    use: '.removebg <Reply to image>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    const isQuotedVideo = m.quoted ? ((m.quoted.type === 'videoMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'videoMessage') : false)) : false
    const isQuotedSticker = m.quoted ? (m.quoted.type === 'stickerMessage') : false
  if ((m.type === 'imageMessage') || isQuotedImage) {
    var nameJpg = getRandom('');
    var namePng = getRandom('');
    let buff = isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
    let type = await fileType.fromBuffer(buff);
    await fs.promises.writeFile("./" + type.ext, buff);
    var form = new FormData();
    form.append("image_file", fs.createReadStream("./" + type.ext));
    form.append("size", "auto");

    var rbg = await got.stream.post("https://api.remove.bg/v1.0/removebg", {
      body: form,
      headers: {
        "X-Api-Key": 'fLYByZwbPqdyqkdKK6zcBN9H',
      },
    });
await pipeline(rbg, fs.createWriteStream(namePng + ".png"));
let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *🌆 BACKGROUND REMOVER*

`




if (config.MODE === 'nonbutton') {

	  
const sections = [
    {
	title: "",
	rows: [
{title: "1", rowId: prefix + 'rbgi ' + namePng + ".png", description: 'IMAGE'}, 
{title: "2", rowId: prefix + 'rebgs ' + namePng + ".png", description: 'STICKER'}, 
{title: "3", rowId: prefix + 'rbgd ' + namePng + ".png", description: 'DOCUMENT'}
]
    } 
]
const listMessage = {
caption: dat,
image : { url: config.LOGO },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

  
  
 } if (config.MODE === 'button') {


            let buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "IMAGE",
                    id: prefix + "rbgi"
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "STICKER",
                    id: prefix + "rebgs "
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "DOCUMENT",
                    id: prefix + "rbgd "
                }),
            }
            ]
            let message = {
                image: config.LOGO,
                header: '',
                footer: config.FOOTER,
                body: dat

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
        

}
 
  
  
  
 
  }else return await  reply(imgmsg)
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
  pattern: "rbgi",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
await conn.sendMessage(from, { image: fs.readFileSync(q), caption: config.FOOTER }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})


cmd({
  pattern: "rebgs",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
let sticker = new Sticker(q, {
  pack: pushname, // The pack name
  author: '', // The author name
  type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
  categories: ["🤩", "🎉"], // The sticker category
  id: "12345", // The sticker id
  quality: 75, // The quality of the output file
  background: "transparent", // The sticker background color (only for full stickers)
});
const buffer = await sticker.toBuffer();
await conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})

cmd({
  pattern: "rbgd",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
await conn.sendMessage(from, { document: fs.readFileSync(q), mimetype: 'image/x-png', fileName: 'Removebg' + '.png',caption: config.FOOTER  }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})



cmd({
    pattern: "attp",
    react: "✨",
    alias: ["texttogif"],
    desc: descg1,
    category: "convert",
    use: '.attp HI',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return await reply(imgmsg4)
let bufff = await getBuffer("https://vihangayt.me/maker/text2gif?q=" + q)
await conn.sendMessage(from, {sticker: await videoToWebp(bufff)}, {quoted: mek })
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "ttp",
    react: "✨",
    alias: ["ttp","texttoimg"],
    desc: descdg1,
    category: "convert",
    use: '.ttp HI',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return await reply(imgmsg4)
let bufff = await getBuffer("https://vihangayt.me/maker/text2img?q=" + q)
let sticker = new Sticker(bufff, {
    pack: pushname, // The pack name
    author: '', // The author name
    type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
    categories: ["🤩", "🎉"], // The sticker category
    id: "12345", // The sticker id
    quality: 75, // The quality of the output file
    background: "transparent", // The sticker background color (only for full stickers)
});
const buffer = await sticker.toBuffer();
return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "toptt",
    react: "🔊",
    alias: ["toaudio"],
    desc: descg3,
    category: "convert",
    use: '.toptt <Reply to video>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    let isquotedvid = m.quoted ? (m.quoted.type === 'videoMessage') : m ? (m.type === 'videoMessage') : false
    if(!isquotedvid) return await reply(imgmsg1)
    let media = m.quoted ? await m.quoted.download() : await m.download()
    let auddio = await toPTT(media, 'mp4')
    let senda =  await conn.sendMessage(m.chat, {audio: auddio.options, mimetype:'audio/mpeg'}, {quoted:m})
    await conn.sendMessage(from, { react: { text: '🎼', key: senda.key }})
} catch (e) {
reply('*Error !!*')
l(e)
}
})


//============================================================================

cmd({
    pattern: "imagine",
    alias: ["texttoimage","toimage","aiimage"],
    react: '🤖',
    desc: desct2,
    category: "search",
    use: '.imagine  woman,hair cut collor red,full body,bokeh',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(imgmsg3)
let apilist = await fetchJson('https://gist.githubusercontent.com/vihangayt0/7dbb65f6adfe21538f7febd13982569a/raw/apilis.json')
let list = apilist.users
let apikey = list[Math.floor(Math.random() * list.length)]
const dataget = await fetchJson(apilist.xz +'api/text-to-image?text='+ encodeURIComponent(q) +'&apikey='+ apikey)
return await conn.sendMessage(from, { image: await getBuffer(dataget.imageUrl), caption: `\n*${dataget.promptEn}*\n`}, { quoted: mek })
} catch (e) {
reply(cantf)
l(e)
}
})




cmd({
    pattern: "img2url",
    react: "🔗",
    alias: ["tourl","imgurl","telegraph","imgtourl"],
    desc: desct,
    category: "convert",
    use: '.img2url <reply image>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    

const targetMsg = quoted ? quoted : m;
    const mimeType = (targetMsg.msg || targetMsg).mimetype || "";

    if (!mimeType || !mimeType.startsWith("image")) {
      return reply("❌ Please reply to an image.");
    }

    reply("🔄 Uploading image...");

    const imageBuffer = await targetMsg.download();
    const tempFilePath = path.join(os.tmpdir(), "temp_image.jpg");
    fs.writeFileSync(tempFilePath, imageBuffer);

    const formData = new FormData();
    formData.append("image", fs.createReadStream(tempFilePath));

    const { data } = await axios.post("https://api.imgbb.com/1/upload?key=e909ac2cc8d50250c08f176afef0e333", formData, {
      headers: formData.getHeaders(),
    });

    fs.unlinkSync(tempFilePath); // Delete temp file

    if (!data || !data.data || !data.data.url) {
      throw "❌ Failed to upload the image.";
    }

    const imageUrl = data.data.url;
    const msgContext = {
      mentionedJid: [sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363354023106228@newsletter",
        newsletterName: "JawadTechX",
        serverMessageId: 143
      }
    };

	  
    reply(
      `✅ *Image uploaded successfully!*\n\n✅ *Image Uploaded Successfully 📸*\n📏 *Size:* ${imageBuffer.length} Bytes\n🔗 *URL:* ${imageUrl}\n\n> ⚖️ *Uploaded via VAJIRA-MD*`
    );
  } catch (err) {
    console.error(err);
    reply(` *An error occurred while uploading the image:*\n${err.message}`);
    }
})

cmd({
    pattern: "enhance",
    react: "↗️",
    alias: ["imgenhance","quality","qualityimage","tohd"],
    desc: desct,
    category: "convert",
    use: '.enhance <reply low quality image>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    if ((m.type === 'imageMessage') || isQuotedImage) {
const fileType = require("file-type");
  var nameJpg = getRandom('');
  let buff = isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
  let type = await fileType.fromBuffer(buff);
  await fs.promises.writeFile("./" + type.ext, buff);
  img2url("./" + type.ext).then(async url => {
      await conn.sendMessage(from, { image: await getBuffer('https://vihangayt.me/tools/enhance?url='+url), caption: config.FOOTER }, { quoted: mek })
});
    } else return reply(imgmsg)
} catch (e) {
  reply(cantf);
  l(e);
}
})


cmd({
    pattern: "colorize",
    react: "🎨",
    alias: ["colorizer","tocolour","colourize"],
    desc: desct,
    category: "convert",
    use: '.colorize <reply black & white image>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    if ((m.type === 'imageMessage') || isQuotedImage) {
const fileType = require("file-type");
  var nameJpg = getRandom('');
  let buff = isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
  let type = await fileType.fromBuffer(buff);
  await fs.promises.writeFile("./" + type.ext, buff);
  img2url("./" + type.ext).then(async url => {
    try{
      await conn.sendMessage(from, { image: await getBuffer('https://vihangayt.me/tools/colorize?url='+url), caption: config.FOOTER }, { quoted: mek })
    } catch (e) {
      let apilist = await fetchJson('https://gist.githubusercontent.com/vihangayt0/7dbb65f6adfe21538f7febd13982569a/raw/apilis.json')
      let list = apilist.users
      let apikey = list[Math.floor(Math.random() * list.length)]
      await conn.sendMessage(from, { image: { url: apilist.xz +'api/colorizer?url='+url+'&apikey=' + apikey }, caption: config.FOOTER }, { quoted: mek })
    }
});
    } else return reply(imgmsg)
} catch (e) {
  reply(cantf);
  l(e);
}
})

//===============================ANIME COMMAN=======================================


cmd({
    pattern: "anime",
    alias: ["animesearch","sanime"],
    react: "⛩️",
    desc: descgs,
    category: "search",
    use: '.anime astro',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply(imgmsgs)
let anu = await fetchJson(`https://api.jikan.moe/v4/anime?q=${q}`)
/*let sections = []   
for (let i of anu.data) {
const list = {title: `${i.title}`,	      
rows: [
{
title: i + 1,
rowId: `${prefix}animeeg ${i.mal_id}`,
description: `${i.title}`
}, 
]
}
sections.push(list)   
}

*/
if (anu.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < anu.data.length; i++) {
srh.push({
title: i + 1,
rowId: `${prefix}animeeg ${anu.data[i].mal_id}`,
description: `${anu.data[i].title}`
});
}
const sections = [{
title: "_[Result from ginisisila.]_",
rows: srh
}]	
let listMessage = {
text: `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *ANIME SEARCH*
   
*Search Results From* ${q}`,
footer: config.FOOTER,
title: "",
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
	


cmd({
    pattern: "animeeg",
    dontAddCommandList: true,
    filename: __filename
  },
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try{
  await conn.sendMessage(from, { react: { text: '🔃', key: mek.key }})
  res = await fetchJson(`https://api.jikan.moe/v4/anime/${q}`)
  let txt = `*TITLE:* *${res.data.title}*\n*ENGLISH:* *${res.data.title_english}*\n*JAPANESE:* *${res.data.title_japanese}*\n*TYPE ANIME:* *${res.data.type}*\n*ADAPTER:* *${res.data.source}*\n*TOTAL EPISODE:* *${res.data.episodes}*\n*STATUS:* *${res.data.status}*\n*ONGOING:* *${res.data.airing ? 'Ya' : 'DRIS'}*\n*AIRED:* *${res.data.aired.string}*\n*DURATION:* *${res.data.duration}*\n*RATING:* *${res.data.rating}*\n*SCORE:* *${res.data.score}*\n*RANK:* *${res.data.rank}* `
  conn.sendMessage(from, { image : { url : res.data.images.jpg.image_url}, caption : txt}, {quoted :mek }).catch((err) => reply(''))
  await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
  } catch (e) {
  reply(cants)
  l(e)
  }
  })
  

cmd({
    pattern: "toanime",
    react: "🏮",
    alias: ["imgtoanime","animeimg"],
    desc: desct1,
    category: "convert",
    use: '.toanime <reply image>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    if ((m.type === 'imageMessage') || isQuotedImage) {
const fileType = require("file-type");
  var nameJpg = getRandom('');
  let buff = isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
  let type = await fileType.fromBuffer(buff);
  await fs.promises.writeFile("./" + type.ext, buff);
  img2url("./" + type.ext).then(async url => {
    try{
    await conn.sendMessage(from, { image: await getBuffer('https://vihangayt.me/tools/toanime?url='+url), caption: config.FOOTER }, { quoted: mek })
  } catch (e) {
    let apilist = await fetchJson('https://gist.githubusercontent.com/vihangayt0/7dbb65f6adfe21538f7febd13982569a/raw/apilis.json')
    let list = apilist.users
    let apikey = list[Math.floor(Math.random() * list.length)]
    await conn.sendMessage(from, { image: { url: apilist.xz +'api/toanime?url='+url+'&apikey=' + apikey }, caption: config.FOOTER }, { quoted: mek })
  }
});
    } else return reply(imgmsg)
} catch (e) {
  reply(cantf);
  l(e);
}
})


cmd({
    pattern: "sticker",
    react: "🔮",
    alias: ["s","stic"],
    desc: descg,
    category: "convert",
    use: '.sticker <Reply to image>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    const isQuotedVideo = m.quoted ? ((m.quoted.type === 'videoMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'videoMessage') : false)) : false
    const isQuotedSticker = m.quoted ? (m.quoted.type === 'stickerMessage') : false
     if ((m.type === 'imageMessage') || isQuotedImage) {
      var nameJpg = getRandom('')
      isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
    let sticker = new Sticker(nameJpg + '.jpg', {
      pack: pushname, // The pack name
      author: '', // The author name
      type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
      categories: ["🤩", "🎉"], // The sticker category
      id: "12345", // The sticker id
      quality: 75, // The quality of the output file
      background: "transparent", // The sticker background color (only for full stickers)
  });
  const buffer = await sticker.toBuffer();
  return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
}  else if ( isQuotedSticker ) { 

    var nameWebp = getRandom('')
    await m.quoted.download(nameWebp)
  let sticker = new Sticker(nameWebp + '.webp', {
    pack: pushname, // The pack name
    author: '', // The author name
    type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
    categories: ["🤩", "🎉"], // The sticker category
    id: "12345", // The sticker id
    quality: 75, // The quality of the output file
    background: "transparent", // The sticker background color (only for full stickers)
});
const buffer = await sticker.toBuffer();
return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
}else return await  reply(imgmsg)
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "toimg",
    react: "🔮",
    alias: ["s","stic"],
    desc: descg2,
    category: "convert",
    use: '.sticker <Reply to image>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    const isQuotedVideo = m.quoted ? ((m.quoted.type === 'videoMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'videoMessage') : false)) : false
    const isQuotedSticker = m.quoted ? (m.quoted.type === 'stickerMessage') : false
if ( isQuotedSticker ) { 

var nameJpg = getRandom('');
let buff = isQuotedSticker ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
let type = await fileType.fromBuffer(buff);
await fs.promises.writeFile("./" + type.ext, buff);  
await conn.sendMessage(from, { image: fs.readFileSync("./" + type.ext), caption: config.FOOTER }, { quoted: mek })

}else return await  reply(imgmsg2)
} catch (e) {
reply('*Error !!*')
l(e)
}
})



cmd({
    pattern: "tomp3",
    react: "🔊",
    alias: ["toaudio","tosong"],
    desc: descg,
    category: "convert",
    use: '.toptt <Reply to video>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    let isquotedvid = m.quoted ? (m.quoted.type === 'videoMessage') : m ? (m.type === 'videoMessage') : false
    if(!isquotedvid) return await reply(imgmsg)
    let media = m.quoted ? await m.quoted.download() : await m.download()
    let auddio = await toPTT(media, 'mp4')
    let senda =  await conn.sendMessage(m.chat, {audio: auddio.options, mimetype:'audio/mpeg'}, {quoted:m})
    await conn.sendMessage(from, { react: { text: '🎼', key: senda.key }})
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "toqr",
    react: "🔊",
    desc: descg,
    category: "convert",
    use: '.toqr <Reply a text or a url>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 if (!q) return reply(' Please include link or text!')
                const QrCode = require('qrcode-reader')
                const qrcode = require('qrcode')
                let qyuer = await qrcode.toDataURL(q, {
                    scale: 35
                })
                let data = new Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64')
                let buff = getRandom('.jpg')
                await fs.writeFileSync('./' + buff, data)
                let medi = fs.readFileSync('./' + buff)
                await conn.sendMessage(from, {
                    image: medi,
                    caption: "Here you go!"
                }, {
                    quoted: m
                })
                setTimeout(() => {
                    fs.unlinkSync(buff)
                }, 10000)
await conn.sendMessage(from, { react: { text: '🎼', key: mek.key }})
} catch (e) {
reply('*Error !!*')
l(e)
}
})
