const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/to-library/shadow.css">
    <fieldset>
        <legend><h2>Music Library</h2></legend>
        <slot></slot>
        <nav></nav>
    </fieldset>
`;

export default template;