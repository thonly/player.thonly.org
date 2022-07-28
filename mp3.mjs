import fs from 'fs';
import ytdl from 'ytdl-core';
import { exec } from "child_process";

async function download(videoID) {
    const info = await ytdl.getBasicInfo(videoID);
    const title = info.videoDetails.title;
    const folder = `music/temp/${videoID}`;
    const path = `${folder}/${title}`;
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const audio = ytdl(videoID, { filter: 'audioonly', quality: 'highestaudio' });
    audio.on('progress', (chunkLength, downloaded, total) => console.log("Progress:", Math.floor((downloaded / total) * 100)));
    audio.pipe(fs.createWriteStream(`${path}.webm`)).on('close', () => convert(path));
}

function convert(path) {
    path = path.replace(/[-\s\|\&\(\)]/g, '\\$&');
    //console.log(path)
    exec(`sudo ffmpeg -i ${path}.webm ${path}.mp3`, (error, stdout, stderr) => {
        if (error) console.log("Error:", error.message);
        if (stderr) console.log("StdErr:", stderr);
        if (stdout) console.log("StdOut:", stdout);
    });
}

download("0UTHOBcY3qE");