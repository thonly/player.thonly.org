const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/to-timer/shadow.css">
    <h1 id="timer">00:00:00</h1>
    <section>
        <input id="time" type="time" value="18:00">
        <button onclick="this.getRootNode().host.start(this, 0)">Start</button>
        <button id="pause" onclick="this.getRootNode().host.pause(this)" disabled>Pause</button>
        <button id="stop" onclick="this.getRootNode().host.stop(this)" disabled>Stop</button>
        <br><br>
        <button onclick="this.getRootNode().host.start(this, 15)">15 Minutes</button>
        <button onclick="this.getRootNode().host.start(this, 30)">30 Minutes</button>
        <button onclick="this.getRootNode().host.start(this, 40)">40 Minutes</button>
        <br><br>
        <button onclick="this.getRootNode().host.start(this, 60)">1 Hour</button>
        <button onclick="this.getRootNode().host.start(this, 60*2)">2 Hours</button>
        <button onclick="this.getRootNode().host.start(this, 60*3)">3 Hours</button>
    </section>
`;

export default template;