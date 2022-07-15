window.onload = async () => {
    const response = await fetch('https://dns.thonly.net:432/');
    const music = await response.json();
    console.log(music)
}

window.addMusic = async event => {
    event.preventDefault();
    const response = await fetch('https://dns.thonly.net:432/', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(event.target)))
    });
    const status = await response.json();
    console.log(status)
}

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BEYWFZT7S3');