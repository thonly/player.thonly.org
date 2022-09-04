import template from "./template.mjs";

class ToVideo extends HTMLElement {
    video;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.video = this.shadowRoot.querySelector('video');
    }
}

customElements.define("to-video", ToVideo);