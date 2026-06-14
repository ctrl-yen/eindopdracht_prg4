import { Actor, CollisionType, Color } from "excalibur"

export class DeathBarrier extends Actor {

    constructor(x, y, width, height) {
        super({
            x,
            y,
            width,
            height,
            color: Color.Red,
            collisionType: CollisionType.PreventCollision
        })

        this.name = "deathbarrier"
    }
}