import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Guard extends Actor {

    constructor(x, y, leftBound, rightBound) {
        super({
            x,
            y,
            width: 80,
            height: 80,
            collisionType: CollisionType.PreventCollision
        })

        this.name = "guard"
        this.leftBound = leftBound
        this.rightBound = rightBound
        this.direction = 1
        this.speed = 100
        this.defeated = false
    }

    onInitialize(engine) {
        const sprite = Resources.Guard.toSprite()
        sprite.scale = new Vector(0.4, 0.4)

        this.graphics.use(sprite)
    }

    onPreUpdate(engine, delta) {
        this.vel.x = this.speed * this.direction

        if (this.pos.x <= this.leftBound) {
            this.direction = 1
        }

        if (this.pos.x >= this.rightBound) {
            this.direction = -1
        }
    }
}