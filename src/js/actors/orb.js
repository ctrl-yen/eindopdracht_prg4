import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Orb extends Actor {

    constructor(x, y) {
        super({
            x,
            y,
            width: 64,
            height: 64,
            collisionType: CollisionType.PreventCollision
        })

        this.name = "orb"
        this.collected = false

        // Bewaar de originele hoogte
        this.startY = y

        // Willekeurige offset zodat niet alle orbs tegelijk bewegen
        this.timeOffset = Math.random() * Math.PI * 2
    }

    onInitialize(engine) {
        const sprite = Resources.Sphere.toSprite()
        sprite.scale = new Vector(0.8, 0.8)

        this.graphics.use(sprite)
    }

    onPreUpdate(engine, delta) {
        // Tijd in seconden
        const time = performance.now() / 1000

        // Hover 10 pixels op en neer
        this.pos.y = this.startY + Math.sin(time * 2 + this.timeOffset) * 10
    }
}