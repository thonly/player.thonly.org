import './timer.mjs';
import renderPlayer from './player.mjs';

window.onload = () => {
    renderPlayer();
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

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BEYWFZT7S3');