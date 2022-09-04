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
        console.log(this.#video)
        console.log(this.#libraryElement.render)
    }

    async connectedCallback() {
        const library = this.#getLibrary() || await this.#refreshLibrary();
        const favorite = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : this.#setFavorite(library[categories[0]][0]);
        this.#video.cover = favorite.coverart;
        this.#video.src = favorite.video;
        this.#audio.src = favorite.audio;

        this.addEventListener('to-timer', event => this.#handleTimer(event.detail.event));
        this.addEventListener('to-add', event => this.#handleAdd(event.detail));
        this.addEventListener('to-library', event => this.#playMusic(event.detail.song));
    }

    #handleAdd(detail) {
        switch(detail.action) {
            case "refresh":
                this.#refreshLibrary();
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

    #updateLibrary(data) {
        localStorage.setItem('library', JSON.stringify(data.library));
        this.#setFavorite(data.favorite);
        this.#libraryElement.render(data.library);
        //document.location.reload();
    }

    async #refreshLibrary() {
        const response = await fetch('https://dns.thonly.net:432/');
        const data = await response.json();
        localStorage.setItem('library', JSON.stringify(data.library));
        this.#libraryElement.render(data.library);
        return data.library;
        //document.location.reload();
    }

    #setFavorite(song) {
        localStorage.setItem('favorite', JSON.stringify(song));
        return song;
    }

    #playMusic(song) {
        this.#setFavorite(song);
        this.#video.cover = song.coverart;
        this.#video.src = song.video;
        this.#audio.src = song.audio;
        this.#play(true);
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