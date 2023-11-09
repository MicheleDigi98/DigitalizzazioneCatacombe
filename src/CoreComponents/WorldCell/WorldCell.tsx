import ResourceManager from "../../Resources/ResourceManager";
import "./WorldCell.scss";
import Camera from "../Camera/Camera";
import {createRef, RefObject, useEffect, useState} from "react";
import {calcPositionFromCamera} from "../Utils/CommonFunctions";

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
    puntiAdiacenti: PuntiModel,
    puntiAperti: PuntiModel,
    tipoCella: TipoCella
}

export interface WorldCellProps extends WorldCellModel{
    camera: Camera,
    puntiAperti: PuntiModel
}
export const WorldCell = (props: WorldCellProps) => {
    const rotationX = Math.abs(props.posY) % 2 === 0 ? 180 : 0;
    const rotationY = Math.abs(props.posX) % 2 === 0 ? 180 : 0

    const [fromCameraPosition, setFromCameraPosition] = useState<{posX: number, posY: number}>({posX: 0, posY: 0});

    useEffect(() => {
        setFromCameraPosition(calcPositionFromCamera(props.posX, props.posY, props.camera));
    }, [props.posX, props.posY, props.camera])

    return (
        <div
            className={"WorldCell"}
            style={{
                left: `${fromCameraPosition.posX}px`,
                top: `${fromCameraPosition.posY}px`,
                transform: `translateX(-50%) translateY(-50%)`,
                minWidth: `${props.camera.cellSize * props.camera.zoom}px`,
                width: `${props.camera.cellSize * props.camera.zoom}px`
            }}>
            <div
                style={{
                    transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                    backgroundImage: `url(${props.fullCell ? ResourceManager.Cells().FullCell : ResourceManager.Cells().EmptyCell})`
                }}
                className={"WorldCellImage"}/>
            <StanzaCentrale corridoio={props.fullCell}/>
            <Corridoio rotazioneZ={-90} aperto={props.puntiAperti.left}/>
            <Corridoio rotazioneZ={0} aperto={props.puntiAperti.top}/>
            <Corridoio rotazioneZ={90} aperto={props.puntiAperti.right}/>
            <Corridoio rotazioneZ={180} aperto={props.puntiAperti.bottom}/>

            {
                ( props.tipoCella === 'curativa' || (props.posX === 0 && props.posY === 0) ) &&
                <StanzaMultiframe
                    immagine={ResourceManager.Rooms().StanzaCurativa}
                    numeroFrame={3}
                    updateTime={500}
                    camera={props.camera}/>
            }
            {
                props.tipoCella === 'teletrasporto' &&
                <StanzaMultiframe
                    immagine={ResourceManager.Rooms().StanzaTeletrasporto}
                    numeroFrame={3}
                    updateTime={500}
                    camera={props.camera}/>
            }


            <CellaNonAdiacenteEffect rotazioneZ={-90} visibile={!props.puntiAdiacenti.left}/>
            <CellaNonAdiacenteEffect rotazioneZ={0} visibile={!props.puntiAdiacenti.top}/>
            <CellaNonAdiacenteEffect rotazioneZ={90} visibile={!props.puntiAdiacenti.right}/>
            <CellaNonAdiacenteEffect rotazioneZ={180} visibile={!props.puntiAdiacenti.bottom}/>
        </div>
    )
}

export interface CellaNonAdiacenteEffectProps {
    rotazioneZ: number,
    visibile: boolean
}
export const CellaNonAdiacenteEffect = (props: CellaNonAdiacenteEffectProps) => {
    return (
        <div
            style={{
                transform: `rotateZ(${props.rotazioneZ}deg)`,
                display: `${props.visibile ? 'block' : 'none'}`
            }}
            className={"CellaNonAdiacente"}/>
    )
}

export interface StanzaCentraleProps{
    corridoio: boolean
}
export const StanzaCentrale = (props: StanzaCentraleProps) => {
    return (
        <div
            style={{
                backgroundImage: `url(${props.corridoio ? ResourceManager.Rooms().Corridoio : ResourceManager.Rooms().Stanza})`
            }}
            className={"StanzaCentrale"}/>
    )
}

export interface CorridoioProps{
    rotazioneZ: number,
    aperto: boolean
}
export const Corridoio = (props: CorridoioProps) => {
    return (
        <div
            style={{
                transform: `rotateZ(${props.rotazioneZ}deg)`,
            }}
            className={"Corridoio"}>
            <div
                style={{
                    backgroundImage: `url(${props.aperto ? ResourceManager.Rooms().PiccoloCorridoio : ResourceManager.Rooms().PiccoloMuro})`
                }}
                className={"ImmagineCorridoio"}/>
        </div>
    )
}

export interface StanzaMultiFrameProps{
    immagine: string,
    numeroFrame: number,
    updateTime: number,
    camera: Camera
}
export const StanzaMultiframe = (props: StanzaMultiFrameProps) => {
    const [currentFrame, setFrame] = useState<number>(0);

    useEffect(() => {
        const refreshInterval = window.setInterval(() => {
            setFrame(frame => frame + 1 === props.numeroFrame ? 0 : frame + 1);
        }, props.updateTime);

        return () => {
            window.clearInterval(refreshInterval);
        }
    }, [])

    /**
     * Calcola lo scroll dell'immagine
     */
    const calcScroll = (): number => {
        return -(props.camera.cellSize * props.camera.zoom * 0.5 * currentFrame);
    }

    return (
        <div
            className={"StanzaMultiFrame"}>
            <img
                style={{
                    left: `${calcScroll()}px`
                }}
                className={"MultiFrameImage"}
                src={props.immagine}/>
        </div>
    )
}
