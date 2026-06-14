import { ScreenElement, Text, Font, FontUnit, Color } from "excalibur"

export class ScoreUI extends ScreenElement {

    constructor(highscoreUI) {
        super({
            x: 30,
            y: 30,
            z: 1000
        })

        this.score = 0
        this.highscoreUI = highscoreUI

        localStorage.setItem("currentScore", this.score)
    }

    onInitialize(engine) {
        this.updateText()
    }

    addScore(amount) {
        this.score += amount

        localStorage.setItem("currentScore", this.score)

        this.updateText()

        if (this.highscoreUI) {
            this.highscoreUI.updateScore(this.score)
        }
    }

    updateText() {
        this.graphics.use(
            new Text({
                text: "Score: " + this.score,
                font: new Font({
                    family: "Arial",
                    size: 36,
                    unit: FontUnit.Px,
                    color: Color.White
                })
            })
        )
    }
}