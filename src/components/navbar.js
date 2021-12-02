function navbarHome() {
    const navbarContainer = document.getElementById("nav-bar")
    const template = document.createElement("template")

    template.innerHTML = `
        <div class="nav-item" onclick="location.href='index.html'">
            <h3>ShortStack Messaging</h3>
        </div>
        <div class="nav-item">
            <button id="signIn-button" class="button" onclick="location.href='signIn.html'">Sign In</button>
        </div>
        <div class="nav-item">
            <button id="signUp-button" class="button" onclick="location.href='signUp.html'">Sign Up</button>
        </div>
    `
    navbarContainer.appendChild(template.content)
}
