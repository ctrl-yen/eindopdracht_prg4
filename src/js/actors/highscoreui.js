import { ScreenElement, Text, Font, FontUnit, Color } from "excalibur"

export class HighscoreUI extends ScreenElement {

    constructor() {
        super({
            x: 950,
            y: 30,
            z: 1000
        })

        this.highscore = parseInt(localStorage.getItem("highscore")) || 0
    }

    onInitialize(engine) {
        this.updateText()
    }

    updateScore(score) {
        if (score > this.highscore) {
            this.highscore = score
            localStorage.setItem("highscore", this.highscore)
        }

        this.updateText()
    }

    updateText() {
        this.graphics.use(
            new Text({
                text: "Highscore: " + this.highscore,
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