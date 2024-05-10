import {Muro, MuroProps} from "./Muro";
import {Group3D} from "../CoreComponents/3DEnv/3DEnv";
import React from "react";

export const DimensionePorta = 50;

export const MuroLungoConPorta = (props: Omit<MuroProps, "trasparenza">) => {
    const lunghezzaMezzi = Math.round(props.lunghezzaMuro * 0.5);
    const lunghezzaSingolo = Math.round((props.lunghezzaMuro - DimensionePorta) * 0.5);
    const singoloMezzi = Math.round(lunghezzaSingolo * 0.5);

    const trasparenza1 = props.rotazioneY === 0 ? 0 : props.rotazioneY === 90 ? 0 : 1;
    const trasparenza2 = props.rotazioneY === 0 ? 1 : props.rotazioneY === 90 ? 0 : 1;

    return (
        <Group3D
            posizioneX={props.posizioneX}
            posizioneY={0}
            posizioneZ={props.posizioneZ}
            rotazioneX={0}
            rotazioneY={props.rotazioneY}
            rotazioneZ={0}>
            <Muro
                posizioneX={0}
                posizioneZ={lunghezzaMezzi - singoloMezzi}
                rotazioneY={0}
                lunghezzaMuro={lunghezzaSingolo}
                altezzaMuro={props.altezzaMuro}
                trasparenza={trasparenza1}/>
            <Muro
                posizioneX={0}
                posizioneZ={-lunghezzaMezzi + singoloMezzi}
                rotazioneY={0}
                lunghezzaMuro={lunghezzaSingolo}
                altezzaMuro={props.altezzaMuro}
                trasparenza={trasparenza2}/>
        </Group3D>
    )
}
