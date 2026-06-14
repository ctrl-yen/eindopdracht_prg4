import { Platform } from "./platform.js";
import { Resources } from "../resources.js";

export class MediumPlatform extends Platform {
    constructor(x, y) {
        super(
            x,
            y,
            300,
            40,
            Resources.MediumPlatform
        )
    }
}