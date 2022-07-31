let timer = null;
let startButton = null;
let startTime = null;
let pauseDuration = null;
let alarmDuration = null;
let playing = null;

const video = document.querySelector('video');
const audio = document.querySelector('audio');
const timerElement = document.getElementById('timer');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');

window.setTimer = element => {
    const now = new Date();
    const time = element.value.split(':');
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), time[0], time[1]);
    const minutes = Math.floor((date - now)/(1000*60));
    //console.log(minutes)
    window.startTimer(element, minutes);
}

window.startTimer = (element, minutes=0) => {
    clearInterval(timer);
    timerElement.style.color = 'green';
    pauseButton.disabled = false;
    stopButton.disabled = false;

    play(true);
    playing = true;
    pauseButton.textContent = "Pause";
    element.disabled = true;
    if (startButton) startButton.disabled = false;
    startButton = element;
    
    startTime = new Date();
    alarmDuration = getFormattedDuration(minutes*60);
    runTimer(startTime, alarmDuration);
};

function runTimer(startTime, alarmDuration) {
    timer = setInterval(() => {
        const timerDuration = getFormattedDuration((new Date() - startTime) / 1000);
        timerElement.textContent = timerDuration;
        if (timerDuration === alarmDuration) {
            timerElement.style.color = 'red';
            //startButton.disabled = false;
            play(false);
        }
    }, 1000);
}

window.pauseTimer = element => {
    if (playing) {
        pauseDuration = new Date() - startTime;
        clearInterval(timer);
        playing = false;
        element.textContent = "Resume";
        play(false);
    } else {
        startTime = new Date() - pauseDuration;
        runTimer(startTime, alarmDuration);
        playing = true;
        element.textContent = "Pause";
        play(true);
    }
};

window.stopTimer = element => {
    clearInterval(timer);
    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
    playing = false;
    pauseButton.textContent = "Pause";
    timerElement.style.color = 'black';
    play(null);
};

function play(on) {
    switch (on) {
        case true:
            if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) video.play()
            else audio.play();
            break;
        case false:
            video.pause();
            audio.pause();
            break;
        case null:
            video.load();
            audio.load();
            break;
    }
}

function getFormattedDuration(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor(totalSeconds % 3600 / 60);
    const s = Math.floor(totalSeconds % 3600 % 60);

    const hours = String(h).padStart(2, '0');
    const minutes = String(m).padStart(2, '0');
    const seconds = String(s).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}