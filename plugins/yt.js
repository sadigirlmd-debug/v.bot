const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const yts = require("yt-search");
const ddownr = require("denethdev-ytmp3");




cmd({
  pattern: "song",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { from, q, reply, l}) => {
        try {
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need link...*' }, { quoted: mek } ) 



function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

			

function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}
			
/*const fixedQuery = convertYouTubeLink(q)(input);
      const search = await yts(fixedQuery);
      const data = search.videos[0];
*/

q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        
			
      const result = await ddownr.download(data.url, 'mp3');
      const downloadLink = result.downloadUrl;


			
    // Caption
    const caption =
      `🎧 *VAJIRA SONG DOWNLOADER*\n\n` +
      `🎼 Title: *${data.title}*\n` +
      `📅 Uploaded: ${data.ago}\n` +
      `⏱ Duration: ${data.timestamp}\n` +
      `👁 Views: ${data.views}\n` +
      `🔗 URL: ${data.url}\n\n` +
      `● *VAJIRA MINI BOT* ●`;
await conn.sendMessage(from, {
        image: { url: data.thumbnail },
        caption
      }, { quoted: mek });
    
		
const message = {
            audio: { url: downloadLink },
	        mimetype: "audio/mpeg",
            ptt: false,
        };	    
        await conn.sendMessage(from, message );
        
    
		
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})
