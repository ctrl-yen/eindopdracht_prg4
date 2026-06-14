import { Platform } from "./platform.js";
import { Resources } from "../resources.js";

export class LargePlatform extends Platform {
    constructor(x, y) {
        super(
            x,
            y,
            600,
            40,
            Resources.LargePlatform
        )
    }
}