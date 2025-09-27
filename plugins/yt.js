const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");

function ytreg(url) {
    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
    return ytIdRegex.test(url);
}



// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

const formatViews = views => views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B` : views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M` : views >= 1_000 ? `${(views / 1_000).toFixed(1)}K` : views.toString(); 


let autoSongInterval = null;
let sentSongUrls = new Set();

cmd({
  pattern: "startsongs",
  desc: "Start sending YouTube songs under 8 minutes every 2 minutes",
  category: "download",
  filename: __filename,
},
async (conn, mek, m, { reply, q }) => {
  if (autoSongInterval) return reply("🟡 Already running!");

  const targetJid = q || m.chat;
  reply("✅ Auto song sending started. Songs will be sent every 8 minutes.");

  autoSongInterval = setInterval(async () => {
    try {
      const search = await yts("latest new song");

      const video = search.videos.find(v => {
        if (sentSongUrls.has(v.url)) return false;

        const time = v.timestamp.split(":").map(Number); // e.g. "4:35" => [4, 35]
        const durationInSec = time.length === 3
          ? time[0] * 3600 + time[1] * 60 + time[2]
          : time[0] * 60 + time[1];

        return durationInSec <= 480; // Only songs 8 minutes or shorter
      });

      if (!video) {
        clearInterval(autoSongInterval);
        autoSongInterval = null;
        return reply("✅ All suitable songs sent. Stopping...");
      }

      sentSongUrls.add(video.url);

if (q.includes(" ")) {
      const desc = `*☘️ ᴛɪᴛʟᴇ : ${video.title}*
📅 ᴀɢᴏ   : ${video.ago}    
⏱️ ᴛɪᴍᴇ  : ${video.timestamp}   
🎭 ᴠɪᴇᴡꜱ : ${video.views}
🔗 ᴜʀʟ   : ${video.url} 

> *Use headphones for best experience*

*👇🏻මේ වගේ ලස්සන සිංදු අහන්න මෙන්න මෙහෙට එන්ඩ අනේහ්....*😚💕"

*🌟 𝗙𝗼𝗹𝗹𝗼𝘄 𝗨𝘀 -* https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z

${config.FOOTER}`;

      await conn.sendMessage(targetJid, {
        image: { url: video.thumbnail },
        caption: desc,
      });

      const songData = await ytmp3(video.url, "64");
      if (!songData?.download?.url) return;

      await conn.sendMessage(targetJid, {
        audio: { url: songData.download.url },
        mimetype: "audio/mpeg",
        ptt: true,
      });

} if (q.includes("120363287634683059@newsletter")) {
	  
const desc = `*☘️ ᴛɪᴛʟᴇ : ${video.title}*
📅 ᴀɢᴏ   : ${video.ago}    
⏱️ ᴛɪᴍᴇ  : ${video.timestamp}   
🎭 ᴠɪᴇᴡꜱ : ${video.views}
🔗 ᴜʀʟ   : ${video.url} 

> *Use headphones for best experience*

*👇🏻මේ වගේ ලස්සන සිංදු අහන්න මෙන්න මෙහෙට එන්ඩ අනේහ්....*😚💕"

*🌟 𝗙𝗼𝗹𝗹𝗼𝘄 𝗨𝘀 -* https://whatsapp.com/channel/0029Vac3pnlBlHpXLrUBym3a

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴅᴅ ɢᴀɴɢꜱ`;

      await conn.sendMessage(targetJid, {
        image: { url: video.thumbnail },
        caption: desc,
      });

      const songData = await ytmp3(video.url, "64");
      if (!songData?.download?.url) return;

      await conn.sendMessage(targetJid, {
        audio: { url: songData.download.url },
        mimetype: "audio/mpeg",
        ptt: true,
      });

	 }		 
    } catch (e) {
      console.error("Song sending error:", e);
    }
  }, 8 * 60 * 1000); // 2 minutes
});



cmd({
  pattern: "stopsongs",
  desc: "Stop song auto-sending",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { reply }) => {
  if (!autoSongInterval) return reply("⛔ Not running.");
  clearInterval(autoSongInterval);
  autoSongInterval = null;
  reply("🛑 Auto song sending stopped.");
});       


