import template from "./template.mjs";

class ToAudio extends HTMLElement {
    audio;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.audio = this.shadowRoot.querySelector('audio');
    }

    playMusic(song) {
        setFavorite(song);
        video.cover = song.coverart;
        video.src = song.video;
        audio.src = song.audio;
        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) video.play()
        else audio.play();
    }
}

customElements.define("to-audio", ToAudio);