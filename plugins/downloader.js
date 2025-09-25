const {
    default: makeWASocket,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('@whiskeysockets/baileys')

const config = require('../settings')
const fg = require('api-dylux');
const apkdl = require('../lib/apkdl')
const { mediafireDl } = require('mfiredlcore-vihangayt')
const { cmd, commands } = require('../lib/command')
const { Download } = require("nima-threads-dl-api")
const { getBuffer, getFile, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
const { pinterest, wallpaper, wikimedia, quotesAnime, aiovideodl, umma, ringtone, styletext } = require('../lib/scraper')
const gis = require('async-g-i-s')
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const vm = require('vm')
const { facebook } = require('@mrnima/facebook-downloader');
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const yts = require('yt-search');
const FormData = require('form-data')
const videoSearchResults = new Map()
var request = require("request")
let currentPollIndex = 0
let optionIndex = 1;
const fs = require('fs');
const {unsplash, pixabay} = require("@sl-code-lords/image-library")
var {subsearch , subdl }  = require('@sl-code-lords/si-subdl')
var uploader = "🎬 TC TEAM MOVIE-DL 🎬 "
const { sizeFormatter} = require('human-readable');
const { File } = require('megajs')
const { Tiktok } = require('../lib/tiktok')
function regtik(url) {return url.includes('tiktok.com')}
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
async function fbDownloader(url) {
	try {
		const response1 = await axios({
			method: 'POST',
			url: 'https://snapsave.app/action.php?lang=vn',
			headers: {
				"accept": "*/*",
				"accept-language": "vi,en-US;q=0.9,en;q=0.8",
				"content-type": "multipart/form-data",
				"sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "\"Windows\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"Referer": "https://snapsave.app/vn",
				"Referrer-Policy": "strict-origin-when-cross-origin"
			},
			data: {
				url
			}
		});

		let html;
		const evalCode = response1.data.replace('return decodeURIComponent', 'html = decodeURIComponent')
		eval(evalCode);
		html = html.split('innerHTML = "')[1].split('";\n')[0].replace(/\\"/g, '"')

		const $ = cheerio.load(html)
		const download = []

		const tbody = $('table').find('tbody')
		const trs = tbody.find('tr')

		trs.each(function (i, elem) {
			const trElement = $(elem)
			const tds = trElement.children()
			const quality = $(tds[0]).text().trim()
			const url = $(tds[2]).children('a').attr('href')
			if (url != undefined) {
				download.push({
					quality,
					url
				});
			}
		});

		return {
			success: true,
			download
		};
	}
	catch (err) {
		return {
			success: false
		};
	}
}
function fbreg(url) {
const fbRegex = /(?:https?:\/\/)?(?:www\.)?(m\.facebook|facebook|fb)\.(com|me|watch)\/(?:(?:\w\.)*#!\/)?(?:groups\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
return fbRegex.test(url)
}



const clean = (data) => {
  let regex = /(<([^>]+)>)/gi;
  data = data.replace(/(<br?\s?\/>)/gi, " \n");
  return data.replace(regex, "");
};

async function shortener(url) {
  return url;
}


  

//============================================================================

async function Insta(match) {
  const result = []
          const form = {
            url: match,
            submit: '',
          }
          const { data } = await axios(`https://downloadgram.org/`, {
            method: 'POST',
            data: form
          })
          const $ = cheerio.load(data)
                  $('#downloadhere > a').each(function (a,b) {
          const url = $(b).attr('href')
          if (url) result.push(url)
        })
              return result
  }

//============================================================================

async function sswebA(url = '', full = false, type = 'desktop') {
	type = type.toLowerCase()
	if (!['desktop', 'tablet', 'phone'].includes(type)) type = 'desktop'
	let form = new URLSearchParams()
	form.append('url', url)
	form.append('device', type)
	if (!!full) form.append('full', 'on')
	form.append('cacheLimit', 0)
	let res = await axios({
		url: 'https://www.screenshotmachine.com/capture.php',
		method: 'post',
		data: form
	})
	let cookies = res.headers['set-cookie']
	let buffer = await axios({
		url: 'https://www.screenshotmachine.com/' + res.data.link,
		headers: {
			'cookie': cookies.join('')
		},
		responseType: 'arraybuffer' 
	})
	return Buffer.from(buffer.data)
}



function formatUploadDate(uploadDate) {
  const date = new Date(uploadDate);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}



let soundcloud = async (link) => {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'POST',
			url: "https://www.klickaud.co/download.php",
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			formData: {
				'value': link,
				'2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37': '710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3'
			}
		};
		request(options, async function(error, response, body) {

			if (error) throw new Error(error);
			const $ = cheerio.load(body)
			resolve({
				judul: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)').text(),
				download_count: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)').text(),
				thumb: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img').attr('src'),
				link: $('#dlMP3').attr('onclick').split(`downloadFile('`)[1].split(`',`)[0]
			});
		});
	})
}

async function ssearch (i){let e="https://m.soundcloud.com",t=await axios.get(`${e}/search?q=${encodeURIComponent(i)}`,{headers:{"User-Agent":'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'}}),a=cheerio.load(t.data),d=[];return a("div > ul > li > div").each((function(i,t){let r=a(t).find("a").attr("aria-label"),v=e+a(t).find("a").attr("href"),s=a(t).find("a > div > div > div > picture > img").attr("src"),n=a(t).find("a > div > div > div").eq(1).text(),o=a(t).find("a > div > div > div > div > div").eq(0).text(),u=a(t).find("a > div > div > div > div > div").eq(1).text(),l=a(t).find("a > div > div > div > div > div").eq(2).text();d.push({title:r,url:v,thumb:s,artist:n,views:o,release:l,timestamp:u})})),{status:t.status,creator:"Caliph",result:d}}



async function GDriveDl(url) {
    let id, res = { "error": true }
    if (!(url && url.match(/drive\.google/i))) return res

    const formatSize = sizeFormatter({
        std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
    })

    try {
        id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
        if (!id) throw 'ID Not Found'
        res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
            method: 'post',
            headers: {
                'accept-encoding': 'gzip, deflate, br',
                'content-length': 0,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'origin': 'https://drive.google.com',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
                'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
                'x-drive-first-party': 'DriveWebUi',
                'x-json-requested': 'true'
            }
        })
        let { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4))
        if (!downloadUrl) throw 'Link Download Limit!'
        let data = await fetch(downloadUrl)
        if (data.status !== 200) return data.statusText
        return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
    } catch (e) {
        console.log(e)
        return res
    }
}






var needus =''
if(config.LANG === 'SI') needus = '*කරුණාකර මට threads url එකක් දෙන්න !!*'
else needus = "*Please give me threads url !!*" 
var cantf =''
if(config.LANG === 'SI') cantf = '*මට මෙම වීඩියෝව සොයාගත නොහැක!*'
else cantf = "*I cant find this video!*"
var N_FOUND =''
if(config.LANG === 'SI') N_FOUND = "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
else N_FOUND = "*I couldn't find anything :(*"
var urlneed =''
if(config.LANG === 'SI') urlneed = "එය Baiscopelk වෙතින් සිංහල උපසිරැසි බාගත කරයි."
else urlneed = "It downloads sinhala subtitle from Baiscopelk."
var imgmsg =''
if(config.LANG === 'SI') imgmsg = "```කරුණාකර වචන කිහිපයක් ලියන්න!```"
else imgmsg = "```Please write a few words!```"
var desc =''
if(config.LANG === 'SI') desc = "Tiktok වෙතින් වීඩියෝ බාගත කරයි."
else desc = "Download videos from Facebook."
var urlneed1 =''
if(config.LANG === 'SI') urlneed1 = "*කරුණාකර Tiktok video url එකක් ලබා දෙන්න*"
else urlneed1 = "*Please give me tiktok video url..*"
var desc1 =''
if(config.LANG === 'SI') desc1 = "Facebook වෙතින් වීඩියෝ බාගත කරයි."
else desc1 = "Download videos from Facebook."
var urlneed2 =''
if(config.LANG === 'SI') urlneed2 = "*කරුණාකර facebook video url එකක් ලබා දෙන්න*"
else urlneed2 = "*Please give me facebook video url..*"
var desc5 =''
if(config.LANG === 'SI') desc5 = "ගූගල් හි අදාළ පින්තූර සෙවීම."
else desc5 = "Search for related pics on Google."
var desc2 =''
if(config.LANG === 'SI') desc2 = "unsplash.com හි අදාළ පින්තූර සෙවීම."
else desc2 = "Search for related pics on unsplash.com."
var desc3 =''
if(config.LANG === 'SI') desc3 = "pixabay.com හි අදාළ පින්තූර සෙවීම."
else desc3 = "Search for related pics on pixabay.com."
var desc4 =''
if(config.LANG === 'SI') desc4 = "bing හි අදාළ පින්තූර සෙවීම."
else desc4 = "Searche for related pics on bing."
var errt =''
if(config.LANG === 'SI') errt = "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
else errt = "*I couldn't find anything :(*"
var needus =''
if(config.LANG === 'SI') needus = '*කරුණාකර මට Instagram url එකක් දෙන්න !!*'
else needus = "*Please give me Instagram url !!*" 
var imgmsg1 =''
if(config.LANG === 'SI') imgmsg1 = '*කරුණාකර මට url එකක් දෙන්න !*'
else imgmsg1 = "*Please give me a url !*"
var descg = ''
if(config.LANG === 'SI') descg = "එය ලබා දී ඇති url හි desktop ප්‍රමාණයේ තිර රුවක් ලබා දෙයි."
else descg = "It gives desktop size screenshot of given url."
var descp = ''
if(config.LANG === 'SI') descp = "එය ලබා දී ඇති url හි දුරකථන ප්‍රමාණයේ තිර රුවක් ලබා දෙයි."
else descp = "It gives phone size screenshot of given url."
var desct = ''
if(config.LANG === 'SI') desct = "එය ලබා දී ඇති url හි ටැබ්ලට් ප්‍රමාණයේ තිර රුවක් ලබා දෙයි."
else desct = "It gives tablet size screenshot of given url."
var cant = ''
if(config.LANG === 'SI') cant = "*මට තිර රුවක් ලබා ගත නොහැක. පසුව නැවත උත්සාහ කරන්න.*"
else cant = "*I can't get a screenshot. Try again later.*"
var urlneed3 =''
if(config.LANG === 'SI') urlneed3 = "එය androidapksfree වෙතින් mod apps බාගත කරයි."
else urlneed3 = "It downloads mod apps from androidapksfree."
var urlneed4 =''
if(config.LANG === 'SI') urlneed4 = "එය playstore වෙතින් apps බාගත කරයි."
else urlneed4 = "It downloads apps from playstore."

//============================================================================


