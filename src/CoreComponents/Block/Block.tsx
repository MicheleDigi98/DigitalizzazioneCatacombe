import './Block.scss';

export interface BlockImages {
    left?: string,
    right?: string,
    top?: string,
    bottom?: string,
    front?: string,
    back?: string
}

export interface BlockProps {
    larghezza: number,
    lunghezza: number,
    altezza: number,
    rotazioneY: number,
    rotazioneX: number,
    rotazioneZ: number,
    posizioneX: number,
    posizioneY: number,
    posizioneZ: number,
    trasparenza: number,
    immagini: BlockImages,
    colore: string
}
export const Block = (props: BlockProps) => {
    return (
        <div
            style={{
                width: props.larghezza,
                height: props.lunghezza,
                transform: `
                    translateX(-50%)
                    translateY(-50%)
                    rotateX(${props.rotazioneX}deg)
                    rotateZ(${props.rotazioneY}deg)
                    rotateY(${props.rotazioneZ}deg)
                    translateX(${props.posizioneX}px) 
                    translateY(${-props.posizioneZ}px)
                    translateZ(${props.posizioneY}px)`,
            }}
            className={"Block"}>
            <span
                style={{
                    width: props.altezza,
                    backgroundColor: `${props.colore}`,
                    opacity: 1 - props.trasparenza
                }}
                className={"SezioneLaterale Right"}>
                <span
                    className={"Immagine"}
                    style={{
                        width: `${props.lunghezza}px`,
                        height: `${props.altezza}px`,
                        maxWidth: `${props.lunghezza}px`,
                        maxHeight: `${props.altezza}px`,
                        backgroundImage: props.immagini.right ? `url(${props.immagini.right})` : undefined,
                        transform: "translateX(-50%) translateY(-50%) rotateZ(270deg)"
                    }}/>
            </span>
            <span
                style={{
                    width: props.altezza,
                    backgroundColor: `${props.colore}`,
                    opacity: 1 - props.trasparenza
                }}
                className={"SezioneLaterale Left"}>
                <span
                    className={"Immagine"}
                    style={{
                        width: `${props.lunghezza}px`,
                        height: `${props.altezza}px`,
                        maxWidth: `${props.lunghezza}px`,
                        maxHeight: `${props.altezza}px`,
                        backgroundImage: props.immagini.left ? `url(${props.immagini.left})` : undefined,
                        transform: "translateX(-50%) translateY(-50%) rotateZ(270deg)"
                    }}/>
            </span>
            <span
                style={{
                    height: props.altezza,
                    backgroundColor: `${props.colore}`,
                    opacity: 1 - props.trasparenza
                }}
                className={"SezioneLaterale Front"}>
                <span
                    className={"Immagine"}
                    style={{
                        width: `${props.larghezza}px`,
                        height: `${props.altezza}px`,
                        maxWidth: `${props.larghezza}px`,
                        maxHeight: `${props.altezza}px`,
                        backgroundImage: props.immagini.front ? `url(${props.immagini.front})` : undefined,
                        transform: "translateX(-50%) translateY(-50%) rotateZ(180deg)"
                    }}/>
            </span>
            <span
                style={{
                    height: props.altezza,
                    backgroundColor: `${props.colore}`,
                    opacity: 1 - props.trasparenza
                }}
                className={"SezioneLaterale Back"}>
                <span
                    className={"Immagine"}
                    style={{
                        width: `${props.larghezza}px`,
                        height: `${props.altezza}px`,
                        maxWidth: `${props.larghezza}px`,
                        maxHeight: `${props.altezza}px`,
                        backgroundImage: props.immagini.back ? `url(${props.immagini.back})` : undefined,
                        transform: "translateX(-50%) translateY(-50%) rotateZ(180deg)"
                    }}/>
            </span>
            <span
                style={{
                    transform: `translateZ(${props.altezza * 0.5}px)`,
                    backgroundColor: `${props.colore}`,
                    backgroundImage: props.immagini.top ? `url(${props.immagini.top})` : undefined,
                    opacity: 1 - props.trasparenza
                }}
                className={"SezioneLaterale Top"}/>
            <span
                style={{
                    transform: `translateZ(-${props.altezza * 0.5}px)`,
                    backgroundColor: `${props.colore}`,
                    backgroundImage: props.immagini.bottom ? `url(${props.immagini.bottom})` : undefined,
                    opacity: 1 - props.trasparenza
                }}
                className={"SezioneLaterale Bottom"}/>
        </div>
    )
}
