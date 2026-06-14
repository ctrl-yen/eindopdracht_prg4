import { Scene, Vector } from "excalibur"
import { Background } from "../actors/background.js"
import { Toki } from "../actors/toki.js"
import { SmallPlatform } from "../actors/smallplatform.js"
import { MediumPlatform } from "../actors/mediumplatform.js"
import { LargePlatform } from "../actors/largeplatform.js"
import { DeathBarrier } from "../actors/deathbarrier.js"
import { Orb } from "../actors/orb.js"
import { ScoreUI } from "../actors/scoreui.js"
import { LivesUI } from "../actors/livesui.js"
import { HighscoreUI } from "../actors/highscoreui.js"
import { Guard } from "../actors/guard.js"
import { Whisp } from "../actors/whisp.js"

export class Level extends Scene {

    onInitialize(engine) {
        this.add(new Background(640))
        this.add(new Background(1900))
        this.add(new Background(3160))

        const highscoreUI = new HighscoreUI()
        this.add(highscoreUI)

        const scoreUI = new ScoreUI(highscoreUI)
        this.add(scoreUI)

        const livesUI = new LivesUI()
        this.add(livesUI)

        const playerToki = new Toki(scoreUI, livesUI)
        playerToki.pos = new Vector(200, 500)
        this.add(playerToki)

        this.add(new LargePlatform(300, 640))
        this.add(new SmallPlatform(800, 520))
        this.add(new MediumPlatform(1200, 420))
        this.add(new SmallPlatform(1650, 320))
        this.add(new MediumPlatform(2100, 520))
        this.add(new LargePlatform(2700, 640))

        this.add(new Orb(800, 460))
        this.add(new Orb(1650, 260))
        this.add(new Orb(2100, 460))
        this.add(new Orb(2700, 580))

        this.add(new Guard(1200, 310, 1080, 1320))
        this.add(new Guard(2700, 530, 2450, 2950))

        this.add(new Whisp(2920, 520))

        const deathBarrier = new DeathBarrier(1500, 900, 4000, 100)
        this.add(deathBarrier)

        this.camera.strategy.lockToActor(playerToki)

        this.camera.strategy.limitCameraBounds({
            left: 0,
            top: 0,
            right: 3000,
            bottom: 720
        })
    }
}