cmd({
    pattern: "xhamster",
    category: "download",
    react: "🎬",
    desc: "xhamster downloader",
    use: ".xhamster mia",
    filename: __filename   
},
    async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
    // Mock API response (Replace this with the actual API endpoint if needed)
    
const url = `https://xhamster.com/search/${q}`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const result = [];
    $("div > div.thumb-list > div.thumb-list__item.video-thumb.video-thumb--type-video").each((c, d) => {

        result.push({
             
         title: $(d).find("div > div:nth-child(2) > a").text(),
         link: $(d).find("div > div:nth-child(2) > a").attr("href")

         
        })
    })
    
if (result.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )		
	

var srh = [];  		
	
for (var i = 0; i < result.length; i++) {
srh.push({
title: i + 1,	
description: `${result[i].title}`,
rowId: prefix + 'xhamsterdl ' + result[i].link
});

	
}		
const sections = [
	{
title: "*Spotify*\n",
rows: srh
}
]

    const listMessage = {
text: `VAJIRA MD XHAMSTER\n`,	    
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
    pattern: "spotify",
    category: "download",
    react: "🎬",
    desc: "spotify downloader",
    use: ".spotify lelena",
    filename: __filename   
},
    async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
    // Mock API response (Replace this with the actual API endpoint if needed)
    
const links = await fetchJson(`https://vajira-official-api.vercel.app/search/spotify?q=${q}`)

const search = links.result
    if (config.MODE === 'nonbutton') {
if (search.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )		
	

var srh = [];  		
	
for (var i = 0; i < search.length; i++) {
srh.push({
title: i + 1,	
description: `${search[i].title}`,
rowId: prefix + 'spotifydl ' + search[i].url
});

	
}		
const sections = [
	{
title: "*Spotify*\n",
rows: srh
}
]

    const listMessage = {
text: `VAJIRA MD SPOTIFY-DL\n`,	    
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })


} if (config.MODE === 'button') {


            if (search.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < search.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  search[i].title,
              id: prefix + 'spotifydl ' + search[i].url
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from Spotify. 📲',
                        sections
                    })
                }]
    
        let message = {
            image: config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: ''
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	
	
		
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
    




				

cmd({
    pattern: "spotifydl",
    react: "📥",
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) { 
	return await reply('*Please provide a direct URL!*')}
    try {

const response = await fetchJson(`https://vajira-official-api.vercel.app/download/spotifydl?url=${q}`)
const details = response.result
  
const cap = `
🎵 *Spotify Track Details* 🎵

📌 *Title*: ${details.title}
🎤 *Artist*: ${details.artis}
⏱️ *Durasi*: ${details.durasi}
🔗 *Type*: ${details.type}

🔍 *Powered by* ${config.FOOTER}
    `;

    


	    
var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}



await conn.sendMessage(from, { image: { url: details.image }, caption: cap }, { quoted: mek });

	    
        const message = {
            audio: await getBuffer(details.download),
	        caption: "*ᴠᴀᴊɪʀᴀ-ᴍᴅ ʙʏʙᴛᴅᴅ ɢᴀɴɢꜱ*",
            mimetype: "audio/mpeg",
            fileName: `${details.title}\nVAJIRA-MD.mp3`,
        };

	    
	const message1 = {
            document: await getBuffer(details.download),
	        caption: "*ᴠᴀᴊɪʀᴀ-ᴍᴅ ʙʏʙᴛᴅᴅ ɢᴀɴɢꜱ*",
            mimetype: "audio/mpeg",
            fileName: `${details.title}\nVAJIRA-MD.mp3`,
        };    

        await conn.sendMessage(from, message );
await conn.sendMessage(from, message1 );
        
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
      //  await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});





cmd({
    pattern: "appletone",
    category: "download",
    react: "🎬",
    desc: "apple ringtone downloader",
    use: ".appletone 2024",
    filename: __filename   
},
    async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

  
const url = `https://www.prokerala.com/downloads/ringtones/search/?q=${q}&mode=search`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const appletone = [];
    $("ul > li.list-item-outer").each((c, d) => {

        appletone.push({
             
         title: $(d).find("div.list-item-body > div > a").text(),
         link: $(d).find("div.list-item-body > div > a").attr("href")

         
        })
    })
 
if (config.MODE === 'button') {

		
if (appletone.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )		
	

var srh = [];  		
	
for (var i = 0; i < appletone.length; i++) {
srh.push({
title: i + 1,	
description: `${appletone[i].title}`,
rowId: prefix + 'appletonedl ' + appletone[i].link
});

	
}		
const sections = [
	{
title: "*APPLETONE*\n",
rows: srh
}
]

    const listMessage = {
text: `VAJIRA MD APPLETONE-DL\n`,	    
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'nonbutton') {


            if (appletone.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < appletone.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  appletone[i].title,
              id: prefix + 'appletonedl ' + appletone[i].link
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from Appletone. 📲',
                        sections
                    })
                }]
    
        let message = {
            image: config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: ''
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	

		
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "appletonedl",
    react: "📥",
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }
    try {

const url = `https://dl.prokerala.com${q}`
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const title = $("header > h1").text()
    const dllink = $("#download-options > a").attr("href")
    const duration = $("span.player-total-duration").text()	

    
var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}


        const message = {
            audio: await getBuffer(dllink),
	    caption: `Duration: ${duration}\n\n*ᴠᴀᴊɪʀᴀ-ᴍᴅ ʙʏ ᴛᴅᴅ ɢᴀɴɢꜱ*`,
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`,
        };

	const message1 = {
            document: await getBuffer(dllink),
	    caption: `Duration: ${duration}\n\n*ᴠᴀᴊɪʀᴀ-ᴍᴅ ʙʏ ᴛᴅᴅ ɢᴀɴɢꜱ*`,
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`,
        };    

        await conn.sendMessage(from, message );
await conn.sendMessage(from, message1 );
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});


cmd({
    pattern: "sounddl",
    filename: __filename   
},
    async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
        try {
        
const data = await fetchJson(`https://vajira-official-api.vercel.app/search/soundcloud?url=${q}`)

const cap = `Title: ${data.result.title}
             Duration: ${data.result.duration}
	     Quality: ${data.result.quality}`
if (config.MODE === 'nonbutton') {

        
const sections = [
{
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `saud ` + data.result.download , description: 'Download Normal Song'},
            {title: "2", rowId: prefix + `sdoc ` + data.result.download , description: 'Download Document Song'},

      ]
    }	  	  
]

    const listMessage = {
caption: cap,
image : { url: data.result.thumbnail },	    
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {


        let sections = [{
                title: 'VAJIRA MD',
                rows: [{
                        title: 'Audio 🎧',
                        description: `Download Audio file`,
                        id: `${prefix}saud ` + data.result.download
                    },
                    {
                        title: 'Document 📁',
                        description: `Download Document file`,
                        id: `${prefix}sdoc ` + data.result.download
                    },
                ]
            }
        ]

        let listMessage = {
            title: 'Click Here⎙',
            sections
        };
        conn.sendMessage(from, {
            image: { url: data.result.thumbnail },
    caption: cap,
    footer: config.FOOTER,
                buttons: [
			{
                    buttonId: `${prefix}saud  ${data.result.download}`,
                    buttonText: {
                        displayText: 'Audio 🎧'
                    },
                },
		{
                    buttonId: `${prefix}sdoc ${data.result.download}`,
                    buttonText: {
                        displayText: 'Document 📁'
                    },
                },	
                {
                    buttonId: 'action',
                    buttonText: {
                        displayText: 'ini pesan interactiveMeta'
                    },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify(listMessage),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });
	
}
		
		    
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "fetch",
    react: "📥",
    category:"download",
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {

const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tc_movie_dl_system'
	    
var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}


        const message = {
            document: await getBuffer(mediaUrl),
	        caption: "*ᴠᴀᴊɪʀᴀ-ᴍᴅ ʙʏʙᴛᴅᴅ ɢᴀɴɢꜱ*",
            mimetype: "video/mp4",
            fileName: `${title}\nVAJIRA-MD.mp4`,
        };

	const message1 = {
            document: await getBuffer(mediaUrl),
	        caption: "*ᴠᴀᴊɪʀᴀ-ᴍᴅ ʙʏʙᴛᴅᴅ ɢᴀɴɢꜱ*",
            mimetype: "audio/mpeg",
            fileName: `${title}\nVAJIRA-MD.mp3`,
        };    

        await conn.sendMessage(from, message );
await conn.sendMessage(from, message1 );
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});










cmd({
    pattern: "save",
    category: "download",
    react: "🎧",
    use: ".save",
    filename: __filename
},

    async (conn, m, mek, { from, q, reply }) => {
        try {
            
//const { repondre , msgRepondu , superUser, auteurMessage } = commandeOptions;

var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});		
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const decodeJid = (jid) => {
                if (!jid)
                    return jid;
                if (/:\d+@/gi.test(jid)) {
                    let decode = (0, baileys_1.jidDecode)(jid) || {};
                    return decode.user && decode.server && decode.user + '@' + decode.server || jid;
                }
                else
                    return jid;
            };
var origineMessage = mek.key.remoteJid;
const verifGroupe = origineMessage?.endsWith("@g.us");		
var auteurMessage = verifGroupe ? (ms.key.participant ? ms.key.participant : ms.participant) : origineMessage;
 var idBot = decodeJid(conn.user.id);
var servBot = idBot.split('@')[0];
const FranceKing = '94719199757';		
var msgRepondu = mek.message.extendedTextMessage?.contextInfo?.quotedMessage;
var superUser=[servBot,FranceKing].map((s)=>s.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);
var auteurMessage = verifGroupe ? (mek.key.participant ? mek.key.participant : mek.participant) : origineMessage;

		
  
      if(msgRepondu) {

        console.log(msgRepondu) ;

        let msg ;
  
        if (msgRepondu.imageMessage) {
  
          
  
       let media  = await conn.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
       // console.log(msgRepondu) ;
       msg = {
  
         image : { url : media } ,
         caption : msgRepondu.imageMessage.caption,
         
       }
      
  
        } else if (msgRepondu.videoMessage) {
  
          let media  = await conn.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;
  
          msg = {
  
            video : { url : media } ,
            caption : msgRepondu.videoMessage.caption,
            
          }
  
        } else if (msgRepondu.audioMessage) {
      
          let media  = await conn.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;
         
          msg = {
     
            audio : { url : media } ,
            mimetype:'audio/mp4',
             }     
          
        } else if (msgRepondu.stickerMessage) {
  
      
          let media  = await conn.downloadAndSaveMediaMessage(msgRepondu.stickerMessage)
  
          let stickerMess = new Sticker(media, {
            pack: 'VAJIRA-MD',
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
         
          msg = { sticker: stickerBuffer2}
  
  
        }  else {
            msg = {
               q : msgRepondu.conversation,
            }
        }
  
      conn.sendMessage(auteurMessage,msg)
  
      } else { 
	      reply('Mention the message that you want to save') }
  
        } catch (e) {
            console.log(e)
            reply('*Error !!*')
        }
    });




cmd({
    pattern: "pastpaper",	
    react: '📑',
    category: "download",
    desc: "pastpaper downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

const url = `https://govdoc.lk/`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const results = [];
    $("#nav > li:nth-child(4) > #submenu-1-4 > li.nav-item").each((c, d) => {

        results.push({
             
         link: $(d).find("a").attr("href"),
         title: $(d).find("a").text().replace(/\n/g,'').replace(/     /g,'')
   
        })
    })

if (config.MODE === 'nonbutton') {

if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title,
rowId: prefix + 'pp ' + results[i].link
});
}
const sections = [{
title: "_[Result from GovDoc.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD PASTPAPER-DL 🎬`,
image : { url: config.LOGO },	    
footer: config.FOOTER,
title: 'Result from GovDoc. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {


            if (results.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < results.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  results[i].title,
              id: prefix + 'pp ' + results[i].link
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from Pastpaper. 📲',
                        sections
                    })
                }]
    
        let message = {
            image: config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: ''
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "pp",	
    react: '📑',
    desc: "pastpaper downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
const response = await axios.get(q);  
const $ = cheerio.load(response.data);
   
    const results = [];
    $("div.row.justify-content-center > div").each((c, d) => {

        results.push({
          
         title: $(d).find("h5.cate-title").text(),
         link: $(d).find("a").attr("href"),
         image: $(d).find("img.img-fluid").attr("src")
         
   
        })
    })
	console.log(results)
if (config.MODE === 'nonbutton') {
	
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title,
rowId: prefix + 'pp1 ' + results[i].link
});
}
const sections = [
{
title: "_[Result from GovDoc.]_",
rows: srh
},
{
	title: "↪️ Other Pages",
	rows: [
	    {title: "1.1", rowId: prefix + `pp1 ${q}?page=2` , description: 'Next Page ↪️'},
	]
    } 
]


	
    const listMessage = {
caption: `🎬 VAJIRA MD PASTPAPER-DL 🎬`,
image : { url: results[0].image },	    
footer: config.FOOTER,
title: 'Result from GOVDOC. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })


} if (config.MODE === 'button') {


            if (results.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < results.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  results[i].title,
              id: prefix + 'pp1 ' + results[i].link
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from Pastpaper. 📲',
                        sections
                    })
                }]
    
        let message = {
            image: results[0].image,
            header: '',
            footer: config.FOOTER,
            body: ''
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	


} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "pp1",	
    react: '📑',
    desc: "pastpaper downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
