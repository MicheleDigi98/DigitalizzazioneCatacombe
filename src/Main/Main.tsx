import {World} from "../CoreComponents/World/World";
import WorldData from "../CoreComponents/World/WorldData";
import React, {useState} from "react";
import Camera from "../CoreComponents/Camera/Camera";
import {PedinaModel} from "../CoreComponents/Entity/Pedina/Pedina";
import ResourceManager from "../Resources/ResourceManager";

export const Main = () => {
    const [worldData] = useState<WorldData>(new WorldData());
    const [currentPosition, setCurrentPosition] = useState<{posX: number, posY: number}>({posX: 0, posY: 0});
    const [camera, setCamera] = useState<Camera>({posX: 0, posY: 0, cellSize: 500, zoom: 1, worldSize: 1000});
    const [pedina, setPedina] = useState<PedinaModel>({posX: 0, posY: 0, nomePedina: "Pippo", immaginiPedina: ResourceManager.Personaggi().Pippo, orientamento: "bottom", movimento: false})

    const goTo = (posX: number, posY: number) => {
        const from = worldData.getFrom(currentPosition.posX, currentPosition.posY, posX, posY);
        const to = worldData.getTo(currentPosition.posX, currentPosition.posY, posX, posY);
        if(worldData.canGoTo(currentPosition.posX, currentPosition.posY, to)){
            const cell = worldData.generateCell(from, posX, posY);
            worldData.addCell(cell);

            let steps = 60;
            const stepX = (posX - currentPosition.posX + (-0.01 + Math.random() * 0.02)) / steps;
            const stepY = (posY - currentPosition.posY + (-0.01 + Math.random() * 0.02)) / steps;

            setCurrentPosition({posX, posY});
            const interval = window.setInterval(() => {
                setPedina(pedina => ({...pedina, posX: pedina.posX + stepX, posY: pedina.posY + stepY, orientamento: to, movimento: true}));
                setCamera(camera => ({...camera, posX: camera.posX + stepX, posY: camera.posY + stepY}));
                steps--;
                if(steps === 0){
                    //setPedina({...pedina, posX, posY, orientamento: to, movimento: false});
                    //setCamera({...camera, posX, posY});
                    clearInterval(interval);
                }
            }, 10);
        }
    }

    return (
        <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px"
        }}>
            <div style={{
                backgroundColor: "black",
                width: "100%",
                height: '80%'
            }}>
                <World
                    camera={camera}
                    cells={worldData.getCells()}
                    pedine={[pedina]}/>
            </div>
            <span>
                <button onClick={() => {goTo(currentPosition.posX - 1, currentPosition.posY)}}>{'<-'}</button>
                <button onClick={() => {goTo(currentPosition.posX, currentPosition.posY - 1)}}>{'^'}</button>
                <button onClick={() => {goTo(currentPosition.posX, currentPosition.posY + 1)}}>{'v'}</button>
                <button onClick={() => {goTo(currentPosition.posX + 1, currentPosition.posY)}}>{'->'}</button>
            </span>
        </div>

    )
}
