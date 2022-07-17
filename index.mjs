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
    res.json(getLibrary());
});

// "liveServer.settings.ignoreFiles":["music/**"]
app.post('/', async (req, res) => {
    const title = await getInfo(req.body.videoID);
    const stream = ytdl(req.body.videoID, { filter: 'audioonly' });
    //stream.on('info', (info, format) => console.log(info, format));
    stream.on('progress', (chunkLength, downloaded, total) => console.log("Progress:", Math.floor((downloaded / total) * 100)));
    stream.pipe(fs.createWriteStream(`music/${req.body.category}/${req.body.videoID} *|* ${title}.webm`).on('finish', () => res.json(getLibrary())));
});

https.createServer({cert, key}, app).listen(432);

async function getInfo(videoID) {
    const info = await ytdl.getBasicInfo(videoID);
    return info.videoDetails.title;
}

function getLibrary() {
    const library = { THonly: [], Sisamuth: [], Anime: [], Pop: [], Foreign: [] };
    for (const dir in library) {
        const folder = fs.opendirSync('music/' + dir);
        let files = true;
        while (files) {
            const file = folder.readSync();
            if (file) library[dir].push(getData(folder.path, file.name))
            else files = false;
        }
        folder.close();
    }
    return library;
}

// https://stackoverflow.com/questions/10066638/get-youtube-information-via-json-for-single-video-not-feed-in-javascript
function getData(folder, file) {
    const info = file.split(' *|* ');
    const data = {};
    data.id = info[0];
    data.title = info[1].replace('.webm', '');
    data.url = `${folder}/${file}`;
    data.coverart = `https://i.ytimg.com/vi/${data.id}/maxresdefault.jpg`;
    data.thumbnail = `https://img.youtube.com/vi/${data.id}/3.jpg`;
    return data;
}
// console.log(getLibrary());