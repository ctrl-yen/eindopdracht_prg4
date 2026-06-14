import '../css/style.css'
import { Engine, Vector, DisplayMode } from "excalibur"
import { ResourceLoader } from './resources.js'

import { Level } from "./scene/level.js"
import { GameOver } from "./scene/gameover.js"
import { WinUI } from "./scene/winui.js"

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })

        this.physics.gravity = new Vector(0, 1800)

        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

        this.add("level", new Level())
        this.add("gameover", new GameOver())
        this.add("win", new WinUI())

        this.goToScene("level")
    }
}

new Game()