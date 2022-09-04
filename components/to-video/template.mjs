const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/to-video/shadow.css">
    <video controls preload loop autopictureinpicture></video>
`;

export default template;