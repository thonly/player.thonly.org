import { exec } from "child_process";

function convert(path) {
    path = path.replace(/[-\s\|\&]/g, '\\$&');
    //console.log(path)
    exec(`sudo ffmpeg -i ${path}.mp4 ${path}.mp3`, (error, stdout, stderr) => {
        if (error) console.log("Error:", error.message);
        if (stderr) console.log("StdErr:", stderr);
        if (stdout) console.log("StdOut:", stdout);
    });
}

//convert("/Users/heartbank/Desktop/HeartBank®/THonly™/thonly.net/music.thonly.net/music/THonly/E6F91X1RRmE/Extremely Powerful Self Connection Meditation - 432 Hz + 3.4 Hz - Binaural Beats - Meditation Music");
//convert("/Users/heartbank/Desktop/HeartBank®/THonly™/thonly.net/music.thonly.net/music/THonly/hXmFgsVvV5M/Deep Sleep | Third Eye Chakra | 432Hz | Binaural Beats | Black Screen");
//convert("/Users/heartbank/Desktop/HeartBank®/THonly™/thonly.net/music.thonly.net/music/THonly/LFGsZ6ythQQ/Happiness Frequency: Serotonin, Dopamine, Endorphin Release Music, Binaural Beats Meditation Music");
//convert("/Users/heartbank/Desktop/HeartBank®/THonly™/thonly.net/music.thonly.net/music/THonly/Mgwd_3k3pOw/DEEP Theta Binaural Beats ➤ LET GO of Fear, Overthinking & Worries ➤ 432Hz Deep Relaxation");
