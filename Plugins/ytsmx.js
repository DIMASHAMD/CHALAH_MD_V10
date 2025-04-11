const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
const axios = require('axios');
const cheerio = require('cheerio');


cmd({
    pattern: "ytsmx",	
    react: '📑',
    category: "movie",
    desc: "ytsmx moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	

const data = await fetchJson(`${config.API}/api/ytsmx/search?q=${q}&apikey=${config.APIKEY}`)

	
if (data.data.data.data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.data.data.data.length; i++) {
srh.push({
title: i + 1,
description: `${data.data.data.data[i].title} | ${data.data.data.data[i].rating} | ${data.data.data.data[i].year}`,
rowId: prefix + 'ytmx ' + data.data.data.data[i].link
});
}
const sections = [{
title: "_[Result from ytsmx.]_",
rows: srh
    }	  				 
 ]

    const listMessage = {
text: ``,
footer: config.FOOTER,
title: 'Result from ytsmx. 📲',
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
    pattern: "ytmx",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	

const data = await fetchJson(`${config.API}/api/ytsmx/movie?url=${q}&apikey=${config.APIKEY}`)

	
if (data.data.data.moviedata.dllinks.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.data.data.moviedata.dllinks.length; i++) {
srh.push({
title: i + 1,
description: `${data.data.data.moviedata.dllinks[i].quality} | ${data.data.data.moviedata.dllinks[i].type} | ${data.data.data.moviedata.dllinks[i].size}`,
rowId: prefix + 'ytsmxdl ' + data.data.data.moviedata.dllinks[i].magnet
});
}
const sections = [{
title: "_[Result from ytsmx.]_",
rows: srh
    },	
{
	title: "*🎬 MOVIE DETAILS 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `ytsmxs ${q}` , description: 'Send Movie IMAGES 🏞️'},

       ]
    }
]
    const listMessage = {
caption: `*_☘ Title: ${data.data.data.moviedata.title}*

- *Year:* ${data.data.data.moviedata.year}
- *Language:* ${data.data.data.moviedata.language}
- *Enter:* ${data.data.data.moviedata.enter}

⛏️ *Link:* ${q}`,	
image: {url: data.data.data.moviedata.image },
footer: config.FOOTER,
title: 'Result from ytsmx. 📲',
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
    pattern: "ytsmxs",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')

		
const data = await fetchJson(`${config.API}/api/ytsmx/movie?url=${q}&apikey=${config.APIKEY}`)
if(config.DIRECTION === "true" ) {		
const msg = `*_☘ Title: ${data.data.data.moviedata.title}*

- *Year:* ${data.data.data.moviedata.year}
- *Language:* ${data.data.data.moviedata.language}
- *Enter:* ${data.data.data.moviedata.enter}

*⛏️ Link:* ${q}

${config.FOOTER}`
		
return await conn.sendMessage(from, { image: { url:data.data.data.moviedata.image } , caption: msg } , { quoted: mek })
} if(config.DIRECTION === "false" ) {		
const msg = `*_☘ Title: ${data.data.data.moviedata.title}*

- *Year:* ${data.data.data.moviedata.year}
- *Language:* ${data.data.data.moviedata.language}
- *Enter:* ${data.data.data.moviedata.enter}

*⛏️ Link:* ${q}

${config.FOOTER}`
		
return await conn.sendMessage(config.JID, { image: { url:data.data.data.moviedata.image } , caption: msg } , { quoted: mek })
}		
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1')
            console.log(e)
            }
    })       






cmd({
    pattern: "ytsmxdl",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isDev, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
	

							 
  if ( !isDev ) return reply('⚠️ ⚠️ *Contact owner to Active your number To Premium user*')  

var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.login("vajirarathnayaka891@gmail.com","vajirarathnayaka891@");

const ad_mg = await conn.sendMessage(from, { text : 'ᴜᴘʟᴏᴀᴅɪɴɢ magnet file...📥' }, {quoted: mek} )
const magnet = await seedr.addMagnet(q);

reply('╭═════════════════❀\n│  UPLODING YOUR MOVIE 📥\n│ ❀ Target : WAIT FEW MINUTES...\n│ ❀ Use commands after come the movie\n│ ❀ Device : 1/3\n╰═════════════════❀')


    if (magnet.code === 400 || magnet.result !== true) {
        console.log("Error adding magnet " + JSON.stringify(magnet, null, 2))
        return null;
    }
    var contents = []
	do {
		contents = await seedr.getVideos();
	} while (contents.length === 0);


		var file = await seedr.getFile(contents[0][0].id);
		var folder_id=  contents[0][0].fid 

	const link = file.url
if(config.DIRECTION === "true" ) {
	    
await conn.sendMessage(from, {
        document: await getBuffer(link),
        mimetype: 'audio/mp4',
        fileName: `${file.name}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴍɪɴᴜᴋɪ-ᴍᴅ-ᴍᴏᴠɪᴇ-ᴅʟ',
            body: `${file.name}`,
            thumbnailUrl: `${config.LOGO}`,
            sourceUrl: `${q}`,
            mediaType: 2,
            mediaUrl: `${config.LOGO}`
          }
        }
      }, { quoted: m });	
} if(config.DIRECTION === "false" ) {

await conn.sendMessage(config.JID, {
        document: await getBuffer(link),
        mimetype: 'audio/mp4',
        fileName: `${file.name}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴍɪɴᴜᴋɪ-ᴍᴅ-ᴍᴏᴠɪᴇ-ᴅʟ',
            body: `${file.name}`,
            thumbnailUrl: `${config.LOGO}`,
            sourceUrl: `${q}`,
            mediaType: 2,
            mediaUrl: `${config.LOGO}`
          }
        }
      }, { quoted: m });		
}



	await seedr.deleteFolder(folder_id)
await conn.sendMessage(from, { text : `Movie send ${config.JID} Successfull ✔` }, {quoted: mek} )
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})


