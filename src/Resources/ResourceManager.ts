import MuroGrezzo from './Textures/MuroGrezzo.png';
import TerrenoDrago from './Textures/TerrenoDrago2.png';
import Pavimento from './Textures/Pavimento.png';
import MuroErba from './Textures/MuroErba.png';
import Legno from './Textures/Legno.png';
import Yellow from './Textures/Yellow.jpg';
import Cuore from './Textures/Cuore.png';
import Muretto from './Textures/Muretto.png';
import BlueCave from './Backgrounds/BlueCave.jpg';
import DarkCave from './Backgrounds/DarkCave.jpg';
import Skybox from './Backgrounds/SkyBox.png';
import Pippo from './Personaggi/Pippo.png';

export default class ResourceManager{
    public static Textures() {
        return{
            MuroGrezzo,
            TerrenoDrago,
            MuroErba,
            Pavimento,
            Legno,
            Cuore,
            Yellow,
            Muretto
        }
    }

    public static Backgrounds(){
        return{
            BlueCave,
            DarkCave,
            Skybox
        }
    }

    public static Personaggi(){
        return{
            Pippo
        }
    }
}
