import { Actor, CollisionType, Keys, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Toki extends Actor {

    constructor(scoreUI, livesUI) {
        super({
            width: 64,
            height: 360,
            collisionType: CollisionType.Active
        })

        this.scoreUI = scoreUI
        this.livesUI = livesUI

        this.startPosition = new Vector(200, 500)
        this.hasGameOver = false
        this.hasWon = false
        this.canTakeDamage = true
        this.isGrounded = false
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Toki.toSprite())
        this.scale = new Vector(0.4, 0.4)

        // extra safety (GitHub Pages input focus fix)
        engine.canvas.tabIndex = 1
        engine.canvas.focus()
        engine.input.keyboard.enabled = true
    }

    onPreUpdate(engine, delta) {
        this.vel.x = 0

        const kb = engine.input.keyboard

        // LEFT
        if (kb.isHeld(Keys.A)) {
            this.vel.x = -250
            this.scale.x = -0.4
        }

        // RIGHT
        if (kb.isHeld(Keys.D)) {
            this.vel.x = 250
            this.scale.x = 0.4
        }

        // ✅ FIX: jump werkt altijd (geen grounded check meer)
        if (kb.wasPressed(Keys.Space)) {
            this.vel.y = -1000
        }

        this.checkGrounded(engine)
        this.checkOrbPickup(engine)
        this.checkGuardCollision(engine)
        this.checkWhispGoal(engine)
        this.checkFallDeath(engine)
    }

    checkGrounded(engine) {
        this.isGrounded = false

        for (let actor of engine.currentScene.actors) {
            if (
                actor.constructor.name === "SmallPlatform" ||
                actor.constructor.name === "MediumPlatform" ||
                actor.constructor.name === "LargePlatform"
            ) {
                const distanceX = Math.abs(this.pos.x - actor.pos.x)
                const distanceY = Math.abs(this.pos.y - actor.pos.y)

                const standingOnTop = this.pos.y < actor.pos.y
                const closeEnoughX = distanceX < actor.width / 2 + 30
                const closeEnoughY = distanceY < 200

                if (
                    standingOnTop &&
                    closeEnoughX &&
                    closeEnoughY &&
                    this.vel.y >= -10
                ) {
                    this.isGrounded = true
                }
            }
        }
    }

    checkOrbPickup(engine) {
        for (let actor of engine.currentScene.actors) {
            if (actor.name === "orb" && actor.collected === false) {
                const distanceX = Math.abs(this.pos.x - actor.pos.x)
                const distanceY = Math.abs(this.pos.y - actor.pos.y)

                if (distanceX < 80 && distanceY < 120) {
                    actor.collected = true
                    actor.kill()

                    if (this.scoreUI) {
                        this.scoreUI.addScore(1)
                    }
                }
            }
        }
    }

    checkGuardCollision(engine) {
        for (let actor of engine.currentScene.actors) {
            if (actor.name === "guard" && actor.defeated === false) {
                const distanceX = Math.abs(this.pos.x - actor.pos.x)
                const distanceY = Math.abs(this.pos.y - actor.pos.y)

                if (distanceX < 70 && distanceY < 130) {

                    const tokiIsFalling = this.vel.y > 0
                    const tokiIsAboveGuard = this.pos.y < actor.pos.y - 20

                    if (tokiIsFalling && tokiIsAboveGuard) {
                        actor.defeated = true
                        actor.kill()

                        this.vel.y = -350

                        if (this.scoreUI) {
                            this.scoreUI.addScore(2)
                        }

                        return
                    }

                    if (this.canTakeDamage) {
                        this.loseLife(engine)
                    }
                }
            }
        }
    }

    checkWhispGoal(engine) {
        if (this.hasWon) return

        for (let actor of engine.currentScene.actors) {
            if (actor.name === "whisp") {
                const distanceX = Math.abs(this.pos.x - actor.pos.x)
                const distanceY = Math.abs(this.pos.y - actor.pos.y)

                if (distanceX < 100 && distanceY < 160) {
                    this.hasWon = true
                    engine.goToScene("win")
                }
            }
        }
    }

    checkFallDeath(engine) {
        if (this.pos.y > 850 && this.hasGameOver === false) {
            this.loseLife(engine)
        }
    }

    loseLife(engine) {
        this.canTakeDamage = false

        if (this.livesUI) {
            this.livesUI.loseLife()

            if (this.livesUI.lives <= 0) {
                this.hasGameOver = true
                engine.goToScene("gameover")
                return
            }
        }

        this.respawn()

        setTimeout(() => {
            this.canTakeDamage = true
        }, 1000)
    }

    respawn() {
        this.pos = this.startPosition.clone()
        this.vel = new Vector(0, 0)
        this.isGrounded = false
    }
}