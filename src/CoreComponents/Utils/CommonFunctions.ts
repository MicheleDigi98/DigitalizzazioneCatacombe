import Camera from "../Camera/Camera";

/**
 * Calcola la posizione della cella partendo dalla posizione della camera e della cella
 * @param posX Posizione X dell'elemento di cui calcolare la posizione dalla camera
 * @param posY Posizione Y dell'elemento di cui calcolare la posizione dalla camera
 * @param camera Camera che sta renderizzando la scena
 */
export const calcPositionFromCamera = (posX: number, posY: number, camera: Camera):{posX: number, posY: number} => {
    const cameraX = camera.posX * (camera.cellSize * camera.zoom * 0.99);
    const cameraY = camera.posY * (camera.cellSize * camera.zoom * 0.99);
    const left = posX * (camera.cellSize * camera.zoom * 0.99);
    const top = posY * (camera.cellSize * camera.zoom * 0.99);

    return  {
        posX: (left - cameraX) + (camera.worldSize * 0.5),
        posY: (top - cameraY) + (camera.worldSize * 0.5)
    }
}
