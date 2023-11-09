import './Pedina.scss';
import Camera from "../../Camera/Camera";
import {useEffect, useState} from "react";
import {FromType} from "../../World/WorldData";
import {calcPositionFromCamera} from "../../Utils/CommonFunctions";

export interface PedinaModel {
    immaginiPedina: string,
    nomePedina: string,
    posX: number,
    posY: number,
    orientamento: FromType,
    movimento: boolean
}

export interface PedinaProps extends PedinaModel{
    camera: Camera
}
export const Pedina = (props: PedinaProps) => {
    const [fromCameraPosition, setFromCameraPosition] = useState<{posX: number, posY: number}>({posX: 0, posY: 0});
    const [indexMovimento, setIndexMovimento] = useState<number>(0);

    useEffect(() => {
        const cicloMovimento = window.setInterval(() => {
            if(props.movimento){
                setIndexMovimento(indexMovimento => indexMovimento + 1 === 3 ? 0 : indexMovimento + 1);
            }else if(indexMovimento !== 1){
                setIndexMovimento(1);
            }
            console.log("Move");
        }, 200);

        return () => {
            window.clearInterval(cicloMovimento);
        }
    }, [])

    useEffect(() => {
        console.log("Cambio index movimento");
    }, [indexMovimento])

    useEffect(() => {
        setFromCameraPosition(calcPositionFromCamera(props.posX, props.posY, props.camera));
    }, [props.posX, props.posY, props.camera])

    /**
     * Restituisce l'index dell'immagine da visualizzare per le righe
     */
    const indexFromOrientamento = (): number => {
        let esito = 0;

        switch (props.orientamento){
            case "left":
                esito = 1;
                break;
            case "right":
                esito = 2;
                break;
            case "top":
                esito = 3;
                break;
            case "bottom":
                esito = 0;
                break;
        }

        return esito;
    }

    return (
        <div
            style={{
                left: `${fromCameraPosition.posX}px`,
                top: `${fromCameraPosition.posY}px`,
                transform: `translateX(-50%) translateY(-50%) rotateX(-90deg) translateY(-50%)`,
            }}
            className={"Pedina"}>
            <span>{indexMovimento}</span>
            <img
                style={{
                    transform: `translateY(${-(indexFromOrientamento() * 25)}%) translateX(${-indexMovimento * (100 / 3)}%)`
                }}
                className={"ImmaginePedina"}
                src={props.immaginiPedina}/>
        </div>
    )
}
