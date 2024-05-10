import "./3DEnv.scss";

export interface Env3DProps{
    children: any
}
export const Env3D = (props: Env3DProps) => {
    return (
        <div className={"Env3D"}>
            {props.children}
        </div>
    )
}

export interface PianoCamera3DProps{
    children: any,
    posizioneX: number,
    posizioneY: number,
    posizioneZ: number,
    rotazioneX: number,
    rotazioneY: number,
    rotazioneZ: number
}
export const PianoCamera3D = (props: PianoCamera3DProps) => {
    return (
        <div
            style={{
                transform: `
                    translateX(-50%)
                    translateY(-50%)
                    translateZ(1200px)
                    
                    translateX(${props.posizioneX}px)
                    translateY(-${props.posizioneY}px)
                    translateZ(${-props.posizioneZ}px)
                    rotateX(${90 - props.rotazioneX}deg)
                    rotateY(${props.rotazioneZ}deg)
                    rotateZ(${props.rotazioneY}deg)
                `
            }}
            className={"PianoCamera3D"}>
            {props.children}
        </div>
    )
}

export interface Group3DProps{
    children: any,
    posizioneX: number,
    posizioneY: number,
    posizioneZ: number,
    rotazioneX: number,
    rotazioneY: number,
    rotazioneZ: number
}
export const Group3D = (props: Group3DProps) => {
    return (
        <div
            style={{
                transform: `
                    translateX(-50%)
                    translateY(-50%)
                    
                    translateX(${props.posizioneX}px)
                    translateY(${-props.posizioneZ}px)
                    translateZ(${props.posizioneY}px)
                    
                    rotateX(${props.rotazioneX}deg)
                    rotateY(${props.rotazioneZ}deg)
                    rotateZ(${props.rotazioneY}deg)
                `
            }}
            className={"Group3D"}>
            {props.children}
        </div>
    )
}
