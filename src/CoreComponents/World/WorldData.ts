import {PuntiGenerator, WorldCellModel} from "../WorldCell/WorldCell";
import Casuality from "../Utils/Casuality";
import {Probabilita} from "../Constants/Probabilita";

export type FromType = "top" | "left" | "right" | "bottom";
export type ToType = FromType;
export default class WorldData{
    private static cellUIDCounter = 1;
    private _cells: WorldCellModel[] = [{
        uID: 0,
        posX: 0,
        posY: 0,
        fullCell: false,
        puntiAperti: PuntiGenerator(true, true, true, true),
        puntiAdiacenti: PuntiGenerator(false, false, false, false),
        tipoCella: "normale",
    }];

    /**
     * Restituisce la direzione da cui si è partiti
     * @param startX Poizione iniziale di X
     * @param startY Poizione iniziale di Y
     * @param targetX Poizione di arrivo di X
     * @param targetY Poizione di arrivo di Y
     */
    public getFrom(startX: number, startY: number, targetX: number, targetY: number): FromType | undefined{
        let esito: FromType = undefined;

        if(startX !== targetX){
            esito = startX < targetX ? 'left' : 'right';
        }else if(startY !== targetY){
            esito = startY < targetY ? 'top' : 'bottom';
        }

        return esito;
    }

    /**
     * Restituisce la direzione in cui si sta andando
     * @param startX Poizione iniziale di X
     * @param startY Poizione iniziale di Y
     * @param targetX Poizione di arrivo di X
     * @param targetY Poizione di arrivo di Y
     */
    public getTo(startX: number, startY: number, targetX: number, targetY: number): FromType | undefined{
        let esito: FromType = undefined;

        if(startX !== targetX){
            esito = startX < targetX ? 'right' : 'left';
        }else if(startY !== targetY){
            esito = startY < targetY ? 'bottom' : 'top';
        }

        return esito;
    }

    /**
     * Controlla che la cella alla posizione indicata esista oppura no
     * @param posX Posizione X da controllare
     * @param posY Posizione Y da controllare
     * @private
     */
    private _cellExist(posX: number, posY: number): boolean{
        return !!this.getCell(posX, posY);
    }

    /**
     * Controlla se c'è oppure no una cella alla posizione indicata
     * @param posX Posizione X da controllare
     * @param posY Posizione Y da controllare
     */
    public thereIsACell = (posX: number, posY: number): boolean => {
        return this._cellExist(posX, posY);
    }

    /**
     * Controlla che si possa o meno andare verso una destinazione
     * @param posX Posizione X di controllo
     * @param posY Posizione Y di controllo
     * @param where Direzione dove si vuole andare
     */
    public canGoTo = (posX: number, posY: number, where: ToType): boolean => {
        let esito = true;

        switch (where){
            case "left":
                esito = this.getCell(posX, posY).puntiAperti.left;
                break;
            case "top":
                esito = this.getCell(posX, posY).puntiAperti.top;
                break;
            case "right":
                esito = this.getCell(posX, posY).puntiAperti.right;
                break;
            case "bottom":
                esito = this.getCell(posX, posY).puntiAperti.bottom;
                break;
        }

        return esito;
    }

    /**
     * Genera una cella nella posizione indicata
     * @param from Da dove arriva la richiesta di creazione della cella
     * @param posX Posizione X di generazione
     * @param posY Posizione Y di generazione
     */
    public generateCell = (from: FromType, posX: number, posY: number): WorldCellModel => {
        const cellaPiena = Casuality.Probabilita(Probabilita.cellaPiena);

        return {
            uID: WorldData.cellUIDCounter++,
            posX,
            posY,
            puntiAdiacenti: PuntiGenerator(
                this.thereIsACell(posX - 1, posY),
                this.thereIsACell(posX, posY - 1),
                this.thereIsACell(posX + 1, posY),
                this.thereIsACell(posX, posY + 1)
            ),
            puntiAperti: PuntiGenerator(
                this._generaPuntoAperto('left', from, posX, posY),
                this._generaPuntoAperto('top', from, posX, posY),
                this._generaPuntoAperto('right', from, posX, posY),
                this._generaPuntoAperto('bottom', from, posX, posY),
            ),
            fullCell: cellaPiena,
            tipoCella: Casuality.Probabilita(Probabilita.cellaCurativa) ? "curativa" :
                (!cellaPiena && Casuality.Probabilita(Probabilita.cellaTeletrasporto)) ? "teletrasporto" : "normale"
        }
    }

