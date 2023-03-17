import template from "./template.mjs";

class ToMusic extends HTMLElement {
    #video;
    #audio;
    #libraryElement;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#video = this.querySelector('to-video').video;
        this.#audio = this.querySelector('to-audio').audio;
        this.#libraryElement = this.querySelector('to-library');
    }

    async connectedCallback() {
        //const library = this.#getLibrary() || await this.#refreshLibrary();
        const library = await this.#refreshLibrary();
        const favorite = JSON.parse(localStorage.getItem('favorite')) || library.THonly[0];
        this.#setFavorite(favorite);

        this.addEventListener('to-timer', event => this.#handleTimer(event.detail.event));
        this.addEventListener('to-add', event => this.#handleAdd(event.detail));
        this.addEventListener('to-library', event => {
            this.#setFavorite(event.detail.song);
            this.#play(true);
        });
    }

    #handleAdd(detail) {
        switch(detail.action) {
            case "refresh":
                this.#refreshLibrary();
                this.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
                break;
            case "update":
                this.#updateLibrary(detail.data);
                break;
        }
    }

    #getLibrary() {
        if (localStorage.getItem('library')) {
            const library = JSON.parse(localStorage.getItem('library'));
            this.#libraryElement.render(library);
            return library;
        } return null;
    }

    async #refreshLibrary() {
        const library = await this.#libraryElement.refresh();
        localStorage.setItem('library', JSON.stringify(library));
        return library;
        //document.location.reload();
    }

    #updateLibrary(data) {
        localStorage.setItem('library', JSON.stringify(data.library));
        this.#libraryElement.render(data.library);
        this.#setFavorite(data.favorite);
        //document.location.reload();
    }

    #setFavorite(song) {
        localStorage.setItem('favorite', JSON.stringify(song));
        this.#video.cover = song.coverart;
        this.#video.src = song.video;
        this.#audio.src = song.audio;
        this.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
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

customElements.define("to-music", ToMusic);