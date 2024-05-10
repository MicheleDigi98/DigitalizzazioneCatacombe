import {Block} from "../CoreComponents/Block/Block";
import React from "react";
import ResourceManager from "../Resources/ResourceManager";

export const SpessoreMuro = 6;

export interface MuroProps{
    posizioneX: number,
    posizioneZ: number,
    rotazioneY: number
    lunghezzaMuro: number,
    altezzaMuro: number,
    trasparenza: number
}

export const Muro = (props: MuroProps) => {
    return (
        <Block
            posizioneX={props.posizioneX}
            posizioneY={Math.round(props.altezzaMuro * 0.5)}
            posizioneZ={props.posizioneZ}
            rotazioneZ={0}
            rotazioneX={0}
            rotazioneY={props.rotazioneY}
            altezza={props.altezzaMuro}
            larghezza={SpessoreMuro}
            lunghezza={props.lunghezzaMuro}
            trasparenza={props.trasparenza}
            immagini={{
                left: ResourceManager.Textures().MuroErba,
                right: ResourceManager.Textures().MuroErba,
                top: ResourceManager.Textures().MuroGrezzo,
                bottom: ResourceManager.Textures().MuroGrezzo,
                front: ResourceManager.Textures().MuroErba,
                back: ResourceManager.Textures().MuroErba
            }}
            colore={"gray"}/>
    )
}
