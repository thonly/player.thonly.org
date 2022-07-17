const img = document.querySelector('img');
const audio = document.querySelector('audio');
audio.loop = true;
const categories = ['THonly', 'Sisamuth', 'Anime', 'Pop', 'Foreign'];

window.onload = async () => {
    const library = JSON.parse(localStorage.getItem('library'));
    img.src = library[categories[0]][0].coverart;
    img.onclick = () => window.open(`https://www.youtube.com/watch?v=${library[categories[0]][0].id}`, '_blank');
    audio.src = library[categories[0]][0].url;
    renderMusicLibrary(library);
}

window.getMusicLibrary = async () => {
    const library = await fetch('https://dns.thonly.net:432/');
    localStorage.setItem('library', JSON.stringify(await library.json()));
    document.location.reload();
}

window.addMusic = async event => {
    event.preventDefault();
    const library = await fetch('https://dns.thonly.net:432/', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(event.target)))
    });    
    localStorage.setItem('library', JSON.stringify(await library.json()));
    document.location.reload();
}

function renderMusicLibrary(library) {
    const nav = document.querySelector('nav');

    categories.forEach(category => {
        const h3 = document.createElement('h3');
        h3.textContent = category;
        const menu = document.createElement('menu');
        nav.append(h3, menu);

        library[category].forEach(song => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = song.thumbnail;
            li.append(img, song.title);
            li.onclick = () => playMusic(song);
            menu.append(li);
        });
    });
}

function playMusic(song) {
    audio.src = song.url;
    audio.play();
}

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BEYWFZT7S3');