const response = await axios.get(q);  
const $ = cheerio.load(response.data);
   
    const results = [];
    $("div.row.align-items-end > div").each((c, d) => {

        results.push({
          
         title: $(d).find("div.button.cart-button > button.btn").text(),
       link: $(d).find("a").attr("href"),
         
   
        })
    })


const title1 = $("h1.page-title").text()
const desc = $("div.container > div:nth-child(1) > div > p").text()
const cap = `VAJIRA MD PASTPAPER-DL


*📚 Title: ${title1}*
 *📈 Desc: ${desc}*

─────────────────────────────`

if (config.MODE === 'nonbutton') {	

if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: `${results[i].title} medium`,
rowId: prefix + `ppdl ${results[i].link}|${title1}`
});
}
const sections = [
{
title: "_[Select Medium.]_",
rows: srh
    } 
]
	
    const listMessage = {
text: cap,    
footer: config.FOOTER,
title: 'Result from GOVDOC. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })


} if (config.MODE === 'button') {


            if (results.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < results.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  results[i].title,
              id: prefix + 'pp1 ' + results[i].link
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from Pastpaper. 📲',
                        sections
                    })
                }]
    
        let message = {
            image: config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: cap
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	

} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})




cmd({
    pattern: "ppdl",
    react: '📦',
    desc: "apk downloader",
    category: "",
    use: '.apk whatsapp',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
var msg = mek
await conn.sendMessage(from, { react: { text: 'ℹ️', key: msg.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need apk link...*' }, { quoted: msg } ) 

const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'vajira_md_dl_system'



	
const response1 = await axios.get(mediaUrl);  
const $1 = cheerio.load(response1.data);
const link1 = $1("div.col-md-12.d-flex.justify-content-center.mt-md-5.mt-4.mb-4.mx-3 > div > a").attr("href")
const response2 = await axios.get(link1);  
const $2 = cheerio.load(response2.data);
const dllink = $2("#download").attr("href")


var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}


        const message = {
            document: await getBuffer(dllink),
	        caption: "*🎬 VAJIRA MD 🎬*",
            mimetype: "application/pdf",
            fileName: `${title}.pdf`,
        };

        await conn.sendMessage(from, message );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})




cmd({
    pattern: "modwhatsapp",	
    react: '📑',
    category: "download",
    desc: "modapk downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://apkdon.net/?s=${q}`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const results = [];
    $("article").each((c, d) => {

        results.push({
             
       link: $(d).find("h2 > a").attr("href"),
         title: $(d).find("h2.entry-title").text()
          

         
        })
    })
if (config.MODE === 'nonbutton') {

if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title,
rowId: prefix + 'mw ' + results[i].link
});
}
const sections = [{
title: "_[Result from modwhatsapp.]_",
rows: srh
}]

    const listMessage = {
caption: `⚜️ VAJIRA MD MODWHATSAPP-DL ⚜️`,
image : { url: config.LOGO },	    
footer: config.FOOTER,
title: 'Result from Mod Whatsapp. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} if (config.MODE === 'button') {


            if (results.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < results.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  results[i].title,
              id: prefix + 'mw ' + results[i].link
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from ModWhatsapp. 📲',
                        sections
                    })
                }]
    
        let message = {
            image: config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: '⚜️ VAJIRA MD MODWHATSAPP-DL ⚜️'
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	


	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "mw",	
    react: '📑',
    desc: "modapk downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const response = await axios.get(q);  
const $ = cheerio.load(response.data);

   //const link = $("div.kb-row-layout-wrap.kb-row-layout-id561_470ee8-ae.alignnone.wp-block-kadence-rowlayout > div > div > div > div > a").attr("href")
   const title = $("h1.entry-title").text()
   const version = $("div.kb-row-layout-wrap.kb-row-layout-id561_470ee8-ae.alignnone.wp-block-kadence-rowlayout > div > div > div > div > a > span.kt-btn-inner-text").text()
   const date = $("time.entry-date.published.updated").text()

 const response1 = await axios.get(q);  
 const $1 = cheerio.load(response1.data);
 const results = [];
 $1("div.kt-inside-inner-col > div.wp-block-kadence-advancedbtn.kb-buttons-wrap").each((c, d) => {

     results.push({

 link: $1(d).find("a").attr("href"),
 title1: $1(d).find("span.kt-btn-inner-text").text()
          

         
        })
    })
const cap = `⚜️ VAJIRA MD MODWHATSAPP-DL ⚜️\n\n🚀 Title :- ${title}\n📄 Date :- ${date}`
if (config.MODE === 'nonbutton') {	
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title1,
rowId: prefix + 'mwdl ' + results[i].link
});
}
const sections = [{
title: "_[Result from modwhatsapp.]_",
rows: srh
}]

    const listMessage = {
text: cap,    
footer: config.FOOTER,
title: 'Result from Mod Whatsapp. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} if (config.MODE === 'button') {


            if (results.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < results.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  results[i].title1,
              id: prefix + 'mwdl ' + results[i].link
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from ModWhatsapp. 📲',
                        sections
                    })
                }]
    
        let message = {
            image: config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: cap
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "mwdl",	
    react: '📑',
    desc: "modapk downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const response2 = await axios.get(q);  
 const $2 = cheerio.load(response2.data);
   
 
 const results = [];
 $2("div.kt-inside-inner-col > div.wp-block-kadence-advancedbtn.kb-buttons-wrap").each((c, d) => {

     results.push({

 dllink: $2(d).find("a").attr("href"),
 dltitle: $2(d).find("span.kt-btn-inner-text").text()
          

         
        })
    })
if (config.MODE === 'nonbutton') {	
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].dltitle,
rowId: prefix + `mdapk ${results[i].dllink}|${results[i].dltitle}`
});
}
const sections = [{
title: "_[Result from modwhatsapp.]_",
rows: srh
}]

    const listMessage = {
text: `⚜️ VAJIRA MD MODWHATSAPP-DL ⚜️`,    
footer: config.FOOTER,
title: 'Result from Mod Whatsapp. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {


            if (results.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < results.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  results[i].dltitle,
              id: prefix + `mdapk ${results[i].dllink}|${results[i].dltitle}`
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from ModWhatsapp. 📲',
                        sections
                    })
                }]
    
        let message = {
            image: config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: '⚜️ VAJIRA MD MODWHATSAPP-DL ⚜️'
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "modapk",	
    react: '📑',
    category: "download",
    desc: "modapk downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://an1.com/?story=${q}&do=search&subaction=search`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const results = [];
    $("div.item").each((c, d) => {

        results.push({
             
       link: $(d).find("a").attr("href"),
         title: $(d).find("div.name > a > span").text()
          

         
        })
    })
if (config.MODE === 'nonbutton') {
	
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title,
rowId: prefix + 'ma ' + results[i].link
});
}
const sections = [{
title: "_[Result from an1.]_",
rows: srh
}]

    const listMessage = {
caption: `🔱 VAJIRA MD MODAPK-DL 🔱`,
image : { url: `https://i.ibb.co/D5760gq/xwl2e6b5.png` },	    
footer: config.FOOTER,
title: 'Result from an1. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })


} if (config.MODE === 'button') {


            if (results.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < results.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  results[i].title,
              id: prefix + `ma ${results[i].link}`
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from ModWhatsapp. 📲',
                        sections
                    })
                }]
    
        let message = {
            image : `https://i.ibb.co/D5760gq/xwl2e6b5.png`,
            header: '',
            footer: config.FOOTER,
            body: '⚜️ VAJIRA MD MODAPK-DL ⚜️'
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "mega",
    category: "download",
    react: "⬇️",
    use: '.mega < Link >',
    desc: "Download Mega file and send it.",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !isUrl(q) || !q.includes('mega.nz')) {
            return reply("Please provide a valid Mega.nz file URL.")
        }

        // Extract file link and key (if present)
        const [fileURL, fileKey] = q.split("#");

        if (!fileKey) {
            return reply("Error: Decryption key is missing in the provided URL.");
        }

        // Use File.fromURL() to create a valid file instance
        const file = File.fromURL(`${fileURL}#${fileKey}`);

        // Track progress
        file.on('progress', (bytesLoaded, bytesTotal) => {
            const percent = (bytesLoaded / bytesTotal * 100).toFixed(2);
            reply(`Downloading: ${percent}% (${(bytesLoaded / 1024 / 1024).toFixed(2)} MB of ${(bytesTotal / 1024 / 1024).toFixed(2)} MB)`);
        });

        const buffer = await file.downloadBuffer();  // Download the file as a buffer

        // Send the file as a document
        await conn.sendMessage(from, { document: buffer, mimetype: "application/octet-stream", fileName: "mega_downloaded_file" }, { quoted: mek });
        reply("File sent successfully!");

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});



cmd({
    pattern: "modgame",	
    react: '📑',
    category: "download",
    desc: "modgame downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://gamekillerapp.com/search/${q}`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const results = [];
    $("div > a.col-12.col-lg-4.col-xl-4.d-flex").each((c, d) => {

        results.push({
          
         title: $(d).find("div.flex-fill.d-flex.flex-column.justify-content-between > h3").text(),
         size: $(d).find("div.download.ellipsis-1 > span").text().trim(),
         type: $(d).find("div.tools.ellipsis-1").text().trim(),
         link: $(d).find("div.flex-fill.d-flex.flex-column.justify-content-between > h3").text().replace(/ /g,'-').replace(/:/g,'-').replace(/--/g,'-'),
         image: $(d).find("div.icon > img").attr("src")
         
 
        })
    })
if (config.MODE === 'nonbutton') {
	
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
 description: results[i].title + ' | ' + results[i].size,
 rowId: prefix + 'mag ' + results[i].link
});
}
const sections = [
	{
title: "_[Result from an1.]_",
rows: srh
}
]

    const listMessage = {
caption: `🎬 VAJIRA MD MOD GAMES-DL 🎬

   ⏳ Search A Game Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: results[0].image },	    
footer: config.FOOTER,
title: 'Result from an1. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} if (config.MODE === 'button') {


            if (results.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < results.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  results[i].title + ' | ' + results[i].size,
              id: prefix + `mag ${results[i].link}`
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from an1. 📲',
                        sections
                    })
                }]
    
        let message = {
            image : results[0].image,
            header: '',
            footer: config.FOOTER,
            body: '⚜️ VAJIRA MD MODGAME-DL ⚜️'
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "mag",
    react: '📦',
    desc: "apk downloader",
    category: "",
    use: '.apk whatsapp',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
var msg = mek
await conn.sendMessage(from, { react: { text: 'ℹ️', key: msg.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need apk link...*' }, { quoted: msg } ) 


const url = `https://gamekillerapp.com/games/${q}`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);     
const title =  $("div.d-flex.flex-column.justify-content-between.flex-fill > h1").text()
const image = $("div.icon > img").attr("src")
const link = $("a.ordinary-download.d-flex.justify-content-center.align-items-center").attr("href")
const link1 = `https://gamekillerapp.com${link}`
const date = $("div.updateTime").text()
const category = $("div:nth-child(6) > div.col-6.desc-text > a").text().trim()
const version = $("div:nth-child(3) > div.col-6.desc-text").text().trim()
const modinfo = $("div:nth-child(4) > div.col-6.desc-text > a:nth-child(3)").text().trim()
const response1 = await axios.get(link1);  
const $1 = cheerio.load(response1.data);
const dl = $1("section.normal-download > a").attr("href")


let listdata = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]
   
 *MOD GAMES-DOWNLOADER*

 *📚 Title: ${title}*
 *📈 Date: ${date}*
 *♓ Category: ${category}*
 *🧬 Vertion: ${version}*
 *🌐 Mod Info: ${modinfo}*
 
