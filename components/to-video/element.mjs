import template from "./template.mjs";

class ToVideo extends HTMLElement {
    video;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.video = this.shadowRoot.querySelector('video');
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

customElements.define("to-video", ToVideo);