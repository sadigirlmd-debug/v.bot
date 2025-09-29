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
const { default: axios, isAxiosError } = require("axios");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const vm = require('vm')
const { facebook } = require('@mrnima/facebook-downloader');
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const yts = require('yt-search');
const { ytmp3 } = require("@vreden/youtube_scraper");
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

 }
});

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
        const link = "https://dropmail.me/api/graphql/web-test-wgq6m5i?query=mutation%20%7BintroduceSession%20%7Bid%2C%20expiresAt%2C%20addresses%20%7Baddress%7D%7D%7D";
        let response = await fetch(link);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        let email = data["data"]["introduceSession"]["addresses"][0]["address"];
        let id_ = data["data"]["introduceSession"]["id"];
        let time = data["data"]["introduceSession"]["expiresAt"];

        let info = config.LANG === 'en' ? `Email = ${email}\nID = ${id_}\nTIME = ${time}` : 
                                           `ඊමේල් = ${email}\nඅයි.ඩි = ${id_}\nකාලය = ${time}`;

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
                                                    "buttonParamsJson": `{\"display_text\":\"Copy TempMail\",\"id\":\"123456789\",\"copy_code\":\"${email}\"}`
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
                                                    "buttonParamsJson": `{\"display_text\":\"Copy ID\",\"id\":\"123456789\",\"copy_code\":\"${id_}\"}`
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
                                    newsletterJid: '120363412075023554@newsletter',
                                    newsletterName: `🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️`,
                                    serverMessageId: 143
                                }
                            }
                        }
                    }
                }
            },
            { quoted: m }
        );
        
        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id,
        });
    } catch (e) {
        reply(config.LANG === 'en' ? 'Error fetching tempmail' : 'ඇරඹීමට දෝෂයක් ඇතිවිය');
        l(e);
    }
});










