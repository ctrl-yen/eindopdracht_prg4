import { Platform } from "./platform.js";
import { Resources } from "../resources.js";

export class SmallPlatform extends Platform {
    constructor(x, y) {
        super(
            x,
            y,
            190,
            40,
            Resources.SmallPlatform
        )
    }
}