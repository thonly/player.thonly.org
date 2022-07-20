const video = document.querySelector('video');
const audio = document.querySelector('audio');
const categories = ['THonly', 'Sisamuth', 'Anime', 'Pop', 'Foreign'];

export default () => {
    const library = JSON.parse(localStorage.getItem('library'));
    const favorite = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : setFavorite(library[categories[0]][0]);
    video.cover = favorite.coverart;
    video.src = favorite.video;
    audio.src = favorite.audio;
    renderMusicLibrary(library);
}

function renderMusicLibrary(library) {
    const nav = document.querySelector('nav');

    categories.forEach(category => {
        const h3 = document.createElement('h3');
        h3.textContent = category;
        const menu = document.createElement('menu');
        nav.append(h3, menu);

        library[category].sort(orderByTitle).forEach(song => {
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
    setFavorite(song);
    video.cover = song.coverart;
    video.src = song.video;
    audio.src = song.audio;
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) video.play()
    else audio.play();
}

function setFavorite(song) {
    localStorage.setItem('favorite', JSON.stringify(song));
    return song;
}

function orderByTitle(a, b) {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  }