─────────────────────────────`

if (config.MODE === 'nonbutton') {


 const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `mdapk ${dl}|${title}` , description: 'Download the modgames'},
	]
    } 
]      
  const listMessage = {
caption: listdata,
image : { url: image },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {


        let sections = [{
                title: 'VAJIRA MD',
                rows: [{
                        title: '',
                        description: `Download the modgames`,
                        id: `${prefix}mdapk ${dl}|${title}`
                    },
                ]
            }
        ]

        let listMessage = {
            title: 'Click Here⎙',
            sections
        };
        conn.sendMessage(from, {
            image: { url: image },
    caption: listdata,
    footer: config.FOOTER,
                buttons: [
		{
                    buttonId: `${prefix}mdapk ${dl}|${title}`,
                    buttonText: {
                        displayText: 'Download the modapk'
                    },
                },	
                {
                    buttonId: 'action',
                    buttonText: {
                        displayText: 'ini pesan interactiveMeta'
                    },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify(listMessage),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });
	
}
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "ma",
    react: '📦',
    desc: "apk downloader",
    category: "",
    use: '.apk whatsapp',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
var msg = mek
await conn.sendMessage(from, { react: { text: 'ℹ️', key: msg.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need apk link...*' }, { quoted: msg } ) 


const response = await axios.get(q);  
const $ = cheerio.load(response.data);
   

const link = $("a.btn.btn-lg.btn-green").attr("href")
const image = $("figure.img > img").attr("src")
const title = $("h1.title.xxlgf").text()
const os = $("div.app_view-first > div > ul > li:nth-child(1) > span").text()
const version = $("div.app_view-first > div > ul > li:nth-child(2) > span").text()
const size = $("div.app_view-first > div > ul > li:nth-child(3) > span").text()
const li = 'https://an1.com/'
const response1 = await axios.get(`${li}${link}`);  
const $1 = cheerio.load(response1.data);
const link1 = $1("#pre_download").attr("href")


let listdata = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]
   
 *MOD APK-DOWNLOADER*

 *📚 ᴀᴘᴘ ɴᴀᴍᴇ: ${title}*
 *📈 ᴀᴘᴘ ꜱɪᴢᴇ: ${size}*
 *🧬 ᴀᴘᴘ ᴠᴇʀꜱɪᴏɴ: ${version}*
 *🌐 ᴀᴘᴘ ᴏꜱ: ${os}*
 
─────────────────────────────`

if (config.MODE === 'nonbutton') {
	
 const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + `mdapk ${link1}|${title}` , description: 'Download the modapk'},
	]
    } 
]      
  const listMessage = {
caption: listdata,
image : { url: image },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {


        let sections = [{
                title: 'VAJIRA MD',
                rows: [{
                        title: '',
                        description: `Download the modgames`,
                        id: `${prefix}mdapk ${link1}|${title}`
                    }
                ]
            }
        ]

        let listMessage = {
            title: 'Click Here⎙',
            sections
        };
        conn.sendMessage(from, {
            image: { url: image },
    caption: listdata,
    footer: config.FOOTER,
                buttons: [
		{
                    buttonId: `${prefix}mdapk ${link1}|${title}`,
                    buttonText: {
                        displayText: 'Download the modapk'
                    },
                },	
                {
                    buttonId: 'action',
                    buttonText: {
                        displayText: 'ini pesan interactiveMeta'
                    },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify(listMessage),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });
	
}
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: `mdapk`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {


        //const mediaUrl = q.trim();
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tc_movie_dl_system'
        


var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴀᴘᴋ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}



        const message = {
            document: await getBuffer(mediaUrl),
	    caption: "*VAJIRA MD MOD APk*",
            mimetype: "application/mod.apk",
            fileName: `${title}.apk`,
        };


	    
        await conn.sendMessage(from, message );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});








cmd({
    pattern: "xnxx",
    react: "📱",
    desc: "xxx video dowloader",
    category: "download",
    use: '.xnxx mia kalifa',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return mek.reply(`Enter Query`)
	const fg = require('api-dylux')
	let res = await fg.xnxxSearch(q)
           let ff = res.result.map(() => `මොනාද හුත්තො කුනුහරප ඉල්ලන්නෙ🤣 \n බැන්ඩ් කරගනිම් ඔව ඉල්ලල උබෙ whatsapp එක🤣\nවලත්තයා `)
	//return reply('මොනාද හුත්තො කුනුහරප ඉල්ලන්නෙ🤣 \n බැන්ඩ් කරගනිම් ඔව ඉල්ලල උබෙ whatsapp එක🤣\nවලත්තයා')
              if (res.status) mek.reply(ff)

const data = res.result

if (config.MODE === 'nonbutton') {
	
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1,
description: data[i].title,
rowId: prefix + 'xnxxdl ' + data[i].link + '+' + data[i].title
});
}
const sections = [{
title: "_[Result from androidapksfree.]_",
rows: srh
}]
const listMessage = {
text: `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *XNXX VIDEO DOWNLOADER*

*📱 Enterd Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from androidapksfree. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {


            if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < data.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  data[i].title,
              id: prefix + 'xnxxdl ' + data[i].link + '+' + data[i].title
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from xnxx. 📲',
                        sections
                    })
                }]
    
        let message = {
            image : config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: '⚜️ VAJIRA MD XNXX-DL ⚜️'
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "img",
    react: '🖼️',
    desc: "image downloader",
    category: "download",
    use: '.img car',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]
   
 ▏ *IMG-DOWNLOADER*

 ▏ *🎭 ʀᴇǫᴜᴇꜱᴛᴇʀ: ${pushname}*
 ▏ *✏️ ʀᴇꜱᴜʟᴛ: ${q}*

└──────◉`

 if (config.MODE === 'nonbutton') {	
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'imgno ' + q , description: 'Normal type images 🖼️'},
	    {title: "2", rowId: prefix + 'imgdoc ' + q , description: 'Document type images 📁'} ,
            

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


        let sections = [{
                title: 'VAJIRA MD',
                rows: [{
                        title: '',
                        description: `Normal type images 🖼️`,
                        id: `${prefix}imgno ${q}`
                    },
		    {
                        title: '',
                        description: `Document type images 📁`,
                        id: `${prefix}imgdoc ${q}`
                    }   
                ]
            }
        ]

        let listMessage = {
            title: 'Click Here⎙',
            sections
        };
        conn.sendMessage(from, {
            image: { url: config.LOGO },
    caption: dat,
    footer: config.FOOTER,
                buttons: [
		{
                    buttonId: `${prefix}imgno ${q}`,
                    buttonText: {
                        displayText: 'Normal type images 🖼️'
                    },
                },	
                {
                    buttonId: `${prefix}imgdoc ${q}`,
                    buttonText: {
                        displayText: 'Document type images 📁'
                    },
                },	

                {
                    buttonId: 'action',
                    buttonText: {
                        displayText: 'ini pesan interactiveMeta'
                    },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify(listMessage),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });
	
}

	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


	
cmd({
    pattern: "imgno",
    react: '👾',
    desc: 'to down images',
    category: "",
    use: '.im',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
    if (!q) throw `Example: ${prefix + command} Bike`

    let gis = require('g-i-s')
    gis(q, async (error, result) => {
        if (error) {
            console.error('Error fetching images:', error);
		
            return reply('Error fetching images. Please try again later.')
        }

        const topImages = result.slice(0, 5); // Extract top 5 images

        for (let i = 0; i < topImages.length; i++) {
            const imageUrl = topImages[i].url
          let Message = {
              image: { url: imageUrl },caption: `*-------「 VAJIRA MD GIMAGE SEARCH 」-------*\n🤠 *Query* : ${q}\n\n🔗 *Image ${i + 1} Url* : ${imageUrl}`,
           }

//let senda = await conn.sendMessage(from, { document: {url: imageUrl },fileName: 'image' + '.jpg', mimetype: 'image/jpeg' ,caption: `*-------「 VAJIRA MD GIMAGE SEARCH 」-------*\n🤠 *Query* : ${q}\n\n🔗 *Image ${i + 1} Url* : ${imageUrl}`,}, { quoted: mek })  
		
            conn.sendMessage(from, Message, { quoted: mek })
        }
    })
} catch (e) {
l(e)
}
})




cmd({
    pattern: "imgdoc",
    react: '👾',
    desc: 'to down images',
    category: "",
    use: '.im',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
    if (!q) throw `Example: ${prefix + command} Bike`

    let gis = require('g-i-s')
    gis(q, async (error, result) => {
        if (error) {
            console.error('Error fetching images:', error);
		
            return reply('Error fetching images. Please try again later.')
        }

        const topImages = result.slice(0, 5); // Extract top 5 images

        for (let i = 0; i < topImages.length; i++) {
            const imageUrl = topImages[i].url
          let Message = {
              document: { url: imageUrl },fileName: 'image' + '.jpg', mimetype: 'image/jpeg' ,caption: `*-------「 VAJIRA MD GIMAGE SEARCH 」-------*\n🤠 *Query* : ${q}\n\n🔗 *Image ${i + 1} Url* : ${imageUrl}`,
           }

//let senda = await conn.sendMessage(from, { document: {url: imageUrl },fileName: 'image' + '.jpg', mimetype: 'image/jpeg' ,caption: `*-------「 VAJIRA MD GIMAGE SEARCH 」-------*\n🤠 *Query* : ${q}\n\n🔗 *Image ${i + 1} Url* : ${imageUrl}`,}, { quoted: mek })  
		
            conn.sendMessage(from, Message, { quoted: mek })
        }
    })
} catch (e) {
l(e)
}
})




cmd({
    pattern: "psong",
    react: '👾',
    desc: 'to down songs',
    category: "download",
    use: '.song2',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) {
    return reply('Enter YouTube Video Link or Search Query!');
  }


  
    const results = await yts(q);

    if (results.videos.length > 0) {
      let pollOptions = [];

      const uniqueKey = `yts_${optionIndex}`;
      const urlObject = {};

      for (let i = 0; i < Math.min(5, results.videos.length); i++) {
        const result = results.videos[i];
        const videoUrl = result.url;
        const title = result.title;

        urlObject[`${optionIndex}.${i + 1}`] = videoUrl;
        pollOptions.push(`.tet ${optionIndex}.${i + 1} ${title}`);
		    }

      if (!videoSearchResults.has(uniqueKey)) {
        videoSearchResults.set(uniqueKey, {});
      }

      videoSearchResults.set(uniqueKey, Object.assign(videoSearchResults.get(uniqueKey), urlObject));

      await conn.sendPoll(from, 'Choose a video to download:', [...pollOptions]);


      optionIndex += 1;
    } else {
      return reply('No search results found.');
    }

} catch (e) {
console.error('Error during play:', e);
    mek.reply('Unexpected error occurred.');	
l(e)
}
})      

