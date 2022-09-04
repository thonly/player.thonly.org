const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/to-add/shadow.css">
    <fieldset>
        <legend><h2>Add Music</h2></legend>
        <form onsubmit="this.getRootNode().host.addMusic(event)">
            <select name="category">
                <option>THonly</option>
                <option selected>Sisamuth</option>
                <option>Anime</option>
                <option>Pop</option>
                <option>Foreign</option>
            </select>
            <input name="videoID" type="input" placeholder="Video ID" required>
            <br><br>
            <button type="submit">Download</button>
            <button type="button" onclick="this.getRootNode().host.refreshLibrary()">Refresh Music Library</button>
        </form>
    </fieldset>
`;

export default template;