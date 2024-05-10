import './Plane.scss';



export interface PlaneProps {
    larghezza: number,
    lunghezza: number,
    rotazioneY: number,
    rotazioneX: number,
    rotazioneZ: number,
    posizioneX: number,
    posizioneY: number,
    posizioneZ: number,
    trasparenza: number,
    immagine?: string,
    togliOmbra?: boolean,
    colore: string
}
export const Plane = (props: PlaneProps) => {
    return (
        <div
            style={{
                width: props.larghezza,
                height: props.lunghezza,
                backgroundColor: `${props.colore}`,
                backgroundImage: props.immagine ? `url(${props.immagine})` : undefined,
                transform: `
                    translateX(-50%)
                    translateY(-50%)
                    translateX(${props.posizioneX}px) 
                    translateY(${props.posizioneZ}px)
                    translateZ(${props.posizioneY}px)
                    rotateX(${props.rotazioneX}deg)
                    rotateZ(${props.rotazioneY}deg)
                    rotateY(${props.rotazioneZ}deg)`,
            }}
            className={`Plane ${props.togliOmbra && 'togliOmbra'}`}/>
    )
}