cmd({
    pattern: "tet",
    react: '👾',
    desc: 'to take song',
    category: "download",
    use: '.tet',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) {
    return reply('Please specify the video you want to play. Use the format: play [unique-key]');
    
  }

  const match = q.match(/(\d+)\.(\d+)/);

  if (!match) {
    return reply('Invalid format. Please provide a valid unique key (e.g., 1.1)');
  
  }

  const optionIndex = parseInt(match[1]);
  const subOption = parseInt(match[2]);

  const uniqueKey = `yts_${optionIndex}`;

  if (videoSearchResults.has(uniqueKey)) {
    const selectedUrl = videoSearchResults.get(uniqueKey)[`${optionIndex}.${subOption}`];

    if (selectedUrl) {
      
        const videoInfo = await ytdl.getInfo(selectedUrl);

        const title = videoInfo.title || (videoInfo.videoDetails && videoInfo.videoDetails.title) || 'N/A';
const uploadDate = formatUploadDate(videoInfo.videoDetails.uploadDate) || 'N/A'; 
        // Construct caption with audio details
        const pollMessage = `
╭═════════•∞•══╮
│⿻ *VAJIRA MD*
│  *Youtube Mp4 Player* ✨
│⿻ *Title:* ${title}
│⿻ *Author:* ${videoInfo.videoDetails.author.name || 'N/A'}
│⿻ *Duration:* ${videoInfo.videoDetails.lengthSeconds}s
│⿻ *Views:* ${videoInfo.videoDetails.viewCount.toLocaleString() || 'N/A'}
│⿻ *Upload Date:* ${uploadDate}
╰══•∞•═════════╯
`;

        await conn.sendPoll(from, pollMessage, [
          `.𝐀𝐮𝐝𝐢𝐨 ${optionIndex}.${subOption}`,
          `.𝐕𝐢𝐝𝐞𝐨 ${optionIndex}.${subOption}`,
          `.𝐀𝐮𝐝𝐢𝐨𝐝𝐨𝐜𝐮𝐦𝐞𝐧𝐭 ${optionIndex}.${subOption}`,
          `.𝐕𝐢𝐝𝐞𝐨𝐝𝐨𝐜𝐮𝐦𝐞𝐧𝐭 ${optionIndex}.${subOption}`
        ]);
        
      
      } else {
      return reply('Invalid sub-option. Please choose a valid sub-option.');
    }
  } else {
    return reply('Invalid unique key. Please provide a valid unique key.');
  }
      } catch (e) {
        console.error('Error during poll creation:', e);
        return reply('Unexpected error occurred during poll creation.')
l(e)
}
})      


	
cmd({
    pattern: "xnxxdl",
    react: '👾',
    desc: 'to take xnxx video',
    category: "download",
    use: '.xnxxdl',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
        if (!q.includes('xnxx.com')) return mek.reply(`Enter an xnxx link`)
        const fg = require('api-dylux')
            let xn = await fg.xnxxdl(q)
conn.sendMessage(mek.chat, { caption: `  *XNXX DL*
        
✍ *Title:* ${xn.title}
⌛ *Duration:* ${xn.duration}
📽 *Visual Quality:* ${xn.quality}`, video: {url: xn.url_dl} }, { quoted: mek })
} catch (e) {
l(e)
}
})   


	
cmd({
    pattern: "tempmail",
    react: '👾',
    desc: 'to take a tempmail',
    category: "download",
    use: '.tempmail',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const link = "https://dropmail.me/api/graphql/web-test-wgq6m5i?query=mutation%20%7BintroduceSession%20%7Bid%2C%20expiresAt%2C%20addresses%20%7Baddress%7D%7D%7D"


        let response = await fetch(link);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        let email = data["data"]["introduceSession"]["addresses"][0]["address"];
        let id_ = data["data"]["introduceSession"]["id"];
        let time = data["data"]["introduceSession"]["expiresAt"];
//reply(email)
let info = `𝘌𝘔𝘈𝘐𝘓 = ${email}
𝘐𝘋 = ${id_}
𝘛𝘐𝘔𝘌 = ${time}`	


let msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: `${info}` },
              carouselMessage: {
                cards: [
                  {
                    
                    header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: config.LOGO } }, { upload: conn.waUploadToServer })),
          title: ``,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: ``},
                    nativeFlowMessage: {
                      buttons: [
                        {
                 "name": "cta_copy",
                 "buttonParamsJson": `{\"display_text\":\"𝘊𝘖𝘗𝘠 𝘛𝘌𝘔𝘗𝘔𝘈𝘐𝘓\",\"id\":\"123456789\",\"copy_code\":\"${email}\"}`
              },
                      ],
                    },
                  },
                  {                   

header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: config.LOGO } }, { upload: conn.waUploadToServer })),
          title: ``,
          gifPlayback: true,
          subtitle: "VAJIRA-MD",
          hasMediaAttachment: false
        }),
                    body: { text: ``},
                    nativeFlowMessage: {
                      buttons: [
                        {
                 "name": "cta_copy",
                 "buttonParamsJson": `{\"display_text\":\"𝘊𝘖𝘗𝘠 𝘐𝘋\",\"id\":\"123456789\",\"copy_code\":\"${id_}\"}`
              },
                      ],
                    },
                  },                                    
                ],
                            messageVersion: 1,
                        },
                         contextInfo: {
                         mentionedJid: [m.sender],
                         forwardingScore: 999,
                         isForwarded: true,
                         forwardedNewsletterMessageInfo: {
                         newsletterJid: '120363290448968237@newsletter',
                         newsletterName: `⛅ 𝘝𝘈𝘑𝘐𝘙𝘈 𝑴𝑫 💙`,
                         serverMessageId: 143
                            }
                        }
                    }
                }
            },
        },
        { quoted: m })
        
            await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
    });


} catch (e) {
reply()
l(e)
}
})   




cmd({
    pattern: "checkmail",
    react: '👾',
    desc: 'to see mail',
    category: "download",
    use: '.checkmail',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
        if (!q) {
            
            return reply(`*Provide me tempmail for view inbox*`);
        }

        const link = `https://dropmail.me/api/graphql/web-test-wgq6m5i?query=query%20(%24id%3A%20ID!)%20%7Bsession(id%3A%24id)%20%7B%20addresses%20%7Baddress%7D%2C%20mails%7BrawSize%2C%20fromAddr%2C%20toAddr%2C%20downloadUrl%2C%20text%2C%20headerSubject%7D%7D%20%7D&variables=%7B%22id%22%3A%22${q}%22%7D`;
        let response = await fetch(link);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        let inbox = data["data"]["session"]["mails"];

        // return the size of the inbox to verify the amount of mail and whether the mail has arrived
        return [inbox, inbox.length];
       
        } catch (e) {
            console.error('Error during API request:', e)
            
            reply()      
l(e)
}
})   

		    

cmd({
    pattern: "gitclone",
    react: "🔖",
    desc: "download github repos",
    category: "download",
    use: '.gitclone',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
                                                                   
                                  
  let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
                              if (!args[0]) reply(`Use ${prefix}gitclone repo link\n: https://github.com/VajiraTech/QUEEN-IZUMI-MD`)
                              if (!regex1.test(args[0])) return reply('link')
                              let [, user, repo] = args[0].match(regex1) || []
                              repo = repo.replace(/.git$/, '')
                              let url = `https://api.github.com/repos/${user}/${repo}/zipball`
                              let filename =  `${user}${repo}`
                              //(await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
                              conn.sendMessage(mek.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip',caption: '*ǫᴜᴇᴇɴ-ɪᴢᴜᴍɪ•ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*' }, { quoted: mek }).catch((err) => reply(mess.error))                             
} catch (e) {
reply()
l(e)
}
})
	

//============================Ehi command===============================


cmd({
    pattern: "ehi",
    react: '🖼️',
    desc: "ehi files downloader",
    category: "download",
    use: '.ehi',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dat = `╔══════❨ ❄ ❩══════╗

            *🎗️ ᴠᴀᴊɪʀᴀ ᴍᴅ ᴠ3 ᴇʜɪ 🎗️*
    
 ▫ ғʀᴇᴇ ᴇʜɪ
 ▫ ᴍᴀᴋᴇ ᴅᴀᴛᴇ
 ▫ ᴇxᴘɪʀᴇ ᴅᴀᴛᴇ 
     
 _✕ ɴᴏ ʜᴀᴄᴋɪɴɢ_
 _✕ ɴᴏ sᴘᴀᴍ_ 
 _✕ ɴᴏ ᴅᴅᴏs_
 _✕ ᴅᴏɴ\'ᴛ ᴜsᴇ ᴜɴɴᴇᴄᴇssᴀʀʏ ᴡᴏʀᴋ_
 
    *ᴇɴᴊᴏʏ ʏᴏᴜʀ ᴇʜɪ ғɪʟᴇs 💞.*

╚══════[💀]`
if (config.MODE === 'nonbutton') {
	

   const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'httpinjector ' + q , description: 'apk of http injector'},
	    {title: "2", rowId: prefix + 'ehifiles ' + q , description: 'Down ehi files'} ,
            {title: "3", rowId: prefix + 'aboutehi ' + q , description: 'Info of ehi files'} 

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


        let sections = [{
                title: 'VAJIRA MD',
                rows: [{
                        title: '',
                        description: `apk of http injector`,
                        id: `${prefix}httpinjector ` + q
                    },
		    {
                        title: '',
                        description: `Down ehi files`,
                        id: `${prefix}ehifiles ` + q
                    },  
                    {
                        title: '',
                        description: `Info of ehi files`,
                        id: `${prefix}aboutehi ` + q
                    },
                ]
            }
        ]

        let listMessage = {
            title: 'Click Here⎙',
            sections
        };
        conn.sendMessage(from, {
            image: { url: config.LOGO },
    caption: dat,
    footer: config.FOOTER,
                buttons: [
			{
                    buttonId: `${prefix}httpinjector  ${q}`,
                    buttonText: {
                        displayText: 'apk of http injector'
                    },
                },
		{
                    buttonId: `${prefix}ehifiles ${q}`,
                    buttonText: {
                        displayText: 'Down ehi files'
                    },
                },	
		{
                    buttonId: `${prefix}aboutehi ${q}`,
                    buttonText: {
                        displayText: 'Info of ehi files'
                    },
                },		
                {
                    buttonId: 'action',
                    buttonText: {
                        displayText: 'ini pesan interactiveMeta'
                    },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify(listMessage),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });
	
}
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})





cmd({
    pattern: "aboutehi",
    category: "",
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                    
   let dat =  `💬 Ehi file යනු* ,
ඔබට whatsapp package බාවිතාකර free internet ලබාගත හැකි ක්‍රමයකි.

උදාහරණයක් ලෙස , ඔබට whatsapp package එක බාවිතාකරමින් tiktok , fb , youtube , google යාම වැනිදේ සිදුකර හැකිවීම.
මෙම ehi file උපරිම අන්තර්ජාල වේගයක් ලබා නොදෙයි. නමුත් ඔබට යම් වේගයකින් අන්තර්ජාල පහසුකම් ලබාගත හැක.
ඔබට මෙම ehi file සාමාන්‍යයෙන් අප බාවිතාකරන 
whatsapp , facebook , youtube , zoom යන ආදී package වලට ගැලපෙන ආකාරයේ file බාවිතාකර හැක 


බාවිතාකරන්නේ කෙසේද ?
1. http injector app එක ඔබගේ phone එකට install කරගන්න 
2. ඔබගේ package එකට අදාල ehi file එක තෝරාගන්න 
3. එම file එක httpinjector app එකට ඇතුලත් කර start බටන් එක ඔබන්න 
( ඔබට මෙම file බාවිතාකිරීමටනම් ඉහත කිසියම් හෝ package 1ක් දමාගෙන තිබිය යුතුය )

*© ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*

============================================================================

*💬 Ehi file is*,
 It is a method where you can get free internet by using whatsapp package.
 For example, you can use whatsapp package to go to tiktok, fb, youtube, google etc.

 This ehi file does not provide maximum internet speed.  But you can get internet facility at some speed.
 You can find this ehi file which we usually use
 You can use the type of file suitable for packages like whatsapp, facebook, youtube, zoom etc

*How to use*
 1. Install the http injector app on your phone.
 2. Select the ehi file related to your package.
 3. Enter that file into the httpinjector app and press the start button.
_( If you want to use this file, you must have one of the above packages installed )_


*© ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`
                  
                  const buttons = []
  const buttonMessage = {
      caption: dat,
      footer: `*ᴠᴀᴊɪʀᴀ-ᴍᴅ•ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*`,
      buttons: buttons,
      headerType: 1
  }
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
l(e)
}
})




  cmd({
  pattern: "httpinjector",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
await conn.sendMessage(from, { document: { url: 'https://github.com/VajiraTech/Izumi-ehi/blob/main/Http_injector/HTTP%20Injector%20(SSHProxyV2Ray)%20VPN.apk' },mimetype: 'application/vnd.android.package-archive', fileName: `HTTP Injector Qᴜᴇᴇɴ-ɪᴢᴜᴍɪ (SSHProxyV2Ray) VPN.apk`,  caption: config.FOOTER}, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})


cmd({
  pattern: "ehifiles",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 const ehiVajira = await fetchJson ('https://gist.github.com/VajiraTech/e13022d2d3eacaac87967d8ee67ddf25/raw')
  ehi = ehiVajira.EHI_FILES[0].SG_FILE1
  ehi2 = ehiVajira.EHI_FILES[0].SG_FILE2
  ehi3 = ehiVajira.EHI_FILES[0].SG_FILE3
  ehi4 = ehiVajira.EHI_FILES[0].SG_FILE4
  ehi5 = ehiVajira.EHI_FILES[1].US_FILE1
  ehi6 = ehiVajira.EHI_FILES[1].US_FILE2
  ehi7 = ehiVajira.EHI_FILES[1].US_FILE3
  ehi8 = ehiVajira.EHI_FILES[1].US_FILE4
                 
                await conn.sendMessage(mek.chat, { text : `
${ehiVajira.EHI}
${ehiVajira.C_E_DATES}
${ehiVajira.XX_XX}
` } ,{ quoted: mek })
                await conn.sendMessage(mek.chat, { document: { url: ehi }, mimetype: 'application/octet-stream', fileName: `${ehiVajira.EHI_IMOJI} FaceBook ${ehiVajira.EHI_IMOJI}.ehi`}, { quoted: mek })
                await conn.sendMessage(mek.chat, { document: { url: ehi2 }, mimetype: 'application/octet-stream', fileName: `${ehiVajira.EHI_IMOJI} Whatsapp ${ehiVajira.EHI_IMOJI}.ehi `}, { quoted: mek })
                await conn.sendMessage(mek.chat, { document: { url: ehi3 }, mimetype: 'application/octet-stream', fileName: `${ehiVajira.EHI_IMOJI} Youtube ${ehiVajira.EHI_IMOJI}.ehi`}, { quoted: mek })
                await conn.sendMessage(mek.chat, { document: { url: ehi4 }, mimetype: 'application/octet-stream', fileName: `${ehiVajira.EHI_IMOJI} Zoom ${ehiVajira.EHI_IMOJI}.ehi`}, { quoted: mek })
                await conn.sendMessage(mek.chat, { document: { url: ehi5 }, mimetype: 'application/octet-stream', fileName: `${ehiVajira.EHI_IMOJI2} FaceBook ${ehiVajira.EHI_IMOJI2}.ehi`}, { quoted: mek })
                await conn.sendMessage(mek.chat, { document: { url: ehi6 }, mimetype: 'application/octet-stream', fileName: `${ehiVajira.EHI_IMOJI2} Whatsapp ${ehiVajira.EHI_IMOJI2}.ehi `}, { quoted: mek })
                await conn.sendMessage(mek.chat, { document: { url: ehi7 }, mimetype: 'application/octet-stream', fileName: `${ehiVajira.EHI_IMOJI2} Youtube ${ehiVajira.EHI_IMOJI2}.ehi`}, { quoted: mek })
                await conn.sendMessage(mek.chat, { document: { url: ehi8 }, mimetype: 'application/octet-stream', fileName: `${ehiVajira.EHI_IMOJI2} Zoom ${ehiVajira.EHI_IMOJI2}.ehi`}, { quoted: mek })
                
                await conn.sendMessage(mek.chat, `✅ _Success send_ *${mek.pushName}* _Ehi Files..._`,mek)
} catch (e) {
  reply('*📥 𝙐𝙋𝙇𝙊𝘼𝘿𝙀𝘿 𝘽𝙔 𝙑𝘼𝙅𝙄𝙍𝘼 𝙈𝘿 𝙊𝙒𝙉𝙀𝙍*')
l(e)
}
})
//=================================APK COMMANDS=====================================


