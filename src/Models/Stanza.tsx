import {Group3D} from "../CoreComponents/3DEnv/3DEnv";
import React from "react";
import {Plane} from "../CoreComponents/Plane/Plane";
import {MuroLungoConPorta} from "./MuroLungoConPorta";
import ResourceManager from "../Resources/ResourceManager";
import {SpessoreMuro} from "./Muro";

export interface StanzaProps{
    posizioneX: number,
    posizioneZ: number,
    dimensione: number,
    altezza: number
}
export const Stanza = (props: StanzaProps) => {
    const stanzaMezzi = Math.round(props.dimensione * 0.5);
    const spessoreMezzi = Math.round(SpessoreMuro * 0.5);

    return (
        <Group3D
            posizioneX={props.posizioneX}
            posizioneY={0}
            posizioneZ={props.posizioneZ}
            rotazioneX={0}
            rotazioneY={0}
            rotazioneZ={0}>
            <Plane
                larghezza={props.dimensione}
                lunghezza={props.dimensione}
                rotazioneY={0}
                rotazioneX={0}
                rotazioneZ={0}
                posizioneX={0}
                posizioneY={0}
                posizioneZ={0}
                trasparenza={0}
                immagine={ResourceManager.Textures().TerrenoDrago}
                colore={"gray"}/>
            <MuroLungoConPorta
                posizioneX={0}
                posizioneZ={stanzaMezzi - spessoreMezzi}
                rotazioneY={90}
                lunghezzaMuro={props.dimensione}
                altezzaMuro={props.altezza}/>
            <MuroLungoConPorta
                posizioneX={-stanzaMezzi + spessoreMezzi}
                posizioneZ={0}
                rotazioneY={0}
                lunghezzaMuro={props.dimensione}
                altezzaMuro={props.altezza}/>
            <MuroLungoConPorta
                posizioneX={stanzaMezzi - spessoreMezzi}
                posizioneZ={0}
                rotazioneY={0}
                lunghezzaMuro={props.dimensione}
                altezzaMuro={props.altezza}/>
            <MuroLungoConPorta
                posizioneX={0}
                posizioneZ={-stanzaMezzi + spessoreMezzi}
                rotazioneY={270}
                lunghezzaMuro={props.dimensione}
                altezzaMuro={props.altezza}/>
        </Group3D>
    )
}
