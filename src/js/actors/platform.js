import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from "../resources"

export class Platform extends Actor {
    constructor(x, y, width, height, sprite) {
        super({
            x: x,
            y: y,
            width: width,
            height: height,
            collisionType: CollisionType.Fixed
        })

        this.sprite = sprite
    }

    onInitialize(engine) {
        const sprite = this.sprite.toSprite()
        sprite.scale = new Vector(0.1, 0.1)

        this.graphics.use(sprite)
    }

}