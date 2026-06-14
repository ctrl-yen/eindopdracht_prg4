import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Whisp extends Actor {

    constructor(x, y) {
        super({
            x,
            y,
            width: 100,
            height: 140,
            collisionType: CollisionType.PreventCollision
        })

        this.name = "whisp"

        // Bewaar de originele hoogte
        this.startY = y

        // Willekeurige offset zodat de beweging natuurlijk oogt
        this.timeOffset = Math.random() * Math.PI * 2
    }

    onInitialize(engine) {
        const sprite = Resources.Whisp.toSprite()
        sprite.scale = new Vector(0.4, 0.4)

        this.graphics.use(sprite)
    }

    onPreUpdate(engine, delta) {
        const time = performance.now() / 1000

        // Langzame hover beweging
        this.pos.y = this.startY + Math.sin(time * 1.5 + this.timeOffset) * 15
    }
}