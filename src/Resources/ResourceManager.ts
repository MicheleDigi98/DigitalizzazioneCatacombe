import emptyCell from './Cells/EmptyCell.png';
import fullCell from './Cells/FullCell.png';
import corridoio from './Rooms/Corridoio.png';
import stanza from './Rooms/Stanza.png';
import piccoloCorridoio from './Rooms/PiccoloCorridoio.png';
import piccoloMuro from './Rooms/PiccoloMuro.png';
import stanzaCurativa from './Rooms/StanzaCurativa.png';
import stanzaTeletrasporto from './Rooms/StanzaTeletrasporto.png';
import blueCave from './Backgrounds/BlueCave.jpg';
import darkCave from './Backgrounds/DarkCave.jpg';
import skybox from './Backgrounds/SkyBox.png';
import pippo from './Personaggi/Pippo.png';

export default class ResourceManager{
    public static Cells() {
        return{
            EmptyCell: emptyCell,
            FullCell: fullCell
        }
    }

    public static Rooms(){
        return{
            Corridoio: corridoio,
            Stanza: stanza,
            PiccoloCorridoio: piccoloCorridoio,
            PiccoloMuro: piccoloMuro,
            StanzaCurativa: stanzaCurativa,
            StanzaTeletrasporto: stanzaTeletrasporto
        }
    }

    public static Backgrounds(){
        return{
            BlueCave: blueCave,
            DarkCave: darkCave,
            SkyBox: skybox,
        }
    }

    public static Personaggi(){
        return{
            Pippo: pippo
        }
    }
}
