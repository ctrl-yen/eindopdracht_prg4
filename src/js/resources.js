import { ImageSource, Sound, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/background.png'),
    Toki: new ImageSource('images/toki.png'),
    SmallPlatform: new ImageSource('images/platformS.png'),
    MediumPlatform: new ImageSource('images/platformM.png'),
    LargePlatform: new ImageSource('images/platformL.png'),
    Guard: new ImageSource('images/guard.png'),
    Sphere: new ImageSource('images/sphere.png'),
    Whisp: new ImageSource('images/whisp.png'),
    Gameover: new ImageSource('images/gameover.png')
}

const ResourceLoader = new Loader()

for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }