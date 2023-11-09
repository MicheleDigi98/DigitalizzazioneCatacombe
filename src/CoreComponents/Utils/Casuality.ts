export default class Casuality{
    public static MaxArrayValue = 10000;

    private static _generateArray(perc: number): (0 | 1)[]{
        const esito: (0 | 1)[] = [];

        if(perc > 1)
            perc = 1;
        if(perc < 0)
            perc = 0;

        //Riempimento
        const unos = Casuality.MaxArrayValue * perc;
        for(let i = 0; i < Casuality.MaxArrayValue; i++){
            esito.push(i < unos ? 1 : 0);
        }

        //Shuffle
        for(let i = 0; i < esito.length; i++){
            const j = Math.floor(Math.random() * esito.length);
            [esito[i], esito[j]] = [esito[j], esito[i]];
        }

        return esito;
    }

    /**
     * Restituisce 1 con la probabilità indicata
     * @param probabilita Probabilità che va da 0 a 1
     * @constructor
     */
    public static Probabilita(probabilita: number): boolean{
        const array = Casuality._generateArray(probabilita);
        return array[Math.floor(Math.random() * array.length)] === 1;
    }
}
