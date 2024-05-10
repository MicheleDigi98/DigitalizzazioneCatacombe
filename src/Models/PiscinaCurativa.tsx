import {Group3D} from "../CoreComponents/3DEnv/3DEnv";
import {Block, BlockImages} from "../CoreComponents/Block/Block";
import ResourceManager from "../Resources/ResourceManager";
import {Plane} from "../CoreComponents/Plane/Plane";
import {Fragment} from "react";

export interface PiscinaCurativaProps{
    posizioneX: number,
    posizioneZ: number,
    dimensione: number,
    altezza: number,
    ridotta?: boolean
}
export const PiscinaCurativa = (props: PiscinaCurativaProps) => {
    const dimensioneMezzi = Math.round(props.dimensione * 0.5);
    const dimensioneTotem = Math.round(props.dimensione * 0.2);
    const dimensioneTotemMezzi = Math.round(dimensioneTotem * 0.5);
    const spessore = Math.round(props.dimensione * 0.2);
    const spessoreMezzi = Math.round(spessore * 0.5);
    const altezzaMezzi = Math.round(props.altezza * 0.5);
    const altezzaVasca = Math.round(props.altezza * 0.4);
    const altezzaVascaMezzi = Math.round(altezzaVasca * 0.5);
    const altezzaInternoVasca = Math.round(altezzaVasca * 0.8);
    const altezzaInternoVascaMezzi = Math.round(altezzaInternoVasca * 0.5);

    const textureMuro: BlockImages = {
        top: ResourceManager.Textures().Muretto,
        left: ResourceManager.Textures().Muretto,
        right: ResourceManager.Textures().Muretto,
        bottom: ResourceManager.Textures().Muretto,
        back: ResourceManager.Textures().Muretto,
        front: ResourceManager.Textures().Muretto,
    }

    return (
        <Group3D
            posizioneX={props.posizioneX}
            posizioneY={0}
            posizioneZ={props.posizioneZ}
            rotazioneX={0}
            rotazioneY={0}
            rotazioneZ={0}>
            {
                !props.ridotta &&
                <Fragment>
                    <Plane
                        larghezza={props.dimensione}
                        lunghezza={props.dimensione}
                        rotazioneY={0}
                        rotazioneX={0}
                        rotazioneZ={0}
                        posizioneX={0}
                        posizioneY={0}
                        posizioneZ={0}
                        trasparenza={0}
                        immagine={ResourceManager.Textures().Muretto}
                        colore={"black"}/>
                    <Block
                        larghezza={spessore}
                        lunghezza={props.dimensione}
                        altezza={altezzaVasca}
                        rotazioneY={0}
                        rotazioneX={0}
                        rotazioneZ={0}
                        posizioneX={-dimensioneMezzi + spessoreMezzi}
                        posizioneY={altezzaVascaMezzi}
                        posizioneZ={0}
                        trasparenza={0}
                        immagini={textureMuro}
                        colore={'gray'}/>
                    <Block
                        larghezza={spessore}
                        lunghezza={props.dimensione}
                        altezza={altezzaVasca}
                        rotazioneY={0}
                        rotazioneX={0}
                        rotazioneZ={0}
                        posizioneX={dimensioneMezzi - spessoreMezzi}
                        posizioneY={altezzaVascaMezzi}
                        posizioneZ={0}
                        trasparenza={0}
                        immagini={textureMuro}
                        colore={'gray'}/>
                    <Block
                        larghezza={spessore}
                        lunghezza={props.dimensione}
                        altezza={altezzaVasca}
                        rotazioneY={90}
                        rotazioneX={0}
                        rotazioneZ={0}
                        posizioneX={-dimensioneMezzi + spessoreMezzi}
                        posizioneY={altezzaVascaMezzi}
                        posizioneZ={0}
                        trasparenza={0}
                        immagini={textureMuro}
                        colore={'gray'}/>
                    <Block
                        larghezza={spessore}
                        lunghezza={props.dimensione}
                        altezza={altezzaVasca}
                        rotazioneY={90}
                        rotazioneX={0}
                        rotazioneZ={0}
                        posizioneX={dimensioneMezzi - spessoreMezzi}
                        posizioneY={altezzaVascaMezzi}
                        posizioneZ={0}
                        trasparenza={0}
                        immagini={textureMuro}
                        colore={'gray'}/>
                    <Block
                        larghezza={props.dimensione - (spessore * 2)}
                        lunghezza={props.dimensione - (spessore * 2)}
                        altezza={altezzaInternoVasca}
                        rotazioneY={0}
                        rotazioneX={0}
                        rotazioneZ={0}
                        posizioneX={0}
                        posizioneY={altezzaInternoVascaMezzi}
                        posizioneZ={0}
                        trasparenza={0.5}
                        immagini={{}}
                        colore={"red"}/>
                </Fragment>
            }
            <Block
                larghezza={dimensioneTotem}
                lunghezza={dimensioneTotem}
                altezza={props.altezza}
                rotazioneY={0}
                rotazioneX={0}
                rotazioneZ={0}
                posizioneX={0}
                posizioneY={altezzaMezzi}
                posizioneZ={0}
                trasparenza={0}
                immagini={textureMuro}
                colore={'gray'}/>
            <Plane
                larghezza={dimensioneTotem * 2}
                lunghezza={dimensioneTotem * 2}
                rotazioneY={0}
                rotazioneX={270}
                rotazioneZ={0}
                posizioneX={0}
                posizioneY={props.altezza + dimensioneTotem}
                posizioneZ={0}
                trasparenza={0}
                colore={"transparent"}
                immagine={ResourceManager.Textures().Cuore}
                togliOmbra={true}/>
        </Group3D>
    )
}
