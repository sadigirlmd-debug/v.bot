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


        


cmd({
    pattern: "song",
    use: '.song [song name or link]',
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

	const cap = `📽️ *ᴠᴀᴊɪʀᴀ-ᴍᴅ ꜱᴏɴʜ-ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*📽️

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
  footer: `*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
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
  footer: `*ᴠᴀᴊɪʀᴀ-ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
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

	const cap = `📽️ *ᴠᴀᴊɪʀᴀ-ᴍᴅ ᴠɪᴅᴇᴏ-ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*📽️

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
	    {title: "1", rowId: prefix + `ytv ${q}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytvdoc ${q}` , description: 'Document type song 📂'},

	]
    } 
]
const listMessage = {
  text: cap,
  footer: `*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
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
	    {title: "1", rowId: prefix + `ytv ${q}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytvdoc ${q}` , description: 'Document type song 📂'},

	]
    } 
]
const listMessage = {
  text: cap,
  footer: `*ᴠᴀᴊɪʀᴀ-ᴍᴅ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ ʙᴏᴛ:ᴠ-ɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
  buttonText: "```🔢 Reply below number you need song type,```",
  sections }	

	     
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
	    }
        

const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `ytv ${data.url}` , description: 'Normal type song 🎶'},
	    {title: "2", rowId: prefix + `ytvdoc ${data.url}` , description: 'Document type song 📂'},

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








