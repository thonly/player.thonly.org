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
    res.send("Hello World");
});

app.post('/', async (req, res) => {
    ytdl(req.body.videoID, { filter: 'audioonly' }).pipe(fs.createWriteStream(`${req.body.category}/${req.body.videoID}.webm`));
    res.json({ time: await client.getTime() });
});

https.createServer({cert, key}, app).listen(432);

// async function getInfo(url) {
//     let info = await ytdl.getInfo(url);
//     let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
//     console.log('Formats with only audio: ' + JSON.stringify(audioFormats[0]));
// }

// getInfo('Us-2cMZu0kY');