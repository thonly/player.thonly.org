import template from "./template.mjs";

class ToAdd extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    refreshLibrary() {
        this.dispatchEvent(new CustomEvent("to-add", { bubbles: true, composed: true, detail: { action: "refresh" }}));
    }
    
    async addMusic(event) {
        event.preventDefault();
        const response = await fetch('https://dns.thonly.net:432/', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(event.target)))
        });
        this.dispatchEvent(new CustomEvent("to-add", { bubbles: true, composed: true, detail: { action: "update", data: await response.json() }}));
    }
}

customElements.define("to-add", ToAdd);