    /**
     * Genera il punto aperto per la cella in posizione X, Y
     * @param targetApertura Direzione target di cui si sta calcolando l'apertura
     * @param from Direzione da cui si arriva alla cella
     * @param posX Posizione X di generazione della cella
     * @param posY Posizione Y di generazione della cella
     * @private
     */
    private _generaPuntoAperto(targetApertura: FromType, from: FromType, posX: number, posY: number): boolean{
        let esito = Casuality.Probabilita(Probabilita.puntoAperto);

        if(targetApertura === from){
            esito = true;
        }else{
            const puntoApertoAdiacente = this._controllaPuntoApertoCellaAdiacente(targetApertura, posX, posY);
            if(puntoApertoAdiacente !== undefined)
                esito = puntoApertoAdiacente;
        }

        return esito;
    }

    /**
     * Controlla il punto aperto relativo alla direzione della cella adiacente, restituisce undefined se non ci sono celle adiacenti alla direzione
     * @param direction Direzione da controllare
     * @param posX Posizione X della cella che ha avviato il controllo
     * @param posY Posizione Y della cella che ha avviato il cotnrollo
     * @private
     */
    private _controllaPuntoApertoCellaAdiacente(direction: FromType, posX: number, posY: number): boolean | undefined{
        let esito = undefined;

        switch (direction) {
            case "left":
                if(this._cellExist(posX - 1, posY)){
                    esito = this.getCell(posX - 1, posY).puntiAperti.right;
                }
                break;
            case "top":
                if(this._cellExist(posX, posY - 1)){
                    esito = this.getCell(posX, posY - 1).puntiAperti.bottom;
                }
                break;
            case "right":
                if(this._cellExist(posX + 1, posY)){
                    esito = this.getCell(posX + 1, posY).puntiAperti.left;
                }
                break;
            case "bottom":
                if(this._cellExist(posX, posY + 1)){
                    esito = this.getCell(posX, posY + 1).puntiAperti.top;
                }
                break;
        }

        return esito;
    }

    /**
     * Aggiorna i punti aperti all'interno della mappa per ogni singola cella
     * @private
     */
    private _updatePuntiAdiacenti(){
        for(const tCell of this._cells){
            tCell.puntiAdiacenti = PuntiGenerator(
                this.thereIsACell(tCell.posX - 1, tCell.posY),
                this.thereIsACell(tCell.posX, tCell.posY - 1),
                this.thereIsACell(tCell.posX + 1, tCell.posY),
                this.thereIsACell(tCell.posX, tCell.posY + 1)
            )
        }
    }

    /**
     * Aggiunge una nuova cella al mondo
     * @param cell Cella da aggiungere al mondo
     */
    public addCell(cell: WorldCellModel){
        if(cell && !this.thereIsACell(cell.posX, cell.posY)){
            this._cells.push(cell);
            this._updatePuntiAdiacenti();
        }
    }

    /**
     * Recupera una singola cella
     * @param posX Posizione X della cella da recuperare
     * @param posY Posizione Y della cella da recuperare
     */
    public getCell(posX: number, posY: number): WorldCellModel | undefined{
        return this._cells.find(cell => cell.posX === posX && cell.posY === posY);
    }

    /**
     * Restituisce tutte le celle
     */
    public getCells(): WorldCellModel[]{
        return this._cells;
    }
}
