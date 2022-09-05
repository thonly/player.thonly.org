import template from "./template.mjs";

class ToLibrary extends HTMLElement {
    #categories = ['THonly', 'Sisamuth', 'Anime', 'Pop', 'Foreign'];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async refresh() {
        const response = await fetch('https://dns.thonly.net:432/');
        const data = await response.json();
        this.render(data.library);
        return data.library;
    }

    render(library) {
        const nav = this.shadowRoot.querySelector('nav');
        nav.replaceChildren();

        this.#categories.forEach(category => {
            const h3 = document.createElement('h3');
            h3.textContent = category;
            const menu = document.createElement('menu');
            nav.append(h3, menu);

            library[category].sort(this.#orderByTitle).forEach(song => {
                const li = document.createElement('li');
                const img = document.createElement('img');
                img.src = song.thumbnail;
                img.onclick = () => window.open(`https://www.youtube.com/watch?v=${song.id}`, '_blank');
                li.append(img, song.title);
                li.onclick = () => this.dispatchEvent(new CustomEvent("to-library", { bubbles: true, composed: true, detail: { song }}));
                menu.append(li);
            });
        });
    }

    #orderByTitle(a, b) {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    }
}

customElements.define("to-library", ToLibrary);