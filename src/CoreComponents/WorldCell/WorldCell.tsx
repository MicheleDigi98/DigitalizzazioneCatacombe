import ResourceManager from "../../Resources/ResourceManager";
import "./WorldCell.scss";
import Camera from "../Camera/Camera";
import React, {Fragment, useEffect, useState} from "react";
import {calcPositionFromCamera} from "../Utils/CommonFunctions";
import {Corridoio} from "../../Models/Corridoio";
import {Stanza} from "../../Models/Stanza";
import {Group3D} from "../3DEnv/3DEnv";
import {Main} from "../../Main/Main";
import {StanzaCorridoio} from "../../Models/StanzaCorridoio";
import {PiscinaCurativa} from "../../Models/PiscinaCurativa";

export interface PuntiModel{
    left: boolean,
    top: boolean,
    right: boolean,
    bottom: boolean
}
export const PuntiGenerator = (left: boolean, top: boolean, right: boolean, bottom: boolean): PuntiModel => {
    return {left, top, right, bottom};
}

export type TipoCella = "normale" | "curativa" | "teletrasporto";

export interface WorldCellModel{
    uID: number,
    posX: number,
    posY: number,
    fullCell: boolean,
    puntiAperti: PuntiModel,
    tipoCella: TipoCella
}

export interface WorldCellProps extends WorldCellModel{
    camera: Camera,
    puntiAperti: PuntiModel
}
export const WorldCell = (props: WorldCellProps) => {
    const dimensioneStanza = 150;
    const dimensionePiscina = 50;
    const dimensioneCorridoio = 80;

    const [fromCameraPosition, setFromCameraPosition] = useState<{posX: number, posY: number}>({posX: 0, posY: 0});

    useEffect(() => {
        const cellSize = dimensioneStanza + (dimensioneCorridoio * 2);
        const cameraX = props.camera.posX * cellSize;
        const cameraY = props.camera.posY * cellSize;

        const cellX = props.posX * cellSize;
        const cellY = props.posY * cellSize;

        setFromCameraPosition({posX: cellX - cameraX, posY: cellY - cameraY});
    }, [props.posX, props.posY, props.camera])

    return (
        Math.abs(fromCameraPosition.posX) < 500 &&
        Math.abs(fromCameraPosition.posY) < 500 &&
        <Group3D
            posizioneX={fromCameraPosition.posX}
            posizioneY={0}
            posizioneZ={-fromCameraPosition.posY}
            rotazioneX={0}
            rotazioneY={0}
            rotazioneZ={0}>
            <Corridoio
                posizioneX={- ((dimensioneStanza + dimensioneCorridoio) * 0.5)}
                posizioneZ={0}
                rotazioneY={90}
                lunghezza={dimensioneCorridoio}
                altezza={50}
                chiuso={!props.puntiAperti.left}/>
            <Corridoio
                posizioneX={0}
                posizioneZ={(dimensioneStanza + dimensioneCorridoio) * 0.5}
                rotazioneY={180}
                lunghezza={dimensioneCorridoio}
                altezza={50}
                chiuso={!props.puntiAperti.top}/>
            <Corridoio
                posizioneX={(dimensioneStanza + dimensioneCorridoio) * 0.5}
                posizioneZ={0}
                rotazioneY={270}
                lunghezza={dimensioneCorridoio}
                altezza={50}
                chiuso={!props.puntiAperti.right}/>
            <Corridoio
                posizioneX={0}
                posizioneZ={-((dimensioneStanza + dimensioneCorridoio) * 0.5)}
                rotazioneY={0}
                lunghezza={dimensioneCorridoio}
                altezza={50}
                chiuso={!props.puntiAperti.bottom}/>
            {
                props.fullCell ?
                <StanzaCorridoio
                    posizioneX={0}
                    posizioneZ={0}
                    dimensione={dimensioneStanza}
                    altezza={50}/> :
                <Stanza
                    posizioneX={0}
                    posizioneZ={0}
                    dimensione={dimensioneStanza}
                    altezza={50}/>
            }
            {
                !props.fullCell && (props.tipoCella === "curativa" || (props.posX === 0 && props.posY === 0)) &&
                <PiscinaCurativa
                    posizioneX={0}
                    posizioneZ={0}
                    dimensione={dimensionePiscina}
                    altezza={30}
                    ridotta={props.posX === 0 && props.posY === 0}/>
            }

        </Group3D>
    )
}
