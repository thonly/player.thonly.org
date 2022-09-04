import template from "./template.mjs";

class ToAudio extends HTMLElement {
    audio;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.audio = this.shadowRoot.querySelector('audio');
    }
}

customElements.define("to-audio", ToAudio);