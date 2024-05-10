import './LightBulb.scss';
import {Group3D} from "../../CoreComponents/3DEnv/3DEnv";

export interface LightBulbProps {
    posizioneX: number,
    posizioneY: number,
    posizioneZ: number,
    rotazioneY: number,
    raggio: number
}
export const LightBulb = (props: LightBulbProps) => {
    return (
        <Group3D
            posizioneX={props.posizioneX}
            posizioneY={props.posizioneY}
            posizioneZ={props.posizioneZ}
            rotazioneX={0}
            rotazioneY={props.rotazioneY}
            rotazioneZ={0}>
            <span
                className={"LightBulb"}
                style={{
                    width: `${props.raggio}px`,
                    transform: `translateX(-50%) translateY(-50%) rotateX(90deg)`
                }}/>
            <span
                className={"LightBulb"}
                style={{
                    width: `${props.raggio}px`,
                    transform: `translateX(-50%) translateY(-50%) rotateZ(90deg)`
                }}/>
            <span
                className={"LightBulb"}
                style={{
                    width: `${props.raggio}px`,
                    transform: `translateX(-50%) translateY(-50%) rotateZ(90deg) rotateX(90deg)`
                }}/>
        </Group3D>
    )
}
