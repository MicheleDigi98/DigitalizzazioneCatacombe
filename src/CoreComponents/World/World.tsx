import {WorldCell, WorldCellModel} from "../WorldCell/WorldCell";
import React, {Fragment} from "react";
import Camera from "../Camera/Camera";
import ResourceManager from "../../Resources/ResourceManager";
import {Pedina, PedinaModel} from "../Entity/Pedina/Pedina";
import {Block} from "../Block/Block";
import {Env3D, PianoCamera3D} from "../3DEnv/3DEnv";
import {PiscinaCurativa} from "../../Models/PiscinaCurativa";

export interface WorldProps{
    camera: Camera,
    cells: WorldCellModel[],
    pedine: PedinaModel[]
}
export const World = (props: WorldProps) => {
    const testEnv = false;

    return (
        <Env3D>
            <PianoCamera3D
                posizioneX={0}
                posizioneY={0}
                posizioneZ={testEnv ? 200 : 450}
                rotazioneX={40}
                rotazioneY={10}
                rotazioneZ={0}>
                {
                    false &&
                    <Block
                        posizioneX={0}
                        posizioneY={25}
                        posizioneZ={0}
                        rotazioneZ={0}
                        rotazioneX={0}
                        rotazioneY={0}
                        altezza={80}
                        larghezza={150}
                        lunghezza={50}
                        trasparenza={0}
                        immagini={{
                            left: ResourceManager.Textures().MuroErba,
                            right: ResourceManager.Textures().MuroErba,
                            top: ResourceManager.Textures().MuroGrezzo,
                            bottom: ResourceManager.Textures().MuroGrezzo,
                            front: ResourceManager.Textures().MuroErba,
                            back: ResourceManager.Textures().MuroErba
                        }}
                        colore={"gray"}/>
                }
                {
                    testEnv &&
                    <Fragment>
                        <PiscinaCurativa
                            posizioneX={0}
                            posizioneZ={0}
                            dimensione={30}
                            altezza={20}/>
                    </Fragment>
                }
                {
                    !testEnv &&
                    props.cells.map(cell => (
                        <WorldCell
                            camera={props.camera}
                            puntiAperti={cell.puntiAperti}
                            uID={cell.uID}
                            posX={cell.posX}
                            posY={cell.posY}
                            fullCell={cell.fullCell}
                            tipoCella={cell.tipoCella}/>
                    ))
                }
                {
                    !testEnv &&
                    props.pedine.map(pedina => (
                        <Pedina
                            camera={props.camera}
                            immaginiPedina={pedina.immaginiPedina}
                            nomePedina={pedina.nomePedina}
                            posX={pedina.posX}
                            posY={pedina.posY}
                            orientamento={pedina.orientamento}
                            movimento={pedina.movimento}/>
                    ))
                }

            </PianoCamera3D>
        </Env3D>
    )
}
