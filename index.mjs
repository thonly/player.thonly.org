import fs from 'fs';
import ytdl from 'ytdl-core';

ytdl('Us-2cMZu0kY', { filter: 'audioonly' }).pipe(fs.createWriteStream('music.webm'));

async function getInfo(url) {
    let info = await ytdl.getInfo(url);
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    console.log('Formats with only audio: ' + JSON.stringify(audioFormats[0]));
}

//getInfo('Us-2cMZu0kY');