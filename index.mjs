import fs from 'fs';
import https from 'https';
import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';

// expires on 2022-10-13
const cert = fs.readFileSync('private/fullchain.pem');
const key = fs.readFileSync('private/privkey.pem');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.get('/', (req, res) => {
    res.json(getMusic());
});

app.post('/', (req, res) => {
    const stream = ytdl(req.body.videoID, { filter: 'audioonly' });
    //stream.on('info', (info, format) => console.log(info, format));
    stream.on('progress', (chunkLength, downloaded, total) => console.log("Progress:", Math.floor((downloaded / total) * 100)));
    stream.pipe(fs.createWriteStream(`music/${req.body.category}/${req.body.videoID}.webm`));
    res.json({ status: 'success' });
});

https.createServer({cert, key}, app).listen(432);

// async function getInfo(url) {
//     let info = await ytdl.getInfo(url);
//     let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
//     console.log('Formats with only audio: ' + JSON.stringify(audioFormats[0]));
// }

// getInfo('Us-2cMZu0kY');

function getMusic() {
    const music = { THonly: [], Sisamuth: [], Anime: [], Pop: [], Foreign: [] };
    
    for (const dir in music) {
        const folder = fs.opendirSync('music/' + dir);
        let files = true;

        while (files) {
          const file = folder.readSync();
          if (file) music[dir].push(`${folder.path}/${file.name}`) 
          else files = false;
        }

        folder.close();
    }

    return music;
}

//console.log(getMusic());