const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/to-timer/shadow.css">
    <h1 id="timer">00:00:00</h1>
    <section>
        <input id="time" type="time" value="18:00">
        <button onclick="startTimer(this, 0)">Start</button>
        <button id="pause" onclick="pauseTimer(this)" disabled>Pause</button>
        <button id="stop" onclick="stopTimer(this)" disabled>Stop</button>
        <br><br>
        <button onclick="startTimer(this, 15)">15 Minutes</button>
        <button onclick="startTimer(this, 30)">30 Minutes</button>
        <button onclick="startTimer(this, 40)">40 Minutes</button>
        <br><br>
        <button onclick="startTimer(this, 60)">1 Hour</button>
        <button onclick="startTimer(this, 60*2)">2 Hours</button>
        <button onclick="startTimer(this, 60*3)">3 Hours</button>
    </section>
`;

export default template;