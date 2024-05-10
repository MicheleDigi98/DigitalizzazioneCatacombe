import {Group3D} from "../CoreComponents/3DEnv/3DEnv";
import {Plane} from "../CoreComponents/Plane/Plane";
import ResourceManager from "../Resources/ResourceManager";
import {Muro, SpessoreMuro} from "./Muro";
import {DimensionePorta} from "./MuroLungoConPorta";
import {Torcia} from "./Torcia";
import {Fragment} from "react";

export interface CorridoioProps{
    posizioneX: number,
    posizioneZ: number,
    rotazioneY: number,
    lunghezza: number,
    altezza: number,
    chiuso: boolean,
    nascondiLuci?: boolean,
    rimuoviEffettiTrasparenza?: boolean
}
export const Corridoio = (props: CorridoioProps) => {
    const larghezza = DimensionePorta + (SpessoreMuro * 2)
    const larghezzaMezzi = Math.round(larghezza * 0.5);
    const lunghezzaMezzi = Math.round(props.lunghezza * 0.5);
    const spessoreMezzi = Math.round(SpessoreMuro * 0.5);

    let trasparenza1 = props.rotazioneY === 0 ?
        1 : props.rotazioneY === 90 ?
            0 : props.rotazioneY === 180 ?
                0 : 1 ;
    let trasparenza2 = props.rotazioneY === 0 ?
        1 : props.rotazioneY === 90 ?
            1 : props.rotazioneY === 180 ?
                0 : 0 ;

    if(props.rimuoviEffettiTrasparenza){
        trasparenza1 = 0;
        trasparenza2 = 0;
    }

    return (
        <Group3D
            posizioneX={props.posizioneX}
            posizioneY={0}
            posizioneZ={props.posizioneZ}
            rotazioneX={0}
            rotazioneY={props.rotazioneY}
            rotazioneZ={0}>
            <Plane
                larghezza={larghezza}
                lunghezza={props.lunghezza}
                rotazioneY={0}
                rotazioneX={0}
                rotazioneZ={0}
                posizioneX={0}
                posizioneY={0}
                posizioneZ={0}
                trasparenza={0}
                immagine={ResourceManager.Textures().Pavimento}
                colore={"gray"}/>
            <Muro
                posizioneX={-larghezzaMezzi + spessoreMezzi}
                posizioneZ={0}
                rotazioneY={0}
                lunghezzaMuro={props.lunghezza}
                altezzaMuro={props.altezza}
                trasparenza={trasparenza1}/>
            <Muro
                posizioneX={larghezzaMezzi - spessoreMezzi}
                posizioneZ={0}
                rotazioneY={0}
                lunghezzaMuro={props.lunghezza}
                altezzaMuro={props.altezza}
                trasparenza={trasparenza2}/>
            {
                !props.nascondiLuci &&
                <Fragment>
                    <Torcia
                        posizioneX={-larghezzaMezzi + spessoreMezzi + 2}
                        posizioneY={props.altezza - 25}
                        posizioneZ={0}
                        rotazioneY={0}/>
                    <Torcia
                        posizioneX={larghezzaMezzi - spessoreMezzi - 2}
                        posizioneY={props.altezza - 25}
                        posizioneZ={0}
                        rotazioneY={180}/>
                </Fragment>
            }
            {
                props.chiuso &&
                <Muro
                    posizioneX={lunghezzaMezzi - spessoreMezzi}
                    posizioneZ={0}
                    rotazioneY={90}
                    lunghezzaMuro={larghezza}
                    altezzaMuro={props.altezza}
                    trasparenza={0}/>
            }
        </Group3D>
    )
}
