import {Group3D} from "../CoreComponents/3DEnv/3DEnv";
import {Block} from "../CoreComponents/Block/Block";
import ResourceManager from "../Resources/ResourceManager";
import {LightBulb} from "./LightBulb/LightBulb";

export interface TorciaProps{
    posizioneX: number,
    posizioneY: number,
    posizioneZ: number,
    rotazioneY: number
}
export const Torcia = (props: TorciaProps) => {
    const altezzaTorcia = 8;
    const altezzaTorciaMezzi = Math.round(altezzaTorcia * 0.5);

    return (
        <Group3D
            posizioneX={props.posizioneX}
            posizioneY={props.posizioneY}
            posizioneZ={props.posizioneZ}
            rotazioneX={0}
            rotazioneY={props.rotazioneY}
            rotazioneZ={0}>
            <Group3D
                posizioneX={0}
                posizioneY={0}
                posizioneZ={0}
                rotazioneX={0}
                rotazioneY={0}
                rotazioneZ={20}>
                <Block
                    larghezza={2}
                    lunghezza={2}
                    altezza={altezzaTorcia}
                    rotazioneY={0}
                    rotazioneX={0}
                    rotazioneZ={0}
                    posizioneX={0}
                    posizioneY={altezzaTorciaMezzi}
                    posizioneZ={0}
                    trasparenza={0}
                    immagini={{
                        left: ResourceManager.Textures().Legno,
                        right: ResourceManager.Textures().Legno,
                        front: ResourceManager.Textures().Legno,
                        back: ResourceManager.Textures().Legno,
                    }}
                    colore={'brown'}/>
                <Block
                    larghezza={2}
                    lunghezza={2}
                    altezza={2}
                    rotazioneY={0}
                    rotazioneX={0}
                    rotazioneZ={0}
                    posizioneX={0}
                    posizioneY={altezzaTorcia + 1}
                    posizioneZ={0}
                    trasparenza={0.5}
                    immagini={{
                        left: ResourceManager.Textures().Yellow,
                        right: ResourceManager.Textures().Yellow,
                        front: ResourceManager.Textures().Yellow,
                        back: ResourceManager.Textures().Yellow,
                        top: ResourceManager.Textures().Yellow,
                        bottom: ResourceManager.Textures().Yellow,
                    }}
                    colore={'rgb(254, 222, 23)'}/>
                <LightBulb
                    posizioneX={0}
                    posizioneY={altezzaTorcia + 1}
                    posizioneZ={0}
                    rotazioneY={0}
                    raggio={120}/>
            </Group3D>
        </Group3D>
    )
}
