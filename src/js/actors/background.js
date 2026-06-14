import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Background extends Actor {

    constructor(x) {
        super({
            x,
            y: 360,
            collisionType: CollisionType.PreventCollision
        })

        this.startX = x
    }

    onInitialize(engine) {
        const sprite = Resources.Background.toSprite()
        sprite.scale = new Vector(4, 4)

        this.graphics.use(sprite)

        this.z = -1000
    }

    onPreUpdate(engine, delta) {
        this.pos.x = this.startX + engine.currentScene.camera.pos.x * 0.25
        this.pos.y = 360
    }
}