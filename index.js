const video = document.querySelector('video');
const audio = document.querySelector('audio');
const categories = ['THonly', 'Sisamuth', 'Anime', 'Pop', 'Foreign'];

window.onload = async () => {
    const library = JSON.parse(localStorage.getItem('library'));
    video.cover = library[categories[0]][0].coverart;
    video.src = library[categories[0]][0].video;
    audio.src = library[categories[0]][0].audio;
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
            img.onclick = () => window.open(`https://www.youtube.com/watch?v=${song.id}`, '_blank');
            li.append(img, song.title);
            li.onclick = () => playMusic(song);
            menu.append(li);
        });
    });
}

function playMusic(song) {
    video.cover = song.coverart;
    video.src = song.video;
    audio.src = song.audio;
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) video.play()
    else audio.play();
}

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BEYWFZT7S3');