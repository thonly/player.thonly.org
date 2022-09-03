import template from "./template";

class ToTimer extends HTMLElement {
    #video;
    #audio;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#video = this.shadowRoot.querySelector('video');
        this.#audio = this.shadowRoot.querySelector('audio');
    }

    connectedCallback() {
        this.addEventListener('to-timer', event => this.#handleTimer(event.detail.event));
    }

    #handleTimer(event) {
        switch(event) {
            case "start":
                this.#play(true);
                break;
            case "pause":
                this.#play(false);
                break;
            case "resume":
                this.#play(true);
                break;
            case "alarm":
                this.#play(false);
                break;
            case "stop":
                this.#play(null);
                break;
        }
    }

    #play(on) {
        switch (on) {
            case true:
                if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) this.#video.play()
                else this.#audio.play();
                break;
            case false:
                this.#video.pause();
                this.#audio.pause();
                break;
            case null:
                this.#video.load();
                this.#audio.load();
                break;
        }
    }
}

customElements.define("to-timer", ToTimer);