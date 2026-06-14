import { Scene } from "excalibur"

export class WinUI extends Scene {

    onActivate() {
        const score = localStorage.getItem("currentScore") || 0
        const highscore = localStorage.getItem("highscore") || 0

        this.container = document.createElement("div")
        this.container.style.position = "fixed"
        this.container.style.left = "0"
        this.container.style.top = "0"
        this.container.style.width = "100vw"
        this.container.style.height = "100vh"
        this.container.style.display = "flex"
        this.container.style.flexDirection = "column"
        this.container.style.justifyContent = "center"
        this.container.style.alignItems = "center"
        this.container.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
        this.container.style.zIndex = "9999"

        const title = document.createElement("h1")
        title.innerText = "YOU WIN!"
        title.style.color = "white"
        title.style.fontSize = "64px"

        const scoreText = document.createElement("p")
        scoreText.innerText = "Score: " + score
        scoreText.style.color = "white"
        scoreText.style.fontSize = "32px"

        const highscoreText = document.createElement("p")
        highscoreText.innerText = "Highscore: " + highscore
        highscoreText.style.color = "white"
        highscoreText.style.fontSize = "32px"

        const button = document.createElement("button")
        button.innerText = "Play Again"
        button.style.fontSize = "32px"
        button.style.padding = "16px 32px"
        button.style.cursor = "pointer"

        button.onclick = () => {
            window.location.reload()
        }

        this.container.appendChild(title)
        this.container.appendChild(scoreText)
        this.container.appendChild(highscoreText)
        this.container.appendChild(button)

        document.body.appendChild(this.container)
    }

    onDeactivate() {
        if (this.container) {
            this.container.remove()
            this.container = null
        }
    }
}