cmd({
    pattern: "fmmods",
    alias: ["wamod","wamods","fmmod"],
    react: '📲',
    desc: "Download all fmmods.",
    category: "download",
    use: '.fmmods',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted,prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  let response = (await fetchJson('https://api.maher-zubair.tech/whatsapp/wamods')).data
  const sections = [
      {
	title: "",
	rows: [
    {title: "1", rowId: prefix + 'dmod ' + response.com_whatsapp.link + '+' + response.com_whatsapp.name, description: response.com_whatsapp.name },
    {title: "2", rowId: prefix + 'dmod ' + response.com_fmwhatsapp.link + '+' + response.com_fmwhatsapp.name, description: response.com_fmwhatsapp.name },
    {title: "3", rowId: prefix + 'dmod ' + response.com_gbwhatsapp.link + '+' + response.com_gbwhatsapp.name, description: response.com_gbwhatsapp.name }, 
    {title: "4", rowId: prefix + 'dmod ' + response.com_yowhatsapp.link + '+' + response.com_yowhatsapp.name, description: response.com_yowhatsapp.name },
  ]
    } 
]

  const listMessage = {
caption : `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]
      
*Foud Whatsapp Mod Downloader 📲*
`,
image : { url: config.LOGO },	
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
  pattern: "dmod",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
let [modlink, modname] = q.split `+`;
await conn.sendMessage(from, { document: { url: modlink }, fileName:  modname + '.apk' , mimetype: 'application/vnd.android.package-archive'}, {quoted: mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})




cmd({
    pattern: "apk",
    react: '📦',
    desc: "apk downloader",
    category: "download",
    use: '.apk whatsapp',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
var msg = mek
await conn.sendMessage(from, { react: { text: 'ℹ️', key: msg.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need apk link...*' }, { quoted: msg } ) 
const data = await apkdl.download(q)
let listdata = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ - Ｖ3 👨‍💻]
   
 *APK-DOWNLOADER*

 *📚 ᴀᴘᴘ ɴᴀᴍᴇ: ${data.name}*
 *📈 ᴀᴘᴘ ꜱɪᴢᴇ: ${data.size}*
 
─────────────────────────────`


if (config.MODE === 'nonbutton') {	
 const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'dapk ' + q , description: 'Download the apk'},
	    {title: "2", rowId: prefix + 'apk1 ' + q , description: 'Download many apk'} ,
	    {title: "3", rowId: prefix + 'apkinfo ' + q , description: 'Info of apk'}, 

	]
    } 
]      
  const listMessage = {
caption: listdata,
image : { url: config.LOGO },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} if (config.MODE === 'button') {


        let sections = [{
                title: 'VAJIRA MD',
                rows: [{
                        title: '',
                        description: `Download the apk`,
                        id: `${prefix}dapk ` + q
                    },
		    {
                        title: '',
                        description: `Download many apk`,
                        id: `${prefix}apk1 ` + q
                    },  
                    {
                        title: '',
                        description: `Info of apk`,
                        id: `${prefix}apkinfo ` + q
                    },
                ]
            }
        ]

        let listMessage = {
            title: 'Click Here⎙',
            sections
        };
        conn.sendMessage(from, {
            image: { url: config.LOGO },
    caption: listdata,
    footer: config.FOOTER,
                buttons: [
			{
                    buttonId: `${prefix}dapk  ${q}`,
                    buttonText: {
                        displayText: 'Apk download'
                    },
                },
		{
                    buttonId: `${prefix}apk1 ${q}`,
                    buttonText: {
                        displayText: 'More Apk'
                    },
                },	
		{
                    buttonId: `${prefix}apkinfo ${q}`,
                    buttonText: {
                        displayText: 'Apk Info'
                    },
                },		
                {
                    buttonId: 'action',
                    buttonText: {
                        displayText: 'ini pesan interactiveMeta'
                    },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify(listMessage),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });
	
}

	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "apk1",
    react: "📱",
    alias: ["findapk","playstore"],
    desc: urlneed4,
    category: "download",
    use: '.apk whatsapp',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await conn.sendMessage(from , { text: imgmsg }, { quoted: mek } )        
const data2 = await apkdl.search(q)
const data = data2
if (config.MODE === 'nonbutton') {
	
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
srh.push({
description: data[i].name,
title: i + 1,
rowId: prefix + 'dapk ' + data[i].id
});
}
const sections = [{
title: "_[Result from playstore.]_",
rows: srh
}]
const listMessage = {
text: `┌───[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *APK DOWNLOADER*

*📱 Apk Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from playstore. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
await conn.replyList(from, listMessage,{quoted: mek})


} if (config.MODE === 'button') {


            if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < data.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  data[i].name,
              id: prefix + 'dapk ' + data[i].id
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from xnxx. 📲',
                        sections
                    })
                }]
    
        let message = {
            image : config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: `┌───[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *APK DOWNLOADER*

*📱 Apk Name:* ${q}`
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	


} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "dapk",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need apk link...*' }, { quoted: mek } ) 
const data = await apkdl.download(q)
let sendapk = await conn.sendMessage(from , { document : { url : data.dllink  } , mimetype : 'application/vnd.android.package-archive' , fileName : data.name + '.' + 'apk',caption: '*ᴠᴀᴊɪʀᴀ-ᴍᴅ•ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*' } , { quoted: mek })
await conn.sendMessage(from, { react: { text: '📁', key: sendapk.key }})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "apkinfo",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    var msg = mek
await conn.sendMessage(from, { react: { text: 'ℹ️', key: msg.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need apk link...*' }, { quoted: msg } ) 
const data = await apkdl.download(q)
let listdata = `╔═══════════════════╗
*║🤳VAJIRA PLAYSTORE-SEARCH*
╚═══════════════════╝

*📚 ᴀᴘᴘ ɴᴀᴍᴇ: ${data.name}* 

*📈 ᴀᴘᴘ ꜱɪᴢᴇ(ᴍʙ): ${data.size}*

*📱 ʟᴀꜱᴛ ᴜᴘᴅᴀᴛᴇᴅ: ${data.lastup}*

*📦 ᴅᴇᴠᴇʟᴏᴘᴇʀ: ${data.package}* 

_*◯──────────────────────────────────◯*_`
await conn.sendMessage(from, { image: { url: data.icon }, caption: listdata }, { quoted: msg })
await conn.sendMessage(from, { react: { text: '✔', key: msg.key }})
} catch (e) {
  l(e)
}
})


//============================================================================
cmd({
    pattern: "ss",
    react: '🖼️',
    desc: "url to screenshot",
    category: "download",
    use: '.ss url',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]
   
 ▏ *SS CONVETER*

└──────◉`
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'desktop ' + q , description: 'Desktop type ss'},
	    {title: "2", rowId: prefix + 'ssphone ' + q , description: 'Phone type ss 🖼️'} ,
	    {title: "3", rowId: prefix + 'sstab ' + q , description: 'Tab type ss 🖼️'} ,
            

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
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

	


cmd({
    pattern: "desktop",
    react: "📸",
    alias: ["screenshot","ssweb","ssdesktop"],
    desc: descg,
    category: "download",
    use: '.ss <url>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(imgmsg)
let name = getRandom('')
let data = await sswebA(q,true,'desktop')
fs.writeFileSync(name + '.jpg', data);
let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *📸 SCREENSHOT GETTER*`
const sections = [
    {
	title: "",
	rows: [
{title: "1", rowId: prefix + 'ssd ' + name + '.jpg', description: 'DOCUMENT'}, 
{title: "2", rowId: prefix + 'ssi ' + name + '.jpg', description: 'IMAGE'}, 
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
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

	
cmd({
    pattern: "ssphone",
    react: "📸",
    desc: descp,
    category: "download",
    use: '.ss <url>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(imgmsg)
let name = getRandom('')
let data = await sswebA(q,true,'phone')
fs.writeFileSync(name + '.jpg', data);
let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *📸 SCREENSHOT GETTER*`
const sections = [
    {
	title: "",
	rows: [
 {title: "1", rowId: prefix + 'ssd ' + name + '.jpg', description: 'DOCUMENT'},
 {title: "2", rowId: prefix + 'ssi ' + name + '.jpg', description: 'IMAGE'} ,
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
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

cmd({
    pattern: "sstab",
    react: "📸",
    desc: desct,
    category: "download",
    use: '.ss <url>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(imgmsg)
let name = getRandom('')
let data = await sswebA(q,true,'tablet')
fs.writeFileSync(name + '.jpg', data);
let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *📸 SCREENSHOT GETTER*`
const sections = [
    {
	title: "",
	rows: [
 {title: "1", rowId: prefix + 'ssd ' + name + '.jpg', description: 'DOCUMENT'},
 {title: "2", rowId: prefix + 'ssi ' + name + '.jpg', description: 'IMAGE'} ,
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
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})

	    
cmd({
  pattern: "ssi",
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
  pattern: "ssd",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
await conn.sendMessage(from, { document: fs.readFileSync(q), mimetype: 'image/jpeg', fileName: 'screenshot' + '.jpg',caption: config.FOOTER  }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})



cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    desc: "download mfire files",
    category: "download",
    react: "📩",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("give me mediafire url")
        //fetch data from api  

const response = await require("undici").fetch(q);
            const data = await response.text();
            const $ = cheerio.load(data);
            
            let name = $('.dl-info > div > div.filename').text();
            let dl_link = $('#downloadButton').attr('href');
            let det = $('ul.details').html().replace(/\s/g, "").replace(/<\/li><li>/g, '\n').replace(/<\/?li>|<\/?span>/g, '');
            let type = $('.dl-info > div > div.filetype').text();
            let size = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(1) > span').text()
            let date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()

            var fileType = ''

            if(name.includes(".zip")) { fileType = "application/zip"
            } else if (name.includes(".pdf")) { fileType = "application/pdf" 
            } else if (name.includes(".mp4")) { fileType = "video/mp4" 
            } else if (name.includes(".mkv")) { fileType = "video/mkv"
            } else if (name.includes(".mp3")) { fileType = "audio/mpeg"
            } else if (name.includes(".7z")) { fileType = "application/x-7z-compressed"
            } else if (name.includes("jpg" || "jpeg")) { fileType = "image/jpeg"
            } else if (name.includes(".png")) { fileType = "image/png"
            } else if (name.includes(".rar")) { fileType = "application/x-rar-compressed"
            } else { fileType = "application/octet-stream" }




        reply("*VAJIRA-MD MEDIAFIRE FILE DOWNLOADING...📥*")
        await conn.sendMessage(from, { document: { url: dl_link }, fileName: name, mimetype: fileType, caption: `${name}\n\n${type}\n\n${size}\n\n${date}` }, { quoted: mek })                                                                                                                 
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})



cmd({
    pattern: "ig",
    alias: ["igstory"],
    react: '🎀',
    desc: "Download instagram videos/photos.",
    category: "download",
    use: '.ig <Instagram link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 if (!q) return await  reply(needus)
  let response = await fetchJson('https://api.maher-zubair.tech/download/instagram2?url='+q)
  for (let i=0;i<response.data.data.length;i++) {
    if(response.data.data[i].type === 'image') await conn.sendMessage(from, { image: { url: response.data.data[i].url }, caption: config.FOOTER}, { quoted: mek })
  else await conn.sendMessage(from, { video: { url: response.data.data[i].url }, caption: config.FOOTER}, { quoted: mek })
  }
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "threads",
    alias: ["thread"],
    react: '🧵',
    desc: "Download threads videos/photos.",
    category: "download",
    use: '.threads <threads link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 if (!q) return await reply(needus)
  let response = await Download(q)
  for (let i=0;i<response.download.length;i++) {
    if(response.download[i].type === 'image') await conn.sendMessage(from, { image: { url: response.download[i].url }, caption: config.FOOTER}, { quoted: mek })
  else await conn.sendMessage(from, { video: { url: response.download[i].url }, caption: config.FOOTER}, { quoted: mek })
  }
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "pindl",
    react: "🔖",
    desc: "download pinterest images",
    category: "download",
    use: '.pindl',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
                                                                   
                                  
                                  let { pinterest } = require('../lib/scraper')
                                  anu = await pinterest(q)
                                  result = anu[Math.floor(Math.random() * anu.length)]
                                  conn.sendMessage(mek.chat, { image: { url: result }, caption: '🔮 Media Url : '+result }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})






cmd({
    pattern: "gdrive",
    alias: ["googledrive'"],
    react: '📑',
    desc: "Download googledrive files.",
    category: "download",
    use: '.gdrive <googledrive link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) return await  reply('*Please give me googledrive url !!*')   
let res = await GDriveDl(q)
		let txt = `*[ Downloading file ]*\n\n`
		txt += `*Name :* ${res.fileName}\n`
		txt += `*Size :* ${res.fileSize}\n`
		txt += `*Type :* ${res.mimetype}`	
        await reply(txt)
conn.sendMessage(from, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: mek })
} catch (e) {
reply('*Error !!*')
console.log(e)
//reply(${e})
}
})



//===============================TIKTOK COMMAND===============================

                                         
cmd({
    pattern: "tiktok",
    alias: ["ttdl","tt"],
    react: '🏷️',
    desc: desc,
    category: "download",
    use: '.tiktok <Tiktok link>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!regtik(q)) return await  reply(urlneed)

const data = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/tiktokdl?url=${q}`)

let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

*TIKTOK DOWNLOADER*

*📃 Title:* ${data.result.title}
*✍🏼 Link:* ${q}`

if (config.MODE === 'nonbutton') {

	
const sections = [
    {
	title: "Without Watermark",
	rows: [	
        {title: "    1.1", rowId: `${prefix}ttw ${q}`,description: 'Withoit-Watermark'},
        {title: "    1.2", rowId: `${prefix}ttwd ${q}`,description: 'Without-Watermark Doc'},
	]
    },
	{
	title: "With Watermark",
	rows: [	
        {title: "    2.1", rowId: `${prefix}tnd ${q}`,description: 'With-Watermark'} ,
        {title: "    2.2", rowId: `${prefix}tndd ${q}`,description: 'With-Watermark Doc'},      
	]
    },
	{	
	title: "VOICE CUT TYPE 🎶",
	rows: [	
	{title: "    3.1", rowId: `${prefix}ta ${q}`,description: 'AUDIO DOWNLOAD'} ,
	{title: "    2.2", rowId: `${prefix}td ${q}`,description: 'DOCUMENT DOWNLOAD'} ,	
  ]
    } 
]
	
const listMessage = {
image: { url: data.result.thumbnail },	
caption: dat,
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {

let sections = [{
        title: 'Without Watermark',
        rows: [{
                header: "",
                title: "",
                description: "With-Watermark",
                id: `${prefix}ttw ${q}`
            },
            {
                header: "",
                title: "",
                description: "With-Watermark Doc",
                id: `${prefix}ttwd ${q}`
            }
        ]
    },
    {
        title: 'With Watermark',
        rows: [{
                header: "",
                title: "",
                description: "Without-Watermark",
                id: `${prefix}tnd ${q}`
            },
            {
                header: "",
                title: "",
                description: "Without-Watermark Doc",
                id: `${prefix}tndd ${q}`
            }
        ]
    },
    {
        title: 'VOICE CUT TYPE 🎶',
        rows: [{
                header: "",
                title: "",
                description: "AUDIO DOWNLOAD",
                id: `${prefix}ta ${q}`
            },
            {
                header: "",
                title: "",
                description: "DOCUMENT DOWNLOAD",
                id: `${prefix}td ${q}`
            }
        ]
    }
]

let listMessage = {
            title: 'Click Here⎙',
            sections
        };
        conn.sendMessage(from, {
            image: { url: config.LOGO },
    caption: dat,
    footer: config.FOOTER,
                buttons: [
		{
                    buttonId: `${prefix}ttw ${q}`,
                    buttonText: {
                        displayText: ' 🪫 `SD` QUALITY VIDEO'
                    },
                },	
                {
                    buttonId: `${prefix}tnd ${q}`,
                    buttonText: {
                        displayText: ' 🔋 `HD` QUALITY VIDEO'
                    },
                },	
		{
                    buttonId: `${prefix}ta ${q}`,
                    buttonText: {
                        displayText: ' 🎶 Audio file'
                    },
                },		

                {
                    buttonId: 'action',
                    buttonText: {
                        displayText: 'ini pesan interactiveMeta'
                    },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify(listMessage),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });

}
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})





cmd({
    pattern: "ttw",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const data = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/tiktokdl?url=${q}`)

    

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { video: { url: data.result.nowm }, mimetype: "video/mp4", caption: `> *POWERED by VAJIRA-MD*` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})



cmd({
    pattern: "ttwd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const data = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/tiktokdl?url=${q}`)


    

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { document: { url: data.result.nowm }, mimetype: "video/mp4", fileName: `${data.result.title}.mp4`, caption: "💻 *VAJIRA MD TTDL*" }, { quoted: mek }); 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "tnd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 
const data = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/tiktokdl?url=${q}`)

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { video: { url: data.result.watermark}, mimetype: "video/mp4", caption: `> *POWERED by VAJIRA-MD*` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})



cmd({
    pattern: "tndd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 
const data = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/tiktokdl?url=${q}`)


await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { document: { url: data.result.watermark }, mimetype: "video/mp4", fileName: `${data.result.title}.mp4`, caption: "💻 *VAJIRA MD TTDL*" }, { quoted: mek }); 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})




cmd({
    pattern: "ta",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  


const data = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/tiktokdl?url=${q}`)



await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { audio: { url: data.result.audio }, mimetype: "audio/mpeg" }, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})



cmd({
    pattern: "td",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  


const data = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/tiktokdl?url=${q}`)



await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { document: { url: data.result.audio }, mimetype: "audio/mpeg", fileName: `${data.result.title}.mp3`, caption: "💻 *VAJIRA MD TTDL*" }, { quoted: mek }); 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "tiktok2",
    alias: ["ttdl2","tt2"],
    react: '🏷️',
    desc: desc,
    category: "download",
    use: '.tiktok <Tiktok link>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!regtik(q)) return await  reply(urlneed)
let data = await downloadTiktok(q);	
let msg = `
    🎟️ *VAJIRA-MD TIKTOK DOWNLOADER* 🎟️

📌 *Please click what you want to select*

*Title* :- ${data.result.title}

*URL:* ${q}`	
await conn.sendMessage( from, { image: { url:`${data.result.image}`}, caption: msg }, { quoted: mek })	
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
await conn.sendMessage(from, { document: { url: q }, mimetype: 'audio/mpeg', fileName: 'TikTok Audio' + '.mp3',caption: config.FOOTER }, { quoted: mek })
await conn.sendMessage(from, { video: { url: data.result.dl_link.download_mp4_1}, mimetype: "video/mp4", caption: `SD QUALITY\n\n> *POWERED by VAJIRA-MD` }, { quoted: mek })	
await conn.sendMessage(from, { video: { url: data.result.dl_link.download_mp4_2 }, mimetype: "video/mp4", caption: `HD QUALITY\n\n> *POWERED by VAJIRA-MD` }, { quoted: mek })  
	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})






//================================IMG COMMAND======================================


	
cmd({
    pattern: "img1",
    react: '🖼️',
    desc: desc2,
    category: "",
    use: '.img2 car',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
const results = await unsplash.search({"query": q, page: 1})
let data = results

if (config.MODE === 'nonbutton') {
	
if (data.result.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
let nombor = 1
for (var i = 0; i < data.length; i++) {
srh.push({
title: i + 1,
description: 'Image number: ' + nombor++ ,
rowId: prefix + 'dimg ' + data.result[i]
});
}
const sections = [{
title: "Result from unsplash.com. 📲",
rows: srh
}]
const listMessage = { 
text: `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *IMG DOWNLOADER 02*

*🖼️ Image Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from unsplash.com. 📲',
buttonText: 'Select Image',
sections
}
await conn.replyList(from, listMessage,{quoted: mek})

} if (config.MODE === 'button') {


            if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < data.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description: 'Image number: ' + nombor++ ,
              id: prefix + 'dapk ' + data.result[i]
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from Image. 📲',
                        sections
                    })
                }]
    
        let message = {
            image : config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: `┌───[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *IMAGE DOWNLOADER*

*📱 Apk Name:* ${q}`
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	


} catch (e) {
reply(errt)
l(e)
}
})




cmd({
    pattern: "dimg",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🔃', key: mek.key }})
    await conn.sendMessage(from, { image: { url: q }, caption: config.FOOTER }, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply(errt)
  l(e)
}
})



cmd({
    pattern: "wallpaper",
    react: "🔖",
    desc: "image downloader",
    category: "download",
    use: '.wallpaper',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    let teks = 'Enter Query Title'
        let { wallpaper } = require('../lib/scraper')
                                  anu = await wallpaper(q)
                                  result = anu[Math.floor(Math.random() * anu.length)]
                          
              const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'wallpaper ' + q , description: 'NEXT  PIC ➡️'},

	]
    } 
]      
                                  const listMessage = {
  image: { url: result.image[0] },
      caption: `🔮 𝗧𝗜𝗧𝗟𝗘 : ${result.title}\n🔮 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬 : ${result.type}\n🔮 𝗗𝗘𝗧𝗔𝗜𝗟 : ${result.source}\n🔮 𝗠𝗘𝗗𝗜𝗔 𝗨𝗥𝗟 : ${result.image[2] || result.image[1] || result.image[0]}`,
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
    pattern: "wikimedia",
    react: "🔖",
    desc: "to download wikimedia",
    category: "download",
    use: '.wikimedia',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    let teks = 'Enter Query Title'
    let { wikimedia } = require('../lib/scraper')
                                  anu = await wikimedia(q)
                                  result = anu[Math.floor(Math.random() * anu.length)]
                                  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'wikimedia ' + q , description: 'NEXT  PIC ➡️'},

	]
    } 
]      
                                  const listMessage = {
 image: { url: result.image[0] },
      caption: `🔮 𝗧𝗜𝗧𝗟𝗘 : ${result.title}\n🔮 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬 : ${result.type}\n🔮 𝗗𝗘𝗧𝗔𝗜𝗟 : ${result.source}\n🔮 𝗠𝗘𝗗𝗜𝗔 𝗨𝗥𝗟 : ${result.image[2] || result.image[1] || result.image[0]}`,
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
    pattern: "quotesanime",
    react: "🔖",
    desc: "to download animes",
    category: "download",
    use: '.quotesanime',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    let teks = 'Enter Query Title'
         let { quotesAnime } = require('../lib/scraper')
                                  let anu = await quotesAnime()
                                  result = anu[Math.floor(Math.random() * anu.length)]
                                  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'quotesanime ' + q , description: 'NEXT  PIC ➡️'}

	]
    } 
]      
                                  const listMessage = {
 text: `~_${result.quotes}_\n\nBy '${result.karakter}', ${result.anime}\n\n- ${result.up_at}`,
                                      footer: config.FOOTER,
                                      buttonText: "🔢 Reply below number,",
  sections,
  contextInfo: {
				
				externalAdReply: { 
					title: '👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻',
					body: 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ',
					mediaType: 1,
					sourceUrl: "" ,
          thumbnailUrl: 'https://telegra.ph/file/b4caa5682d75220623b83.jpg' ,
					renderLargerThumbnail: false,
          showAdAttribution: true
         }}	
}
 
return await conn.replyList(from, listMessage ,{ quoted : mek }) 
} catch (e) {
reply(N_FOUND)
l(e)
}
})



cmd({
    pattern: "coffe",
    react: "🔖",
    desc: "to download coffe",
    category: "download",
    use: '.coffe',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: `☕`, key: mek.key }})
                              const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'coffe ' + q , description: 'NEXT  PIC ➡️'}

	]
    } 
]      
                                  const listMessage = {
 image: { url: 'https://coffee.alexflipnote.dev/random' },
caption: `Random Coffee`,
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
    pattern: "wpaper",
    react: "🔖",
    desc: "to download wpaper",
    category: "download",
    use: '.wpaper',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  let teks = '*LOADING...*'
    await conn.sendMessage(mek.chat, { image: { url: `https://api.akuari.my.id/search/alphacoders?query=${q}` },  caption: `${config.cap}`}, { quoted: mek }),
   await conn.sendMessage(mek.chat, { image: { url: `https://api.akuari.my.id/search/alphacoders?query=${q}` },  caption: `${config.cap}`}, { quoted: mek }.repeat(5))
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})


cmd({
    pattern: "ringtone",
    react: "🔖",
    desc: "to download ringtone",
    category: "download",
    use: '.ringtone',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) reply `${Lang.EXAMPLE}\n : ${prefix + command} black rover`
                          let { ringtone } = require('../lib/scraper')
                          let anu = await ringtone(q)
                          let result = anu[Math.floor(Math.random() * anu.length)]
                          conn.sendMessage(mek.chat, { audio: { url: result.audio }, fileName: result.title+'.mp3', mimetype: 'audio/mpeg' }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})



cmd({
    pattern: "couplepp",
    react: "🔖",
    desc: "couple pic download",
    category: "download",
    use: '.couplepp',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
   await conn.sendMessage(from, { react: { text: `💏`, key: mek.key }})
                                  
                                  let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
                                  let random = anu[Math.floor(Math.random() * anu.length)]
                                  conn.sendMessage(mek.chat, { image: { url: random.male }, caption: `Couple Male` }, { quoted: mek })
                                  conn.sendMessage(mek.chat, { image: { url: random.female }, caption: `Couple Female` }, { quoted: mek })
                              
                               
                              await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       




//===================================FB COMMAND====================================
    
cmd({
  pattern: "fb",
  react: '#️⃣',
  alias: ["fbdl","facebook"],
  desc: desc1,
  category: "download",
  use: '.fb <Fb video link>',
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!fbreg(q)) return await  reply(urlneed2)	
const result = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/fbdown?url=${q}`)

let dat = `VAJIRA MD FB DOWNLOADER

   
*URL :* ${q}`

if (config.MODE === 'nonbutton') {
	
var sections = [
    {
	title: "SD TYPE 🪫",
	rows: [
  {title: "    1.1", rowId: prefix + 'fbsd ' + q, description: ' 🪫 `SD` QUALITY VIDEO'}, 
  {title: "    1.2", rowId: prefix + 'fbsdd ' + q, description: ' 📂 `SD` QUALITY DOCUMENT'},	
]
    },
{
	title: "HD TYPE 🔋",
	rows: [
  {title: "    2.1", rowId: prefix + 'fbhd ' + q, description: ' 🔋 `HD` QUALITY VIDEO'}, 
  {title: "    2.2", rowId: prefix + 'fbhdd ' + q, description: ' 📂 `HD` QUALITY DOCUMENT'},		
]
},
{
	title: "VOICE CUT TYPE 🎶",
	rows: [
  {title: "    3.1", rowId: prefix + 'fba ' + q, description: ' 🎶 Audio file'},	
  {title: "    3.2", rowId: prefix + 'fbd ' + q, description: ' 📂 Document file'}			
]
    } 

]
const listMessage = {
image: { url:result.result.thumb},
caption: dat,
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {

let sections = [
  {
    title: 'SD TYPE 🪫',
    rows: [
      {
        header: "",
        title: "",
        description: " 🪫 `SD` QUALITY VIDEO",
        id: `${prefix}fbsd ${q}`
      },
      {
        header: "",
        title: "",
        description: " 📂 `SD` QUALITY DOCUMENT",
        id: `${prefix}fbsdd ${q}`
      }
    ]
  },
  {
    title: 'HD TYPE 🔋',
    rows: [
      {
        header: "",
        title: "",
        description: " 🪫 `HD` QUALITY VIDEO",
        id: `${prefix}fbhd ${q}`
      },
      {
        header: "",
        title: "",
        description: " 📂 `HD` QUALITY DOCUMENT",
        id: `${prefix}fbhdd ${q}`
      }
    ]
  },
  {
    title: 'VOICE CUT TYPE 🎶',
    rows: [
      {
        header: "",
        title: "",
        description: " 🎶 Audio file",
        id: `${prefix}fba ${q}`
      },
      {
        header: "",
        title: "",
        description: " 📂 Document file",
        id: `${prefix}fbd ${q}`
      }
    ]
  }
];

            let listMessage = {
            title: 'Click Here⎙',
            sections
        };
        conn.sendMessage(from, {
            image: { url: config.LOGO },
    caption: dat,
    footer: config.FOOTER,
                buttons: [
		{
                    buttonId: `${prefix}fbsd ${q}`,
                    buttonText: {
                        displayText: ' 🪫 `SD` QUALITY VIDEO'
                    },
                },	
                {
                    buttonId: `${prefix}fbhd ${q}`,
                    buttonText: {
                        displayText: ' 🔋 `HD` QUALITY VIDEO'
                    },
                },	
		{
                    buttonId: `${prefix}fba ${q}`,
                    buttonText: {
                        displayText: ' 🎶 Audio file'
                    },
                },		

                {
                    buttonId: 'action',
                    buttonText: {
                        displayText: 'ini pesan interactiveMeta'
                    },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify(listMessage),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });


}
	

	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})




cmd({
  pattern: "fb2",
  react: '#️⃣',
  alias: ["fbdl2","facebook2"],
  desc: desc1,
  category: "download",
  use: '.fb <Fb video link>',
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!fbreg(q)) return await  reply(urlneed2)

 // let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)
const result = await facebook(q)
const info = `
💢 *VAJIRA-MD FB DOWNLOADER* 💢

*TIME :* ${result.result.duration}
*URL :* ${q}
`	
await conn.sendMessage(from, { image: { url:`${result.result.thumbnail}`}, caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { audio: { url: result.result.links.HD }, mimetype: "audio/mpeg" }, { quoted: mek })	
await conn.sendMessage(from, { video: { url: result.result.links.SD }, mimetype: "video/mp4", caption: `SD QUALITY\n\n> *POWERED by VAJIRA-MD*` }, { quoted: mek })  
await conn.sendMessage(from, { video: { url: result.result.links.HD }, mimetype: "video/mp4", caption: `HD QUALITY\n\n> *POWERED by VAJIRA-MD*` }, { quoted: mek })  	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})



cmd({
    pattern: "fbsd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
  const result = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/fbdown?url=${q}`)

  // Send reactions and the video
  await conn.sendMessage(from, { react: { text: '⬆', key: mek.key } });
  await conn.sendMessage(from, { video: { url: result.result.sd }, mimetype: "video/mp4", caption: `> *POWERED by VAJIRA-MD*` }, { quoted: mek });
  await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });

}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "fbsdd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

 

 // let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)
const result = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/fbdown?url=${q}`)


	
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { document: { url: result.result.sd }, mimetype: "video/mp4", fileName: `FbDL.mp4`, caption: "💻 *VAJIRA MD FBDL*" }, { quoted: mek })	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "fbhd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
if (!q.includes('https://')) return await reply(msr.not_fo)

 // let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)
const result = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/fbdown?url=${q}`)

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { video: { url: result.result.hd }, mimetype: "video/mp4", caption: `> *POWERED by VAJIRA-MD*` }, { quoted: mek })  	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "fbhdd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
if (!q.includes('https://')) return await reply(msr.not_fo)

 // let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)
const result = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/fbdown?url=${q}`)

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})  
await conn.sendMessage(from, { document: { url: result.result.hd }, mimetype: "video/mp4", fileName: `FbDL.mp4`, caption: "💻 *VAJIRA MD FBDL*" }, { quoted: mek }); 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


					    
cmd({
    pattern: "fba",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  

if (!q.includes('https://')) return await reply(msr.not_fo)

//let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)
const result = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/fbdown?url=${q}`)

	
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { audio: { url: result.result.hd }, mimetype: "audio/mpeg" }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "fbd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  

if (!q.includes('https://')) return await reply(msr.not_fo)

//let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`)
const result = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/fbdown?url=${q}`)


	
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { document: { url: result.result.hd }, mimetype: "audio/mpeg", fileName: `Fbdl.mp3`, caption: "💻 *VAJIRA MD Fbdl*" }, { quoted: mek }); 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})