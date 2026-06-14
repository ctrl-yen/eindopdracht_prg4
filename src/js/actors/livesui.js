import { ScreenElement, Text, Font, FontUnit, Color } from "excalibur"

export class LivesUI extends ScreenElement {

    constructor() {
        super({
            x: 30,
            y: 75,
            z: 1000
        })

        this.lives = 3
    }

    onInitialize(engine) {
        this.updateText()
    }

    loseLife() {
        this.lives--
        this.updateText()
    }

    updateText() {
        this.graphics.use(
            new Text({
                text: "Lives: " + this.lives,
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