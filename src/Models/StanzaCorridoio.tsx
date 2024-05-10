import {Group3D} from "../CoreComponents/3DEnv/3DEnv";
import React from "react";
import {Plane} from "../CoreComponents/Plane/Plane";
import {DimensionePorta, MuroLungoConPorta} from "./MuroLungoConPorta";
import ResourceManager from "../Resources/ResourceManager";
import {SpessoreMuro} from "./Muro";
import {StanzaProps} from "./Stanza";
import {Corridoio} from "./Corridoio";

export const StanzaCorridoio = (props: StanzaProps) => {
    const stanzaMezzi = Math.round(props.dimensione * 0.5);
    const spessoreMezzi = Math.round(SpessoreMuro * 0.5);
    const lunghezzaCorridoioOrizzonale = Math.round((props.dimensione - DimensionePorta) * 0.5);
    const lunghezzaCorridoioVerticale = lunghezzaCorridoioOrizzonale - SpessoreMuro;

    return (
        <Group3D
            posizioneX={props.posizioneX}
            posizioneY={0}
            posizioneZ={props.posizioneZ}
            rotazioneX={0}
            rotazioneY={0}
            rotazioneZ={0}>
            <Plane
                larghezza={DimensionePorta + SpessoreMuro * 2}
                lunghezza={DimensionePorta + SpessoreMuro * 2}
                rotazioneY={0}
                rotazioneX={0}
                rotazioneZ={0}
                posizioneX={0}
                posizioneY={0}
                posizioneZ={0}
                trasparenza={0}
                immagine={ResourceManager.Textures().TerrenoDrago}
                colore={"gray"}/>
            <Corridoio
                posizioneX={0}
                posizioneZ={DimensionePorta + spessoreMezzi}
                rotazioneY={180}
                lunghezza={lunghezzaCorridoioVerticale}
                altezza={50}
                chiuso={false}
                nascondiLuci={true}/>
            <Corridoio
                posizioneX={0}
                posizioneZ={-DimensionePorta - spessoreMezzi}
                rotazioneY={0}
                lunghezza={lunghezzaCorridoioVerticale}
                altezza={50}
                chiuso={false}
                nascondiLuci={true}/>
            <Corridoio
                posizioneX={DimensionePorta}
                posizioneZ={0}
                rotazioneY={90}
                lunghezza={lunghezzaCorridoioOrizzonale}
                altezza={50}
                chiuso={false}
                nascondiLuci={true}/>
            <Corridoio
                posizioneX={-DimensionePorta}
                posizioneZ={0}
                rotazioneY={270}
                lunghezza={lunghezzaCorridoioOrizzonale}
                altezza={50}
                chiuso={false}
                nascondiLuci={true}/>
        </Group3D>
    )
}
