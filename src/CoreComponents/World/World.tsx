import "./World.scss";
import {WorldCell, WorldCellModel} from "../WorldCell/WorldCell";
import React from "react";
import Camera from "../Camera/Camera";
import ResourceManager from "../../Resources/ResourceManager";
import {Pedina, PedinaModel} from "../Entity/Pedina/Pedina";

export interface SkyboxProps{
    skyboxImage: string,
    numeroPosizione: number,
    numeroImmagini: number,
    posizioneSkybox: "Left" | "Back" | "Right" | "Bottom"
}
export const Skybox = (props: SkyboxProps) => {
    return (
        <div className={`SkyBox SB-${props.posizioneSkybox}`}>
            <img
                style={{
                    transform: `translateX(${-((100 / props.numeroImmagini) * props.numeroPosizione)}%)`
                }}
                className={"SkyBoxImage"}
                src={ResourceManager.Backgrounds().SkyBox}/>
        </div>
    )
}

export interface WorldProps{
    camera: Camera,
    cells: WorldCellModel[],
    pedine: PedinaModel[]
}
export const World = (props: WorldProps) => {
    return (
        <div
            className={"WorldContainer"}>
            <div
                style={{
                    width: `${props.camera.worldSize}px`
                }}
                className={"World"}>
                <Skybox
                    skyboxImage={ResourceManager.Backgrounds().SkyBox}
                    numeroPosizione={1}
                    numeroImmagini={6}
                    posizioneSkybox={"Left"}/>
                <Skybox
                    skyboxImage={ResourceManager.Backgrounds().SkyBox}
                    numeroPosizione={2}
                    numeroImmagini={6}
                    posizioneSkybox={"Back"}/>
                <Skybox
                    skyboxImage={ResourceManager.Backgrounds().SkyBox}
                    numeroPosizione={3}
                    numeroImmagini={6}
                    posizioneSkybox={"Right"}/>
                <Skybox
                    skyboxImage={ResourceManager.Backgrounds().SkyBox}
                    numeroPosizione={5}
                    numeroImmagini={6}
                    posizioneSkybox={"Bottom"}/>
                {
                    props.cells.map(
                        cell =>
                            <WorldCell
                                key={cell.uID}
                                uID={cell.uID}
                                posX={cell.posX}
                                posY={cell.posY}
                                camera={props.camera}
                                fullCell={cell.fullCell}
                                puntiAdiacenti={cell.puntiAdiacenti}
                                puntiAperti={cell.puntiAperti}
                                tipoCella={cell.tipoCella}/>
                    )
                }
                {
                    props.pedine.map(
                        pedina =>
                            <Pedina
                                camera={props.camera}
                                immaginiPedina={pedina.immaginiPedina}
                                nomePedina={pedina.nomePedina}
                                posX={pedina.posX}
                                posY={pedina.posY}
                                orientamento={pedina.orientamento}
                                movimento={pedina.movimento}/>
                    )
                }
            </div>
        </div>
    )
}