cmd({
    pattern: "song",
    use: '.song [song name or link]',
    react: "🎧",
    desc: '',
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

//if (!q) return await reply(imgmsg)
//if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)

q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;	

	const cap = `🎧 *ᴢᴀɴᴛᴀ-xᴍᴅ ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* 🎧

┌──────────────────

*ℹ️ Title:* ${data.title}
*👁️‍🗨️ Views:* ${data.views}
*🕘 Duration:* ${data.timestamp}
*📌 Ago :* ${data.ago}
*🔗 Url:* ${data.url} 

└──────────────────`


	
if(isUrl(q) && q.includes('/shorts')){let dat = `[👨‍💻 පුක සුදුද 👨‍💻]

   *SELECT SONG TYPE*`
				      
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytmp3 ${q}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytdoc ${q}` , description: 'Document type song 📂'},

	]
    } 
]
const listMessage = {
  text: cap,
  footer: `*ᴢᴀɴᴛᴀ-xᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴜʀᴀɴɢᴀ ᴍᴏᴅ-ᴢ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections
}

return await conn.replyList(from, listMessage ,{ quoted : mek }) 				      
				     }
if(ytreg(q)){let dat = `[👨‍💻 පුක සුදුද 👨‍💻]

*SELECT SONG TYPE*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytmp3 ${q}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytdoc ${q}` , description: 'Document type song 📂'},

	]
    } 
]
const listMessage = {
  text: cap,
  footer: `*ᴢᴀɴᴛᴀ-xᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴜʀᴀɴɢᴀ ᴍᴏᴅ-ᴢ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections }	

	     
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
	    }
        

const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytmp3 ${data.url}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytdoc ${data.url}` , description: 'Document type song 📂'},

	]
    } 
]
const listMessage = {
  image: {url: data.thumbnail},
  caption: cap,
footer: config.FOOTER,
title: '',
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
    pattern: "video",
    use: '.video [song name or link]',
    react: "🎬",
    desc: '',
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

//if (!q) return await reply(imgmsg)
//if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)

q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;	

	const cap = `📽️ *ᴢᴀɴᴛᴀ-xᴍᴅ ᴠɪᴅᴇᴏ-ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*📽️

┌──────────────────

*ℹ️ Title:* ${data.title}
*👁️‍🗨️ Views:* ${data.views}
*🕘 Duration:* ${data.timestamp}
*📌 Ago :* ${data.ago}
*🔗 Url:* ${data.url} 

└──────────────────`


	
if(isUrl(q) && q.includes('/shorts')){let dat = `[👨‍💻 පුක සුදුද 👨‍💻]

   *SELECT VIDEO TYPE*`
				      
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytv ${q}` , description: 'Normal type Video 🎶'},
	    {title: "2", rowId: prefix + `ytvdoc ${q}` , description: 'Document type video 📂'},

	]
    } 
]
const listMessage = {
  text: cap,
  footer: `*ᴢᴀɴᴛᴀ-xᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴜʀᴀɴɢᴀ ᴍᴏᴅ-ᴢ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections
}

return await conn.replyList(from, listMessage ,{ quoted : mek }) 				      
				     }
if(ytreg(q)){let dat = `[👨‍💻 පුක සුදුද 👨‍💻]

*SELECT SONG TYPE*`
const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytv ${q}` , description: 'Normal type video 🎶'},
	    {title: "2", rowId: prefix + `ytvdoc ${q}` , description: 'Document type video 📂'},

	]
    } 
]
const listMessage = {
  text: cap,
  footer: `*ᴢᴀɴᴛᴀ-xᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴜʀᴀɴɢᴀ ᴍᴏᴅ-ᴢ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections }	

	     
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
	    }
        

const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytv ${data.url}` , description: 'Normal type video 🎶'},
	    {title: "2", rowId: prefix + `ytvdoc ${data.url}` , description: 'Document type video 📂'},

	]
    } 
]
const listMessage = {
  image: {url: data.thumbnail},
  caption: cap,
footer: config.FOOTER,
title: '',
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

      
conn.sendMessage(from, {
                        document: {
                            url: mediaUrl
                        },
                        mimetype: 'video/mp4',
                        fileName: data.video.videos.text + '.mp4',
                        caption: `${data.video.videos.text}\n\n${config.FOOTER}`
                    }, {
                        quoted: m
                    })
        // React to show finished
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });

    } catch (e) {
        reply('*ERROR !!*');
        console.error(e);
    }
});