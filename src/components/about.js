function about() {
    const aboutContainer = document.getElementById("about")
    const template = document.createElement("template")

    template.innerHTML = `
        <div id="icon-container">
            <img src="./img/layers.png" class="icon">
        </div>
        <div id="app-info">
            <h1>ShortStack Messaging</h1>
            <p>Proof of concept secure chat PWA</p>
            <p>Application made by Nicholas Synovic</p>
            <p>Icons made by <a href="https://www.flaticon.com/authors/bukeicon"
                title="bukeicon">bukeicon</a> from <a href="https://www.flaticon.com/"
                title="Flaticon">www.flaticon.com</a></p>
        </div>
    `
    aboutContainer.appendChild(template.content)
}
